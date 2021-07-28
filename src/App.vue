<template>
  <NavigationComponent />
  <Suspense>
    <router-view />
  </Suspense>
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
