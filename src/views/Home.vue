<template>
  <h1 class="font-medium dark:text-white text-2xl mb-4">
    What do you wanna watch today ?
  </h1>
  <div
    v-if="videos"
    class="flex gap-5 animate-fade-in-down flex-wrap md:justify-start justify-center"
  >
    <div v-for="video of videos" class="w-full md:w-fit">
      <div
        @click="startParty(video._id)"
        class="md:w-[240px] dark:fill-white w-full group cursor-pointer relative h-[140px] border flex flex-col justify-center items-center rounded-2xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="32"
          width="32"
          viewBox="0 0 512 512"
          class="w-20 transition dark:fill-white"
        >
          <path
            d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM48 368v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H416zM48 240v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H416zM48 112v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zM416 96c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H416zM160 128v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H192c-17.7 0-32 14.3-32 32zm32 160c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V320c0-17.7-14.3-32-32-32H192z"
          />
        </svg>
        <h1
          class="opacity-0 text-green-400 font-medium group-hover:opacity-100 transition absolute left-1/2 -translate-x-1/2 top-[90px]"
        >
          Start a party
        </h1>
      </div>
      <div class="flex gap-2 mt-2 items-start">
        <profilePic :name="video.user_id.name" />
        <div class="font-medium dark:text-white">
          <h1>{{ video.title }}</h1>
          <p class="text-sm">{{ video.user_id.name }}</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex justify-center mt-10">
    <FwbSpinner size="12" color="green" />
  </div>
  <Confetti />
</template>

<script setup>
import axios from "../axios";
import { ref, onMounted } from "vue";
import { toast } from "vue-sonner";
import { FwbSpinner, FwbButton } from "flowbite-vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const { user } = useUserStore();
const router = useRouter();
const videos = ref();

const fetchVideos = async () => {
  try {
    videos.value = (await axios.get("/videos/")).data;
  } catch (e) {
    toast.error(e);
    console.log(e);
  }
};

const startParty = async (id) => {
  try {
    const { data } = await axios.post("/party/", {
      videoId: id,
    });

    router.push({ name: "Party", params: { id: data.code } });
  } catch (e) {
    toast.error(e);
    console.log(e);
  }
};

onMounted(fetchVideos);
</script>
