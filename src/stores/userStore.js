import axios from "../axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { toast } from "vue-sonner";
import { useRouter } from "vue-router";

export const useUserStore = defineStore("user", () => {
  const user = ref();
  const router = useRouter();

  const getUser = async () => {
    try {
      const { data } = await axios.get("/users/getuser");

      user.value = data;
    } catch (e) {
      toast.error(e);
    }
  };

  const logout = async () => {
    try {
      await axios.post("/users/logout");
      user.user = null;
      localStorage.removeItem("token");
      router.push({ name: "Login" });
    } catch (e) {
      if (e.response?.data?.error) {
        return toast.error(e.response.data.error);
      }
      console.log(e);
      return toast.error("Something went wrong");
    }
  };

  return { user, getUser, logout };
});
