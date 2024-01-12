import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import AuthLayout from "../views/AuthLayout.vue";
import Register from "../views/Register.vue";
import Main from "../views/Main.vue";
import UploadVideo from "../views/UploadVideo.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "Auth",
      path: "/",
      redirect: "/login",
      component: AuthLayout,
      meta: { requiresAuth: false },
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
    {
      name: "Main",
      path: "/main",
      component: Main,
      meta: { requiresAuth: true },
      children: [
        {
          name: "Upload",
          path: "/upload",
          component: UploadVideo,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (!to.meta.requiresAuth && token) {
    next({ name: "Main" });
  } else if (to.meta.requiresAuth && !token) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
