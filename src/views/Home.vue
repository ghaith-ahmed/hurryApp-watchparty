<template>
  <div
    v-if="videos"
    class="flex gap-5 flex-wrap md:justify-start justify-center"
  >
    <div v-for="video of videos" class="w-full md:w-fit">
      <div
        @click="startParty(video._id)"
        class="md:w-[240px] w-full group cursor-pointer relative h-[140px] border flex flex-col justify-center items-center rounded-2xl"
      >
        <img
          src="https://www.creativefabrica.com/wp-content/uploads/2020/02/10/Video-Graphics-1-580x387.png"
          alt=""
          class="w-20 transition"
        />
        <h1
          class="opacity-0 text-green-400 font-medium group-hover:opacity-100 transition absolute left-1/2 -translate-x-1/2 top-[90px]"
        >
          Start a party
        </h1>
      </div>
      <div class="flex gap-2 mt-2 items-start">
        <img src="/profilePerson.png" class="w-8 rounded-full" alt="" />
        <div class="font-medium">
          <h1>{{ video.title }}</h1>
          <p class="text-sm">{{ video.user_id.name }}</p>
        </div>
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
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const {user} = useUserStore()
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
