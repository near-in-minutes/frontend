<template>
  <teleport to="head">
    <meta property="title" :content="metadata.title">
    <meta property="description" :content="metadata.description">
    <meta property="og:title" :content="metadata.title">
    <meta property="og:description" :content="metadata.description">
    <meta property="og:image" content="https://near-in-minutes.com/og-preview-image.jpg" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="NEAR in minutes" />
    <meta property="twitter:card" content="summary">
    <meta property="twitter:site" content="@NEARProtocol">
  </teleport>
  <NavigationComponent />
  <Suspense>
    <router-view />
  </Suspense>
  <FooterComponent />
</template>

<script>
import { computed, reactive } from 'vue';
import { useI18n } from 'vue-i18n';

import NavigationComponent from "@/components/layout/NavigationComponent";
import FooterComponent from "@/components/layout/FooterComponent";


export default {
  components: {
    NavigationComponent,
    FooterComponent,
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });

    const metadata = reactive(
      {
        title: computed(() => t('metadata.title')),
        description: computed(() => t('metadata.description'))
      }
    );

    return { t, metadata };
  }
};
</script>