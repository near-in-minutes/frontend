<template>
  <main class="py-20 mx-auto max-w-full px-4">
    <div class="flex flex-col items-center">
      <router-link
        v-for="video in videos"
        :key="video.id"
        :to="`/videos/${video.id}`"
      >
        <div>
          {{ video.title }}
        </div>
      </router-link>
    </div>
  </main>
</template>

<script>
import { useI18n } from "vue-i18n";
import { useVideos } from "@/composables/videos";

export default {
  name: "Videos",
  props: ["show"],
  setup(props) {
    const { t, locale } = useI18n();
    const { videos, setLimit } = useVideos(locale);

    if (props.show) {
      setLimit(props.show);
    }

    return { t, videos };
  },
};
</script>
