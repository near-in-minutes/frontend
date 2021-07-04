<template>
  <div class="relative pt-20 px-4 sm:px-6 lg:pb-28 lg:px-8">
    <div class="relative max-w-6xl m-auto">
      <div class="text-center">
        <h2 class="text-3xl tracking-tight font-extrabold sm:text-4xl text-near-green">
          {{ t('contribute.instructions.title') }}
        </h2>
        <p class="mt-3 max-w-4xl mx-auto text-xl sm:mt-4 text-gray-500">
          {{ t('contribute.instructions.desc') }}
        </p>
      </div>
    </div>
  </div>
  <div class="mx-auto max-w-6xl px-4 bg-white">
    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
      <div class="flex">
        <div class="ml-3">
          <a href="https://www.loom.com/" class="font-medium underline text-yellow-700 hover:text-yellow-600" target="_blank">
            {{ t('contribute.instructions.warning', ['Loom']) }}
          </a>
        </div>
      </div>
    </div>
    <div class="px-4">
      <h2 class="font-extrabold text-xl pb-4 text-near-green">
        {{ t('contribute.instructions.subTitle') }}
      </h2>
      <ol class="list-decimal font-bold space-y-20">
        <li>
          {{ t('contribute.instructions.stepOne') }}
          <a href="https://github.com/near-in-minutes/community/issues" class="font-medium underline" target="_blank"> {{ t('contribute.instructions.issues') }}</a>
          <img class="w-full h-auto my-6" src="@/assets/contribution-issues.png" alt="Workflow" />
        </li>

        <li>
          {{ t('contribute.instructions.stepTwo') }}

          <img class="w-full my-6" src="@/assets/contribution-new-issue.png" alt="Workflow" />
        </li>
        <li>
          {{ t('contribute.instructions.stepThree') }}
          <img class="w-full my-6" src="@/assets/contribution-add-issue.png" alt="Workflow" />
        </li>
      </ol>
      <div class="rounded-md bg-green-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <InformationCircleIcon class="h-8 w-8 text-near-green" aria-hidden="true" />
          </div>
          <div class="ml-3 flex-1 md:flex md:justify-between flex flex-col">
            <p class="text-sm text-near-green">
              {{ t('contribute.instructions.seeExample') }}
              <a href="#" class="whitespace-nowrap font-medium text-green-700 hover:text-green-600" target="_blank">{{ t('contribute.instructions.clickHere') }}<span aria-hidden="true">&rarr;</span></a>
            </p>
            <br />
            <p class="text-sm text-near-green">
              {{ t('contribute.instructions.learnMore') }}
              <a href="https://github.com/near-in-minutes/community/issues/4" class="whitespace-nowrap font-medium text-green-700 hover:text-green-600" target="_blank">{{ t('contribute.instructions.clickHere') }}<span aria-hidden="true">&rarr;</span></a>
            </p>
          </div>
        </div>
      </div>
      <div>
        <div>
          <p class="mt-10">{{ t('contribute.instructions.types') }}</p>

          <ul class="list-disc" v-for="item in contribution" :key="item.name">
            <li>
              <span class="font-bold text-near-green"> {{ item.name }}</span>
              {{ item.description }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <ContributionCTA />
</template>

<script>
import { computed, reactive } from 'vue';
import { useI18n } from 'vue-i18n';

import { InformationCircleIcon } from '@heroicons/vue/solid';

import ContributionCTA from '@/components/ContributionCTA.vue';

export default {
  components: {
    InformationCircleIcon,
    ContributionCTA
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });

    const contribution = reactive([
      {
        name: computed(() => t('contribute.newContent')),
        description: computed(() => t('contribute.instructions.newContentDesc'))
      },
      {
        name: computed(() => t('contribute.newTopic')),
        description: computed(() => t('contribute.instructions.newTopicDesc'))
      },
      {
        name: computed(() => t('contribute.translate')),
        description: computed(() => t('contribute.instructions.translateDesc'))
      }
    ]);
    return { t, contribution };
  }
};
</script>
