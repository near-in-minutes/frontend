import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Videos from "@/components/Videos.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/videos/:videoId",
    name: "Video",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/Videos.vue"),
  },
  {
    path: "/videos",
    name: "Videos",
    component: Videos,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
