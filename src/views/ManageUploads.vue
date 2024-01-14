<template>
  <EditModal
    :video="videoToEdit"
    @close="videoToEdit = null"
    @edited="
      (title, description) => {
        videos[videos.indexOf(videoToEdit)].title = title;
        if (description)
          videos[videos.indexOf(videoToEdit)].title = description;
        videoToEdit = null;
      }
    "
  />
  <div
    v-if="videos"
    class="flex gap-5 animate-fade-in-down flex-wrap md:justify-start justify-center"
  >
    <div
      v-if="videos.length > 0"
      v-for="video of videos"
      class="w-full md:w-fit"
    >
      <div
        class="md:w-[240px] w-full group cursor-pointer relative h-[140px] border flex flex-col justify-center items-center rounded-2xl"
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
      </div>
      <div class="flex gap-2 mt-2 items-start">
        <img src="/profilePerson.png" class="w-8 rounded-full" alt="" />
        <div class="font-medium dark:text-white">
          <h1>{{ video.title }}</h1>
          <p class="text-sm">{{ video.user_id.name }}</p>
        </div>
      </div>
      <div class="flex gap-3">
        <FwbButton
          color="red"
          @click="deleteVideo(video._id)"
          class="mt-3 flex justify-center w-full"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            class="fill-white"
            height="16"
            width="14"
            viewBox="0 0 448 512"
          >
            <path
              d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
            /></svg
        ></FwbButton>
        <FwbButton
          color="blue"
          @click="videoToEdit = video"
          class="mt-3 flex justify-center w-full"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="16"
            viewBox="0 0 512 512"
            class="fill-white"
          >
            <path
              d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
            /></svg
        ></FwbButton>
      </div>
    </div>
    <h1 v-else class="text-center w-full mt-10 font-medium dark:text-white">
      You have no uploaded videos
    </h1>
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
import EditModal from "@/components/EditModal.vue";

const { user } = useUserStore();
const router = useRouter();
const videos = ref();
const videoToEdit = ref();

const fetchVideos = async () => {
  try {
    videos.value = (await axios.get("/videos/getyourvideos")).data;
  } catch (e) {
    toast.error(e);
    console.log(e);
  }
};
const deleteVideo = async (id) => {
  try {
    await axios.post(`/videos/delete/${id}`);
    toast.success("Done !");
    videos.value = videos.value.filter((video) => video._id != id);
  } catch (e) {
    toast.error(e);
    console.log(e);
  }
};

onMounted(fetchVideos);
</script>
