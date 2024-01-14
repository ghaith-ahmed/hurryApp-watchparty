<template>
  <div class="mt-5 animate-fade-in-down">
    <div class="gap-5 justify-center w-full">
      <div class="w-full">
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          for="file_input"
          >Choose your video</label
        >
        <input
          @change="handleVideoInput"
          ref="fileInput"
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
        />
      </div>
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
const fileToUpload = ref();
const title = ref("");
const description = ref("");
const textArea = ref();
const fileInput = ref();

const handleVideoInput = async (e) => {
  const selectedFile = e.target.files[0];
  fileToUpload.value = selectedFile;
  if (selectedFile.type.includes("video/")) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const src = e.target.result;
      file.value = src;
    };

    reader.readAsDataURL(selectedFile);
  } else {
    fileInput.value.value = null;
    toast.error("Only video files are allowed !");
  }
};

const uploadVideo = async () => {
  try {
    if (!title.value) return toast.error("You have to provide a title !");
    const { url } = await client.upload(fileToUpload.value);
    const video = { url, title: title.value };
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
