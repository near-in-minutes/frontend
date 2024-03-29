<template>
  <div class="relative bg-white py-16 sm:py-24">
    <div v-if="authorStatus === 'ready'" class="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start">
      <div class="relative sm:py-16 lg:py-0">
        <div aria-hidden="true" class="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen">
          <div class="absolute inset-y-0 right-1/2 w-full bg-gray-50 rounded-r-3xl lg:right-72" />
          <svg class="absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12" width="350" height="360" fill="none" viewBox="0 0 350 360">
            <defs>
              <pattern id="02f20b47-fd69-4224-a62a-4c9de5c763f7" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="350" height="360" fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)" />
          </svg>
        </div>
        <div class="relative mx-auto max-w-md px-4 sm:px-6 lg:px-0 sm:max-w-md lg:py-20">
          <!-- Author card-->
          <div class="relative pt-64 pb-10 rounded-2xl shadow-xl overflow-hidden">
            <img class="absolute inset-0 h-full w-full object-cover" :src="author.github.avatar" alt="github avatar" />
            <div class="absolute inset-0 bg-white-300 mix-blend-multiply" />
            <div class="absolute inset-0 bg-gradient-to-tl from-near-green via-black opacity-30" />
            <div class="relative px-8 bg-near-black opacity-70">
              <blockquote class="mt-8">
                <footer class="mt-4">
                  <p class="text-base text-white font-bold"><span class="text-white">MainNet: </span> {{ author.near_account }}</p>
                  <p class="text-base text-white font-bold"><span class="text-white">TestNet: </span> {{ author.near_testnet }}</p>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      <div class="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
        <!-- Content area -->
        <div class="pb-6 sm:pb-16 lg:pb-20 xl:pb-0">
          <h2 class="text-3xl text-gray-900 font-extrabold tracking-tight sm:text-4xl">
            {{ author.name }}
          </h2>
        </div>
        <div>
          {{ author.notes }}
        </div>
        <div class="mt-10">
          <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-8">
            <div>
              <dt class="text-base font-medium text-gray-500">videos</dt>
              <dd class="text-3xl font-extrabold tracking-tight text-gray-900 hover:text-gray-600 pr-4">
                {{ author.contributions }}
              </dd>
            </div>
            <div>
              <dt class="text-base font-medium text-gray-500">languages</dt>
              <dd class="text-3xl font-extrabold tracking-tight text-gray-900 hover:text-gray-600 pr-4">
                {{ author.languages }}
              </dd>
            </div>
            <div>
              <dt class="text-base font-medium text-gray-500">github</dt>
              <dd class="text-3xl font-extrabold tracking-tight text-gray-900 hover:text-gray-600 pr-4">
                <a :href="author.github.url" target="_blank">{{ author.github.name }}</a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
  <div class="relative">
    <h2 class="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl mt-7">Dive into the tutorials</h2>
    <p class="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500">{{ author.name }} created {{ author.contributions }} tutorial videos that explain how to use NEAR better and faster!</p>
  </div>
  <VideoListByAuthor v-if="authorStatus === 'ready'" :author="author" />
</template>

<script>
import { useI18n } from 'vue-i18n';
import { onMounted, watch } from 'vue';
import { localeToLanguage } from '@/i18n';
import { useAuthors } from '@/composables/useAuthors';
import VideoListByAuthor from '@/components/VideoListByAuthor.vue';
export default {
  components: {
    VideoListByAuthor
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { t } = useI18n({ useScope: 'global' });
    const { status: authorStatus, authors: author, fetchOneAuthor } = useAuthors();
    onMounted(() => fetchOneAuthor(props.id, true));
    watch(authorStatus, status => {
      if (status === 'ready') {
        author.value = {
          ...author.value,
          languages: author.value.languages.map(localeToLanguage).join(', ')
        };
      }
    });
    return { t, author, authorStatus };
  }
};
</script>
