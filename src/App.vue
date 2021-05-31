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
  <Footer />
</template>

<script>
import Navbar from "@/components/TheNavbar.vue";
import Footer from "@/components/TheFooter.vue";
export default {
  name: "App",
  components: { Navbar, Footer },
};
</script>

<style>
#app {
  font-family: Inter var;
  -webkit-font-smoothing: antialiased;
}
</style>
