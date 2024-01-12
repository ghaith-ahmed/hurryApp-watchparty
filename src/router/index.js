import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "Login",
      path: "/",
      component: Login,
    },
  ],
});

export default router;
