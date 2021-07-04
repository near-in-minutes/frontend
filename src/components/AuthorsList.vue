<template>
  <ul class="pt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <li v-for="author in authors" :key="author.githubUname" class="col-span-1 flex flex-col text-center bg-white rounded-lg">
      <div class="group block w-full py-3 aspect-w-10 aspect-h-7 rounded-lg bg-gray-50">
        <img class="w-32 h-32 flex-shrink-0 mx-auto bg-black rounded-full object-cover pointer-events-none group-hover:opacity-75" :src="author.githubAvatar" alt="profileImg" />
        <h3 class="mt-6 text-gray-900 text-sm font-medium">
          {{ author.name }}
        </h3>
        <p class="text-sm mt-3 text-near-royal">
          <a :href="author.github" target="_new"> github / {{ author.githubUname }} </a>
        </p>

        <div class="mt-6 py-5 sm:p-6 border-t border-gray-300 text-left mx-12 space-y-1">
          <p class="text-sm flex justify-between">
            <span class="text-gray-600">joined: </span>
            <span class="text-near-green">{{ formatDate(author.joined) }}</span>
          </p>
          <p v-if="author.contributions" class="text-sm flex justify-between">
            <span class="text-gray-600">videos:</span>
            <span class="text-near-green">{{ author.contributions }}</span>
          </p>
          <p class="text-sm flex justify-between text-right">
            <span class="text-gray-600">languages:</span>
            <span>
              <span v-for="lang in author.languages" :key="lang" class="inline-flex px-2 py-0.5 ml-2 my-1 rounded text-xs font-medium bg-gray-200 text-near-green">
                {{ lang }}
              </span>
            </span>
          </p>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
import { onMounted } from 'vue';

import { useI18n } from 'vue-i18n';

import { useAuthors } from '@/composables/useAuthors';

export default {
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const { authors, fetchAllAuthors } = useAuthors();

    onMounted(fetchAllAuthors);

    return {
      t,
      authors
    };
  },
  methods: {
    formatDate(d) {
      const date = new Date(d);
      return date.toLocaleDateString();
    }
  }
};
</script>
