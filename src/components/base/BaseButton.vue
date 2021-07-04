<template>
  <div class="max-w-2xl mx-auto text-center pb-28 px-4 sm:py-20 sm:px-6 lg:px-8">
    <router-link :to="link" v-if="link">
      <div class="cursor-pointer mt-8 w-30 inline-flex items-center justify-center px-5 py-3 font-medium rounded-md text-white bg-near-green hover:bg-green-600 hover:text-white transform hover:scale-105 sm:w-auto">
        {{ btnText }}
      </div>
    </router-link>
    <div v-else class="cursor-pointer mt-8 w-30 inline-flex items-center justify-center px-5 py-3 font-medium rounded-md text-white bg-near-green hover:bg-green-600 hover:text-white transform hover:scale-105 sm:w-auto">
      {{ btnText }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseButton',
  props: ['btnText', 'link']
};
</script>
