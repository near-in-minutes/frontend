<template>
  <!--To show all videos we need to pass show="all" as props  -->
  <Videos show="all" />
</template>

<script>
import Videos from "@/components/Videos.vue";

export default {
  name: "VideoList",
  components: {
    Videos,
  },
};
</script>
