<template>
  <div class="relative pt-64 pb-10 rounded-2xl shadow-xl overflow-hidden">
    <div class="h-60">
      <iframe :src="`https://www.loom.com/embed/${id}`" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  }
};
</script>
