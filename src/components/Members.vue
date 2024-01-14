<template>
  <div class="flex flex-col gap-1">
    <div
      class="flex gap-2 justify-end items-center p-3 bg-emerald-700 text-white mx-3 rounded-2xl"
      v-for="member of members"
    >
      <h1 class="font-medium">
        {{ member._id == user._id ? "( You ) " : "" }}
        {{ member.name ?? user.name }}
      </h1>

      <img
        class="w-9 h-9 shrink-0 object-cover rounded-full"
        :src="member.profilePic || personPic"
        alt=""
      />
    </div>
  </div>
</template>

<script setup>
import personPic from "../../public/profilePerson.png";
import { useUserStore } from "@/stores/userStore";

const { user } = useUserStore();
defineProps(["members"]);
</script>
