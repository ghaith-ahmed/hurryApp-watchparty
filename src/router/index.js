import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import AuthLayout from "../views/AuthLayout.vue";
import Register from "../views/Register.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "Auth",
      path: "/",
      redirect: "/login",
      component: AuthLayout,
      children: [
        {
          name: "Login",
          path: "/login",
          component: Login,
        },
        {
          name: "Register",
          path: "/register",
          component: Register,
        },
      ],
    },
  ],
});

export default router;
