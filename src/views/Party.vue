<template>
  <div v-if="party">
    <div class="md:flex relative gap-2 justify-center items-start">
      <div class="w-full">
        <video
          @pause="pauseVideo"
          @play="playVideo"
          @seeked="changeTimeline"
          @canplay="() => {
            videoEle.play()
          }"
          class="w-full"
          autoplay
          :src="party.video.url"
          ref="videoEle"
          controls
        ></video>
        <div class="flex flex-col gap-3">
          <FwbButton @click="copyLink" class="mt-3 w-full" color="green"
            >Copy Party Link</FwbButton
          >
              <FwbButton
              @click="leaveParty"
              
              color="red"
              >Leave Party</FwbButton
            >
        </div>
      </div>
      <div
        class="md:w-1/2 w-full h-[80dvh] relative bg-gray-100 rounded-xl mt-2 md:mt-0"
      >
        <div class="flex w-full mb-3">
          <button
            @click="page = 'chat'"
            class="w-full hover:bg-gray-200 p-4 font-medium transition"
          >
            Chat
          </button>
          <button
            @click="page = 'members'"
            class="w-full hover:bg-gray-200 p-4 font-medium transition"
          >
            Members
          </button>
        </div>
        <Members v-if="page == 'members'" :members="party.members" />
        <Chat @message-sent="sendMessageSocket" :party="party" v-else />
    
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
import { useRouter, useRoute, onBeforeRouteLeave } from "vue-router";
import personPic from "../../public/profilePerson.png";
import { useUserStore } from "@/stores/userStore";
import { io } from "socket.io-client";
import Members from "../components/Members.vue";
import Chat from "../components/Chat.vue";

const { user } = useUserStore();
const party = ref();
const route = useRoute();
const router = useRouter();
const socket = io("http://localhost:3000");
const videoEle = ref();
const time = ref()
const page = ref("members");

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
      socket.emit("getTime", videoEle.value.currentTime, userId)
    });
    socket.on("getTime", (time, userId) => {
      if (user._id == userId) {
        time.value = +time
      }
    })
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
    socket.on("timeline", (partyId, userId, currentTime, isPaused) => {
      if (partyId == party.value._id && userId != user._id) {
            if (Math.abs(videoEle.value.currentTime - currentTime) > 1) {
          videoEle.value.currentTime = +currentTime;
        }
            if (videoEle.value.paused !== isPaused) {
          if (isPaused) {
            videoEle.value.pause();
          } else {
            videoEle.value.play();
          }
        }
      }
    });
    socket.on("message-sent", (message) => {
      if (message.partyId == party.value._id && message.sender_id != user._id) {
        party.value.messages.push(message)
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

onBeforeRouteLeave(async (to, from, next) => { leaveParty(); next()})

const changeTimeline = () => {
  socket.emit(
    "timeline",
    party.value._id,
    user._id,
    videoEle.value.currentTime,
    videoEle.value.paused
  );
};

const pauseVideo = () => {
  changeTimeline()
  socket.emit("paused", party.value._id)
};
const playVideo = () => {
  changeTimeline()
  socket.emit("play", party.value._id)
};



const sendMessageSocket = (message) => {socket.emit("message-sent", message)}

onMounted(getParty);
</script>
