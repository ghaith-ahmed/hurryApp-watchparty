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
                >Your videos</router-link
              >
            </li>
            <li class="md:hidden">
              <button
                @click="switchTheme"
                class="block w-full text-left py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                aria-current="page"
              >
                Switch theme
              </button>
            </li>
            <li class="md:hidden">
              <button
                @click="logout"
                class="py-2 block w-full text-left px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                aria-current="page"
              >
                Logout
              </button>
            </li>
            <li class="md:flex hidden items-center relative">
              <button
                ref="openBtn"
                @click="openDropdown = !openDropdown"
                class="block text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  class="dark:fill-white"
                  width="14"
                  viewBox="0 0 448 512"
                >
                  <path
                    d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
                  />
                </svg>
              </button>
              <transition
                enter-from-class="scale-0"
                enter-active-class="transition origin-top-right"
                enter-to-class="scale-100"
              >
                <div
                  v-if="openDropdown"
                  class="z-10 absolute top-8 right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul
                    class="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>
                      <button
                        @click="switchTheme"
                        class="block px-4 w-full text-left py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Switch theme
                      </button>
                    </li>
                    <li>
                      <button
                        @click="logout"
                        href="#"
                        class="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </transition>
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
import { FwbButton, FwbSpinner, FwbDropdown } from "flowbite-vue";
import axios from "../axios";
import { toast } from "vue-sonner";
import { useRouter, onBeforeRouteUpdate } from "vue-router";
import { onMounted, onBeforeUnmount, ref } from "vue";
import darkModeToggle from "./darkModeToggle.vue";

const user = useUserStore();
const router = useRouter();
const mobileNav = ref(false);
const openDropdown = ref(false);
const openBtn = ref();

const switchTheme = () => {
  if (document.body.classList.contains("dark")) {
    document.body.classList.remove("dark");
    localStorage.setItem("dark", false);
  } else {
    document.body.classList.add("dark");
    localStorage.setItem("dark", true);
  }
};

onBeforeRouteUpdate((_, _2, next) => {
  mobileNav.value = false;
  next();
});

onMounted(() => {
  user.getUser();
  document.addEventListener("click", closeDropDownWhenClicking);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeDropDownWhenClicking);
});

const closeDropDownWhenClicking = (event) => {
  if (openBtn.value && !openBtn.value.contains(event.target)) {
    openDropdown.value = false;
    return;
  }
};
</script>
