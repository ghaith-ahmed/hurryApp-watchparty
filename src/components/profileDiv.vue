<template>
  <div
    class="w-8 h-8 shrink-0 flex justify-center items-center object-cover bg-emerald-500 rounded-full overflow-hidden"
    alt=""
  >
    <h1 class="text-xs text-white truncate">
      {{ user.name }}
    </h1>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";

const { user } = useUserStore();
</script>
