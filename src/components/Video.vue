<template>
  <h1>{{ video.title }}</h1>
  <router-link :to="`/videos/${video.link}`">
    <button>View More</button>
  </router-link>
</template>

<script>
export default {
  name: "Videos",
  props: ["video"],
};
</script>
