<template>
  <div class="relative pt-20 px-4 sm:px-6 lg:pb-28 lg:px-8">
    <div class="relative max-w-6xl m-auto">
      <div class="text-center">
        <h2 class="text-3xl tracking-tight font-extrabold sm:text-4xl text-near-green">
          {{ t('collections.title') }}
        </h2>
        <p class="mt-3 max-w-6xl mx-auto text-xl sm:mt-4 text-gray-500">
          {{ t('collections.subtitle') }}
        </p>
      </div>
    </div>
    <div class="relative max-w-6xl m-auto">
      <CollectionsList />
    </div>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import CollectionsList from '@/components/CollectionsList';

export default {
  components: {
    CollectionsList
  },
  setup() {
    const { t, locale } = useI18n({ useScope: 'global' });

    return { t, locale };
  }
};
</script>
