<template>
  <NavigationComponent />

  <router-view />

  <FooterComponent />
</template>

<script>
import NavigationComponent from '@/components/layout/NavigationComponent';
import FooterComponent from '@/components/layout/FooterComponent';

export default {
  components: {
    NavigationComponent,
    FooterComponent
  }
};
</script>
