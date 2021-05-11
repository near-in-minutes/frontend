<template>
  <h1>Videos page</h1>
  <Video v-for="(video, idx) in videos" :key="idx" :video="video" />
</template>

<script>
import videos from "../../services/videos.json";
import Video from "@/components/Video.vue";
console.log(videos);
export default {
  data() {
    return {
      videos: videos.projects,
    };
  },
  name: "Videos",
  components: {
    Video,
  },
};
</script>

<style></style>
