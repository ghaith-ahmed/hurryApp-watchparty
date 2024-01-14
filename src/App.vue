<template>
  <Toaster rich-colors close-button />
  <div class="h-dvh">
    <RouterView />
  </div>
</template>

<script setup>
import { Toaster } from "vue-sonner";
import { onMounted } from "vue";

onMounted(() => {
  if (localStorage.getItem("dark") == "true") {
    document.body.classList.add("dark");
  }
});
</script>
