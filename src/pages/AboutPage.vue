<template>
  <div class="relative pt-20 px-4 sm:px-6 lg:pb-28 lg:px-8">
    <div class="relative max-w-6xl m-auto">
      <div class="text-center">
        <h2 class="text-3xl tracking-tight font-extrabold sm:text-4xl text-near-green">
          {{ t('about.title') }}
        </h2>
        <p class="mt-3 max-w-6xl mx-auto text-xl sm:mt-4 text-gray-500">
          {{ t('about.desc') }}
        </p>
      </div>
    </div>
    <div class="mt-10 max-w-6xl mx-auto space-y-6">
      <h1 class="text-2xl font-extralight">Earn by Helping Others Learn</h1>
      <p>NEAR is growing and so is our community of creators, developers and entrepreneurs.</p>
      <p>To support this growth we’re training 1000 teachers to build the Open Web.</p>
      <hr />
      <p>We want your help.</p>
      <ul class="list-disc list-inside space-y-4">
        <li>
          <strong>Are you an experienced teacher?</strong>
          <p class="ml-6">If you are, great! If not, you could become a teacher — we’re training and hiring teachers now!</p>
        </li>
        <li>
          <strong>Have you created educational content for the NEAR community?</strong>
          <p class="ml-6">If you have, great! If not, you could earn NEAR tokens to teach others — we’re funding contributions now!</p>
        </li>
      </ul>
      <p>
        <em>Fill out the form below to share more about yourself and your interests, including the work you have already created. We will be reaching out to interested teachers and contributors over coming months as our demands for content and training continue to grow. </em>
      </p>
      <button @click="openForm" type="button" class="my-12 inline-flex items-center px-2.5 py-1.5 border border-transparent font-medium rounded shadow-sm text-white bg-near-royal hover:bg-near-royal-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-near-royal-light uppercase">register as a video creator</button>
    </div>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n';

export default {
  setup() {
    const { t } = useI18n({ useScope: 'global' });

    return { t };
  },
  methods: {
    openForm() {
      window.open('https://near-edu.typeform.com/to/POs9XeBv?source=near-in-minutes');
    }
  }
};
</script>
