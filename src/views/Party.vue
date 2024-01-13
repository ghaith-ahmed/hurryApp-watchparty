<template>
  <div v-if="party">
    <div class="md:flex relative gap-2 justify-center items-start">
      <div class="w-full">
        <video
          @pause="pauseVideo"
          @play="playVideo"
          @seeked="changeTimeline"
          @seeking="!isSeeking ? (isSeeking = true) : null"
          class="w-full"
          autoplay
          :src="party.video.url"
          ref="videoEle"
          controls
        ></video>
        <FwbButton @click="copyLink" class="mt-3 w-full" color="green"
          >Copy Party Link</FwbButton
        >
      </div>
      <div
        class="md:w-1/2 w-full h-[80dvh] relative bg-gray-100 rounded-xl mt-2 md:mt-0"
      >
        <div class="flex w-full mb-3">
          <button class="w-full hover:bg-gray-200 p-4 font-medium transition">
            Chat
          </button>
          <button class="w-full hover:bg-gray-200 p-4 font-medium transition">
            Members
          </button>
        </div>
        <div class="flex flex-col gap-1">
          <div
            class="flex gap-2 justify-end items-center p-3 bg-emerald-700 text-white mx-3 rounded-2xl"
            v-for="member of party.members"
          >
            <h1 class="font-medium">
              {{ member._id == user._id ? "( You ) " : "" }}
              {{ member.name ?? user.name }}
            </h1>

            <img
              class="w-9 h-9 shrink-0 object-cover rounded-full"
              :src="party.host.profilePic || personPic"
              alt=""
            />
          </div>
        </div>
        <FwbButton
          @click="leaveParty"
          class="absolute bottom-0 w-full !rounded-t-none"
          color="red"
          >Leave Party</FwbButton
        >
      </div>
    </div>
  </div>
  <div v-else class="flex justify-center mt-10">
    <FwbSpinner size="12" color="green" />
  </div>
</template>

<script setup>
import axios from "../axios";
import { ref, onMounted } from "vue";
import { toast } from "vue-sonner";
import { FwbSpinner, FwbButton } from "flowbite-vue";
import { useRouter, useRoute } from "vue-router";
import personPic from "../../public/profilePerson.png";
import { useUserStore } from "@/stores/userStore";
import { io } from "socket.io-client";

const { user } = useUserStore();
const party = ref();
const route = useRoute();
const router = useRouter();
const socket = io("http://localhost:3000");
const videoEle = ref();
const isSeeking = false;

const getParty = async () => {
  try {
    party.value = (await axios.get(`/party/${route.params.id}`)).data;
    socket.connect();
    socket.emit("joined", party.value._id, user._id);
    socket.on("joined", (partyId, userId) => {
      if (
        partyId == party.value._id &&
        !party.value.members
          .map((member) => member._id.toString())
          .includes(userId.toString())
      ) {
        getUser(userId);
      }
    });
    socket.on("leaved", (partyId, userId) => {
      if (
        partyId == party.value._id &&
        party.value.members
          .map((member) => member._id.toString())
          .includes(userId.toString())
      ) {
        party.value.members = party.value.members.filter(
          (member) => member._id != userId
        );
      }
    });
    socket.on("paused", (partyId) => {
      if (partyId == party.value._id) {
        videoEle.value.pause();
      }
    });
    socket.on("play", (partyId) => {
      if (partyId == party.value._id) {
        videoEle.value.play();
      }
    });
    socket.on("timeline", (partyId, userId, currentTime) => {
      if (partyId == party.value._id && userId != user._id) {
        videoEle.value.currentTime = +currentTime;
      }
    });
  } catch (e) {
    toast.error(e);
    console.log(e);
  }
};

const copyLink = () => {
  navigator.clipboard
    .writeText(`http://localhost:5173/party/${route.params.id}`)
    .then(() => {
      toast.success("Link Copied");
    })
    .catch(() => {
      toast.error("Failed To Copy Text");
    });
};

const getUser = async (id) => {
  try {
    const { data } = await axios.get(`/users/get/${id}`);

    party.value.members.push(data);
  } catch (e) {
    toast.error(e);
    console.log(e);
  }
};

const leaveParty = async () => {
  try {
    await axios.post(`/party/leave`, {
      partyId: party.value._id,
    });
    socket.emit("leaved", party.value._id, user._id);
    socket.disconnect();
    router.push({ name: "Main" });
  } catch (e) {
    toast.error(e);
    console.log(e);
  }
};

const pauseVideo = () => socket.emit("paused", party.value._id);
const playVideo = () => socket.emit("play", party.value._id);

const changeTimeline = () => {
  if (isSeeking) {
    isSeeking = false;
    socket.emit(
      "timeline",
      party.value._id,
      user._id,
      videoEle.value.currentTime
    );
  }
};

onMounted(getParty);
</script>
