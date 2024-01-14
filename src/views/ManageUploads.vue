<template>
    <div v-if="videos" class="flex gap-5 flex-wrap md:justify-start justify-center">
        <div v-for="video of videos" class="w-full md:w-fit">
            <div 
                class="md:w-[240px] w-full group cursor-pointer relative h-[140px] border flex flex-col justify-center items-center rounded-2xl">
                <img src="https://www.creativefabrica.com/wp-content/uploads/2020/02/10/Video-Graphics-1-580x387.png" alt=""
                    class="w-20 transition" />
                
            </div>
            <div class="flex gap-2 mt-2 items-start">
                <img src="/profilePerson.png" class="w-8 rounded-full" alt="" />
                <div class="font-medium">
                    <h1>{{ video.title }}</h1>
                    <p class="text-sm">{{ video.user_id.name }}</p>
                </div>
            </div>
            <FwbButton color="red" @click="deleteVideo(video._id)" class="mt-3 flex justify-center w-full"><svg xmlns="http://www.w3.org/2000/svg" class="fill-white" height="16" width="14" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></FwbButton>
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

const { user } = useUserStore()
const router = useRouter();
const videos = ref();

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
        await axios.post(`/videos/delete/${id}`)
        toast.success("Done !")
        videos.value = videos.value.filter(video => video._id != id)
    } catch (e) {
        toast.error(e);
        console.log(e);
    }
};

onMounted(fetchVideos);
</script>
