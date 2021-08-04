<template>
  <div class="w-full flex justify-center mt-8">
    <ul class="max-w-7xl grid grid-cols-1 gap-y-6 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="video in author.content" :key="video.id" class="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200 relative">
        <!-- Goes to Loom website for now -->
        <div @click="maybeWatch(video)" :class="[isLocale(video.fields.language) ? 'cursor-pointer hover:bg-near-yellow-light' : '', 'w-full flex items-center justify-between p-6 space-x-6']">
          <div class="flex-1 w-full">
            <div class="flex items-center space-x-3">
              <h3 class="text-gray-900 text-sm font-medium truncate">
                {{ video.fields.title }}
              </h3>
            </div>
            <div v-for="tag in video.fields.content_tags" :key="tag" class="flex-shrink-0 flex-wrap inline-block px-2 mr-2 py-0.5 my-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">{{ tag }}</div>

            <p class="mt-1 text-gray-500 text-sm truncate">
              {{ video.fields.subheadline }}
            </p>
            <p class="mt-1 text-gray-500 text-sm text-right truncate">
              Created at:
              {{ formatDate(video.fields.created) }}
            </p>
          </div>
        </div>
        <span :class="[isLocale(video.fields.language) ? 'bg-near-green-medium' : 'bg-gray-200', 'absolute top-0 right-0 m-2 h-2 w-2 flex-shrink-0 inline-block rounded-full']" aria-hidden="true" />
      </li>
    </ul>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

export default {
  props: {
    author: {
      type: Object,
      required: true
    }
  },
  setup() {
    const { locale } = useI18n({ useScope: 'global' });
    const router = useRouter();

    function formatDate(d) {
      const date = new Date(d);
      return date.toLocaleDateString();
    }

    function maybeWatch(v) {
      if (isLocale(v.fields.language)) {
        router.push({ name: 'video', params: { id: v.fields.content[0] } });
      }
    }

    function isLocale(lang) {
      return locale.value === lang;
    }

    return {
      formatDate,
      maybeWatch,
      isLocale
    };
  }
};
</script>
