import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import SingleVideoPage from "@/views/SingleVideoPage.vue";
import AllVideosPage from "@/views/AllVideosPage.vue";
import InstructionsPage from "@/views/InstructionsPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/videos",
    name: "Videos",
    component: AllVideosPage,
    props: true,
  },
  {
    path: "/videos/:id",
    name: "Video",
    component: SingleVideoPage,
    props: true,
  },
  {
    path: "/instructions",
    name: "Instructions",
    component: InstructionsPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
