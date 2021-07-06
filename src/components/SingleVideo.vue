<template>
  <div class="relative pt-64 pb-10 rounded-2xl shadow-xl overflow-hidden">
    <div class="h-60">
      <iframe :src="`https://www.loom.com/embed/${id}`" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%" />
    </div>
  </div>
  <ShareButton :path="path"> </ShareButton>
</template>

<script>
import ShareButton from "@/components/ShareButton.vue";
import { ref } from "vue";
export default {
  setup() {
    const path = ref("https://near-in-minutes.com" + window.location.pathname);
    return { path };
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    ShareButton,
  },
};
</script>