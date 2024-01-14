<template>
  <div v-if="user.user" class="container mx-auto p-4">
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div class="flex flex-wrap items-center justify-between mx-auto">
        <span class="text-3xl font-bold text-emerald-600">WatchParty</span>
        <button
          @click="mobileNav = !mobileNav"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          :class="{ hidden: !mobileNav }"
          class="w-full md:block md:w-auto"
          id="navbar-default"
        >
          <ul
            class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
          >
            <li>
              <router-link
                :to="{ name: 'Home' }"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                aria-current="page"
                >Home</router-link
              >
            </li>
            <li>
              <router-link
                :to="{ name: 'Upload' }"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                aria-current="page"
                >Upload video</router-link
              >
            </li>
            <li>
              <router-link
                :to="{ name: 'ManageUploads' }"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                aria-current="page"
                >Manage uploads</router-link
              >
            </li>

            <li>
              <button
                @click="user.logout"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="mt-5">
      <RouterView />
    </div>
  </div>
  <div
    v-else
    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
  >
    <FwbSpinner color="green" size="12" />
  </div>
</template>

<script setup>
import { useUserStore } from "../stores/userStore";
import { FwbButton, FwbSpinner } from "flowbite-vue";
import axios from "../axios";
import { toast } from "vue-sonner";
import { useRouter, onBeforeRouteUpdate } from "vue-router";
import { onMounted, ref } from "vue";

const user = useUserStore();
const router = useRouter();
const mobileNav = ref(false);

onBeforeRouteUpdate((_, _2, next) => {
  mobileNav.value = false;
  next();
});

onMounted(user.getUser);
</script>
