<template>
  <teleport to="body">
    <div
      class="flex justify-center items-center h-[100dvh] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
    >
      <transition name="modal">
        <div v-if="video" class="absolute z-[22]">
          <div
            class="dark:bg-[#181818] bg-white md:mx-auto md:w-[600px] w-[90dvw] flex flex-col gap-3 border dark:border-[#383939] rounded-xl p-6"
          >
            <h1 class="text-center font-medium">{{ video.title }}</h1>
            <div class="flex flex-col gap-5 w-full mt-5">
              <FwbInput label="Title" v-model="title"></FwbInput>
              <FwbTextarea
                label="Description"
                placeholder=""
                class="resize-none"
                v-model="description"
              ></FwbTextarea>
            </div>
            <div class="flex w-full justify-end">
              <FwbButton class="w-full" @click="edit">
                <p v-if="!loading">Edit</p>
                <FwbSpinner v-else class="w-full mx-auto" color="white" />
              </FwbButton>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <transition name="background">
      <div
        v-if="video"
        @click="$emit('close')"
        class="w-[120%] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[21] h-[120dvh] bg-[#000000a8]"
      ></div>
    </transition>
  </teleport>
</template>

<script setup>
import { FwbButton, FwbSpinner, FwbTextarea, FwbInput } from "flowbite-vue";
import { ref, watch } from "vue";
import axios from "../axios";
import { toast } from "vue-sonner";

const props = defineProps(["video"]);
const loading = ref();
const title = ref();
const description = ref();
const emit = defineEmits(["edited"]);

watch(props, () => {
  title.value = props.video?.title;
  description.value = props.video?.description;
});

const edit = async () => {
  try {
    loading.value = true;
    await axios.post("/videos/edit", {
      id: props.video._id,
      title: title.value,
      description: description.value,
    });

    emit("edited", title.value, description.value);
  } catch (e) {
    toast.error(e);
    console.log(e);
  } finally {
    loading.value = false;
  }
};
</script>

<style>
.modal-enter-from {
  transform: scale(0.95);
  opacity: 0.5;
}
.modal-enter-active {
  transition: 0.3s;
}
.modal-enter-leave {
  transform: scale(1);
  opacity: 1;
}

.background-enter-from {
  opacity: 0;
}
.background-enter-active {
  transition: 0.2s;
  transform-origin: center center;
}
.background-enter-leave {
  opacity: 1;
}
</style>
