<template>
  <div>
    <div class="flex flex-col items-center justify-center w-full">
      <video ref="videoEle" :src="file" autoplay controls class="w-1/2"></video>
      <input
        id="dropzone-file"
        @change="handleVideoInput"
        class="mt-5"
        type="file"
      />
      <div class="flex flex-col gap-5 w-full mt-5">
        <FwbInput label="Title" v-model="title"></FwbInput>
        <FwbTextarea
          label="Description"
          placeholder=""
          class="resize-none"
          v-model="description"
        ></FwbTextarea>
        <FwbButton class="w-full" @click="uploadVideo">Upload</FwbButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as filestack from "filestack-js";
import { ref } from "vue";
import { toast } from "vue-sonner";
import { FwbInput, FwbTextarea, FwbButton } from "flowbite-vue";
import axios from "../axios";
import { useRouter } from "vue-router";

const router = useRouter();
const client = filestack.init("AK6ZcXc0TRbOJhNrbLzLVz");
const file = ref();
const videoEle = ref();
const title = ref("");
const description = ref("");

const handleVideoInput = async (e) => {
  const selectedFile = e.target.files[0];
  if (selectedFile.type.includes("video/")) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const src = e.target.result;
      file.value = src;
      videoEle.value.load();
    };

    reader.readAsDataURL(selectedFile);
  } else {
    toast.error("Only video files are allowed !");
  }
};

const uploadVideo = async () => {
  try {
    const video = { url: file.value, title: title.value };
    if (description.value) video.description = description.value;
    const { data } = await axios.post("/videos/upload", video);
    toast.success("Video uploaded !");
    title.value = "";
    description.value = "";
    file.value = "";
    router.push({ name: "Main" });
  } catch (e) {
    toast.error(e);
    console.log(e);
  }
};
</script>
