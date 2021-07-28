<template>
  <!-- es-lint ignore -->
  <div v-if="authorStatus === 'ready'" class="relative pt-16 sm:pt-24 mx-auto px-4 max-w-6xl">
    <div class="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-1 lg:gap-24 lg:items-start">
      <div class="relative sm:py-16 lg:py-0">
        <div aria-hidden="true" class="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen">
          <div class="absolute inset-y-0 right-1/2 w-full bg-gray-50 rounded-r-3xl lg:right-72" />
          <svg class="absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12" width="404" height="392" fill="none" viewBox="0 0 404 392">
            <defs>
              <pattern id="02f20b47-fd69-4224-a62a-4c9de5c763f7" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="392" fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)" />
          </svg>
        </div>
        <div class="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:py-20">
          <SingleVideo v-if="authorStatus === 'ready'" :id="embed(content)" />
        </div>
      </div>

      <div class="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
        <!-- Content area -->
        <div class="pt-12 sm:pt-16 lg:pt-20">
          <SingleVideoTitle :video="content" />
        </div>
      </div>
    </div>
  </div>
  <div v-if="authorStatus === 'notAvailable'" class="text-center pt-16 sm:pt-24">
    <h1>Sorry, this video is not available in the selected language.</h1>
    <h2 class="pb-8">Would you like to contribute and make a related video in your language?</h2>
    <ContributionCTA />
    <BaseButton :btn-text="ctaBtn" link="/contribute" />
  </div>
</template>
<script>
/* eslint-disable */
import { onMounted, watch, toRaw, computed } from 'vue';

import { useI18n } from 'vue-i18n';

import SingleVideo from '@/components/SingleVideo';
import SingleVideoTitle from '@/components/SingleVideoTitle';
import ContributionCTA from '@/components/ContributionCTA';
import BaseButton from '@/components/base/BaseButton';

import { useContent } from '@/composables/useContent';
import { useAuthors } from '@/composables/useAuthors';

export default {
  components: {
    SingleVideo,
    SingleVideoTitle,
    ContributionCTA,
    BaseButton
  },
  props: {
    id: {
      type: String,
      required: true,
      validator(value) {
        return value.startsWith('rec');
      }
    }
  },
  setup(props) {
    const { t, locale } = useI18n({ useScope: 'global' });
    const ctaBtn = computed(() => t('contribute.btn'));
    const { content, fetchTranslationsForContent, status: contentStatus } = useContent(locale);
    const { authors, fetchAllAuthors, status: authorStatus } = useAuthors();

    onMounted(async () => fetchTranslationsForContent(props.id));
    watch(locale, async () => fetchTranslationsForContent(props.id));

    watch(contentStatus, async status => {
      if (status === 'ready') fetchAllAuthors();
    });

    // populate author data as soon as it's ready
    watch(authorStatus, status => {
      if (status === 'ready') {
        const rawContent = toRaw(content.value);
        const rawAuthors = toRaw(authors.value);
        const translationContent = rawContent.filter(byLocale);

        if (translationContent.length === 0) {
          authorStatus.value = 'notAvailable';
        } else {
          content.value = translationContent.map(video => {
            return {
              ...video,
              author: rawAuthors.find(a => a.id === video.author[0])
            };
          })[0];
        }
      }
    });

    function embed(video) {
      if (!!video.link) {
        return video.link.replace('https://www.loom.com/share/', '');
      }
    }

    function byLocale(c) {
      if (!!c.language) {
        return c.language === locale.value;
      }
    }

    return { t, content, authorStatus, embed, ctaBtn };
  }
};
</script>
