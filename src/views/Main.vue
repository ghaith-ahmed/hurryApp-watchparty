<template>
  <div v-if="user">
    <h1>{{ user.user?.name }}</h1>
    <FwbButton @click="user.logout">Logout</FwbButton>
  </div>
  <div
    v-else
    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
  >
    <FwbSpinner size="12" />
  </div>
</template>

<script setup>
import { useUserStore } from "../stores/userStore";
import { FwbButton, FwbSpinner } from "flowbite-vue";
import axios from "../axios";
import { toast } from "vue-sonner";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

const user = useUserStore();
const router = useRouter();

onMounted(user.getUser);
</script>
