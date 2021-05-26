<template>
  <Main />
  <!--To show all videos we need to pass show="all" as props  -->
  <Videos show="3" />
</template>

<script>
import Main from "../components/Main.vue";
import Videos from "../components/Videos.vue";

export default {
  name: "Home",
  components: {
    Main,
    Videos,
  },
};
</script>
