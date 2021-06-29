import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import SingleVideoPage from "@/views/SingleVideoPage.vue";
import AllVideosPage from "@/views/AllVideosPage.vue";
import InstructionsPage from "@/views/InstructionsPage.vue";
import AuthorProfilePage from "@/views/AuthorProfilePage.vue";

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
    path: "/authors/:id",
    name: "Author",
    component: AuthorProfilePage,
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
