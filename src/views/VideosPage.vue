<template>
  <!--To show all videos we need to pass show="all" as props  -->
  <VideosList show="all" />
</template>

<script>
import VideosList from "@/components/VideosList.vue";

export default {
  name: "VideosPage",
  components: {
    VideosList,
  },
};
</script>
