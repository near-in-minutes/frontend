<template>
  <div>
    <!-- <button @click="selectedProposals = 'all'">All</button> -->
    <button>Available</button>
    <button>Claimed</button>
    <button>Done</button>
  </div>
</template>

<script>
export default {
  props: ['selectedProposals'],
  setup() {}
};
</script>
