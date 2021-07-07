<template>
  <!-- <h1>{{ t("navbar.authors") }}</h1> -->
  <div class="relative bg-white py-16 sm:py-24">
    <div class="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start">
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
          <!-- Testimonial card-->
          <div class="relative pt-64 pb-10 rounded-2xl shadow-xl overflow-hidden">
            <img class="absolute inset-0 h-full w-full object-cover" :src="`${author.fields.github}.png`" alt="" />
            <div class="absolute inset-0 bg-white-300 mix-blend-multiply" />
            <div class="absolute inset-0 bg-gradient-to-tl from-near-green via-black opacity-50" />
            <div class="relative px-8">
              <blockquote class="mt-8">
                <footer class="mt-4">
                  <p class="text-base font-semibold text-white">{{ author.fields.name }} // {{ author.fields.near_account }}</p>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      <div class="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
        <!-- Content area -->
        <div class="pt-12 sm:pt-16 lg:pt-20 xl:pt-0">
          <h2 class="text-3xl text-gray-900 font-extrabold tracking-tight sm:text-4xl">{{ author.fields.name }}'s Stats</h2>
        </div>

        <!-- Stats section -->
        <div class="mt-10">
          <dl class="grid grid-cols-2 gap-x-4 gap-y-8">
            <div v-for="stat in stats" :key="stat.label" class="border-t-2 border-gray-100 pt-6">
              <dt class="text-base font-medium text-gray-500">
                {{ stat.label }}
              </dt>
              <a v-if="stat.link" :href="stat.link" target="_blank">
                <dd class="text-3xl font-extrabold tracking-tight text-gray-900 hover:text-gray-600 pr-4">
                  {{ stat.value }}
                </dd>
              </a>
              <dd v-else class="text-3xl font-extrabold tracking-tight text-gray-900 pr-4">
                {{ stat.value }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
  <div class="relative">
    <h2 class="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl mt-7">Dive into the tutorials</h2>
    <p class="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500">{{ author.fields.name }} created {{ author.fields.contributions }} tutorial videos that explain how to use NEAR better and faster!</p>
  </div>
  <VideoListByAuthor :content="content" :author="author" />
</template>

<script>
import { useI18n } from 'vue-i18n';

import { findOneAuthor } from '../services/airtable/index';

import VideoListByAuthor from '@/components/VideoListByAuthor.vue';

export default {
  props: ['id'],
  async setup(props) {
    const { t } = useI18n({ useScope: 'global' });

    const author = await findOneAuthor(props.id);
    const content = author.fields.content;

    const languages = author.fields.languages.map(lang => {
      if (lang == 'en') {
        return 'English';
      }
      if (lang == 'tr') {
        return 'Turkish';
      }
      if (lang == 'ar') {
        return 'Arabic';
      }
      if (lang == 'hi') {
        return 'Hindi';
      }
      if (lang == 'es') {
        return 'Spanish';
      }
    });
    // console.log(languages);
    const authorLanguages = languages.toString().replace(',', ',  '); //add some space after comma
    // console.log(authorLanguages);

    const authorGithubName = author.fields.github.slice(19);
    const authorGithubLink = author.fields.github;

    const stats = [
      { label: 'Languages', value: authorLanguages },
      { label: 'Videos', value: author.fields.contributions },
      { label: 'Github', value: authorGithubName, link: authorGithubLink }
    ];

    return { t, author, content, stats };
  },
  components: {
    VideoListByAuthor
  }
};
</script>
