<template>
  <div :key="Math.random()" class="relative px-4 sm:px-6 lg:pb-28 lg:px-8">
    <div class="relative max-w-6xl m-auto">
      <div class="mt-12 max-w-lg mx-auto grid gap-12 lg:grid-cols-3 lg:max-w-none">
        <div v-for="video in content" :key="renderContentId(video)" class="flex flex-col rounded-lg shadow-md hover:shadow-xl overflow-hidden">
          <router-link :to="'/videos/' + renderContentId(video)">
            <div class="flex-shrink-0">
              <div class="w-full object-cover flex justify-center">
                <div class="absolute h-40 flex flex-col">
                  <div class="pt-12">
                    <p class="text-sm font-medium text-near-green text-center">
                      {{ video.collection }}
                    </p>
                    <p class="text-2xl font-semibold text-white w-64 text-center">
                      {{ video.title }}
                    </p>
                  </div>
                  <PlayIcon class="mt-5 text-white w-10 mx-auto" />
                </div>
                <img src="@/assets/video-thumbnail.png" alt="logo" class="h-52" />
              </div>
            </div>

            <div class="flex-1 bg-white p-6 flex flex-col justify-between">
              <div class="h-40">
                <span class="text-sm font-medium text-near-green mr-3" v-for="tag in video.content_tags" :key="tag">
                  {{ tag }}
                </span>
                <p class="text-xl font-semibold text-gray-900">
                  {{ video.headline }}
                </p>
                <p class="mt-3 text-base text-gray-500">
                  {{ video.subheadline }}
                </p>
              </div>
              <div v-if="video.author" class="mt-6 flex items-center">
                <div class="flex-shrink-0">
                  <span class="sr-only">{{ video.author.name }}</span>
                  <img class="h-10 w-10 rounded-full" :src="video.author.githubAvatar" alt="" />
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-gray-900">
                    {{ video.author.name }}
                  </p>
                  <div class="flex space-x-1 text-sm text-gray-500">
                    <time :datetime="video.create_at">
                      {{ formatDate(video.created) }}
                    </time>
                    <span aria-hidden="true"> &middot; </span>
                    <span> {{ formatDuration(video.duration) }} </span>
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div v-if="readyToLoadMoreVideos" class="max-w-2xl mx-auto text-center pb-28 px-4 sm:py-20 sm:px-6 lg:px-8">
      <div @click="loadMoreVideos" class="cursor-pointer mt-8 w-30 inline-flex items-center justify-center px-5 py-3 font-medium rounded-md text-white bg-near-green hover:bg-green-600 hover:text-white transform hover:scale-105 sm:w-auto">load more</div>
    </div>
    <div v-else-if="show == '3'" class="max-w-2xl mx-auto text-center pb-28 px-4 sm:py-20 sm:px-6 lg:px-8">
      <router-link to="/videos">
        <div class="cursor-pointer mt-8 w-30 inline-flex items-center justify-center px-5 py-3 font-medium rounded-md text-white bg-near-green hover:bg-green-600 hover:text-white transform hover:scale-105 sm:w-auto">View all videos</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { onMounted, watch, computed, toRaw, ref } from '@vue/runtime-core';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { PlayIcon } from '@heroicons/vue/outline';

import { useContent } from '@/composables/useContent';
import { useAuthors } from '@/composables/useAuthors';

export default {
  props: {
    show: {
      type: String,
      required: true
    }
  },
  components: {
    PlayIcon
  },
  setup(props) {
    const { t, locale } = useI18n({ useScope: 'global' });
    const { status: contentStatus, content, limit, hasMore, setLimit, setLocale: setContentLocale, fetchMostRecent } = useContent(locale);

    onMounted(() => {
      setLimit(props.show);
      setContentLocale(locale.value);
      fetchMostRecent();
    });

    watch(locale, fetchMostRecent);

    const { status: authorStatus, authors, fetchAllAuthors } = useAuthors();

    // wait til content is available to fetch authors
    watch(contentStatus, status => {
      if (status === 'ready') fetchAllAuthors();
    });

    // populate author data as soon as it's ready
    watch(authorStatus, status => {
      if (status === 'ready') {
        const rawContent = toRaw(content.value);
        const rawAuthors = toRaw(authors.value);
        content.value = rawContent.map(video => {
          return {
            ...video,
            author: rawAuthors.find(a => a.id === video.author[0])
          };
        });
      }
    });

    const { currentRoute } = useRouter();
    const readyToLoadMoreVideos = computed(() => currentRoute.value.name === 'videos' && hasMore.value);

    function formatDate(d) {
      const date = new Date(d);
      return date.toLocaleDateString();
    }

    // formats duration in seconds into mins:secs
    function formatDuration(d) {
      const mins = Math.floor(d / 60);
      const secs = d % 60;
      return `${mins}:${secs.toString().length === 1 ? `0${secs}` : secs}`;
    }

    // render content id for video if it's available
    function renderContentId(v) {
      return v.content ? v.content[0] : '';
    }

    // add another set of size `props.show` to the list of videos
    function loadMoreVideos() {
      setLimit(limit.value + parseInt(props.show));
      fetchMostRecent();
    }

    return {
      t,
      content,
      renderContentId,
      formatDate,
      formatDuration,
      contentStatus,
      loadMoreVideos,
      readyToLoadMoreVideos
    };
  }
};
</script>
