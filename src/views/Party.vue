<template>
  <div v-if="party">
    <div class="flex gap-2 justify-center">
      <video class="w-full" :src="party.video.url" controls></video>
      <div class="w-1/2"></div>
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

const party = ref();
const route = useRoute();
const router = useRouter();

const getParty = async () => {
  try {
    party.value = (await axios.get(`/party/${route.params.id}`)).data[0];
    console.log(party.value);
  } catch (e) {
    toast.error(e);
    console.log(e);
  }
};

onMounted(getParty);
</script>
