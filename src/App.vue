<template>
  <Toaster rich-colors close-button />
  <div class="h-dvh">
    <RouterView />
  </div>
</template>

<script setup>
import { Toaster } from "vue-sonner";
</script>
