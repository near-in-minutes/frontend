<template>
  <div
    class="max-w-2xl mx-auto text-center pb-28 px-4 sm:py-20 sm:px-6 lg:px-8"
  >
    <router-link to="/videos">
      <div
        class="
          mt-8
          w-30
          inline-flex
          items-center
          justify-center
          px-5
          py-3
          font-medium
          rounded-md
          text-white
          bg-green
          hover:bg-green-dark
          hover:text-white
          transform
          hover:scale-105
          sm:w-auto
        "
      >
        {{ btnText }}
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "VideosButton",
  props: ["btnText"],
};
</script>
