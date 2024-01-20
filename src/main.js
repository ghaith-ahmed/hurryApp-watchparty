import "./assets/main.css";
import profileDiv from "./components/profileDiv.vue";
import { createApp } from "vue";
import { createPinia } from "pinia";
import Particles from "@tsparticles/vue3";
import { loadSlim } from "@tsparticles/slim";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Particles, {
  init: async (engine) => {
    // await loadFull(engine); // you can load the full tsParticles library from "tsparticles" if you need it
    await loadSlim(engine); // or you can load the slim version from "@tsparticles/slim" if don't need Shapes or Animations
  },
});

app.component("profilePic", profileDiv);

app.mount("#app");
