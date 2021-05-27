import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Video from "@/views/Video.vue";
import VideosList from "@/views/VideosList.vue";

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
    path: "/videos",
    name: "Videos",
    component: VideosList,
    props: true,
  },
  {
    path: "/videos/:id",
    name: "Video",
    component: Video,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
