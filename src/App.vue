<template>
  <Navbar />
  <Suspense>
    <template #default>
      <router-view />
    </template>
    <template #fallback>
      <span>Loading...</span>
    </template>
  </Suspense>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  name: "App",
  components: { Navbar },
};
</script>

<style>
#app {
  font-family: Inter var;
  -webkit-font-smoothing: antialiased;
}
</style>
