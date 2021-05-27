<template>
  <Main />
  <!--To show all videos we need to pass show="all" as props  -->
  <VideosList show="3" />
</template>

<script>
import Main from "@/components/Main.vue";
import VideosList from "@/components/VideosList.vue";

export default {
  name: "Home",
  components: {
    Main,
    VideosList,
  },
};
</script>
