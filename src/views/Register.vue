<template>
  <h2
    class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
  >
    Create an account
  </h2>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <div class="space-y-6">
      <div>
        <label
          for="name"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Name</label
        >
        <div class="mt-2">
          <input
            v-model="name"
            id="name"
            name="name"
            type="name"
            autocomplete="name"
            required
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <label
          for="email"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Email address</label
        >
        <div class="mt-2">
          <input
            v-model="email"
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            required
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label
            for="password"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Password</label
          >
        </div>
        <div class="mt-2">
          <input
            v-model="password"
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          @click="signUp"
          type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign Up
        </button>
      </div>
    </div>

    <p class="mt-10 text-center text-sm text-gray-500">
      Have an account ?
      <router-link
        :to="{ name: 'Login' }"
        class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >Login</router-link
      >
    </p>
  </div>
</template>

<script setup>
import axios from "../axios";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { toast } from "vue-sonner";
import { useUserStore } from "@/stores/userStore";

const user = useUserStore();
const name = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();

const signUp = async () => {
  try {
    if (name.value.length >= 12) {
      return toast.error("Your name must be less than 12 characters");
    }
    const { data } = await axios.post("/users/signup", {
      name: name.value,
      password: password.value,
      email: email.value,
    });

    if (data.user) {
      localStorage.setItem("token", data.token);
      user.user = data.user;
      router.push({ name: "Main" });
    }
  } catch (e) {
    if (e.response?.data?.error) {
      return toast.error(e.response.data.error);
    }
    console.log(e);
    return toast.error("Something went wrong");
  }
};
</script>
