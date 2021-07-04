<template>
  <div class="relative pt-20 px-4 sm:px-6 lg:pb-28 lg:px-8">
    <div class="relative max-w-6xl m-auto">
      <div class="text-center">
        <h2 class="text-3xl tracking-tight font-extrabold sm:text-4xl text-near-green">
          {{ t('authors.title') }}
        </h2>
        <p class="mt-3 max-w-6xl mx-auto text-xl sm:mt-4 text-gray-500">
          {{ t('authors.subtitle') }}
        </p>
      </div>
      <AuthorsList />
      <div class="mt-12 max-w-2xl mx-auto text-center">
        <p><em>If you would like to join us, please register below as a video creator.</em></p>
        <button @click="openForm" type="button" class="my-6 inline-flex items-center px-2.5 py-1.5 border border-transparent font-medium rounded shadow-sm text-white bg-near-royal hover:bg-near-royal-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-near-royal-light uppercase">register as a video creator</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import AuthorsList from '@/components/AuthorsList';

export default {
  components: {
    AuthorsList
  },
  setup() {
    const { t, locale } = useI18n({ useScope: 'global' });

    return { t, locale };
  },
  methods: {
    openForm() {
      window.open('https://near-edu.typeform.com/to/POs9XeBv?source=near-in-minutes');
    }
  }
};
</script>
