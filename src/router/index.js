import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import AuthLayout from "../views/AuthLayout.vue";
import Register from "../views/Register.vue";
import Main from "../views/Main.vue";
import Home from "../views/Home.vue";
import UploadVideo from "../views/UploadVideo.vue";
import Party from "../views/Party.vue";
import ManageUploads from "../views/ManageUploads.vue";

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
      redirect: "/home",
      component: Main,
      meta: { requiresAuth: true },
      children: [
        {
          name: "Upload",
          path: "/upload",
          component: UploadVideo,
        },
        {
          name: "Home",
          path: "/home",
          component: Home,
        },
        {
          name: "Party",
          path: "/party/:id",
          component: Party,
        },
        {
          name: "ManageUploads",
          path: "/manage",
          component: ManageUploads,
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
