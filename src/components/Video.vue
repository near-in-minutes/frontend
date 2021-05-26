<template>
  <main class="py-20 mx-auto max-w-full px-4">
    <div>
      <h1>{{ video.title }}</h1>
      <p>{{ video.description }}</p>
      <p>{{ video.tags }}</p>
      <p>{{ video.transcription }}</p>
    </div>
  </main>
</template>
<script>
import { useVideo } from "@/composables/videos";
import { useI18n } from "vue-i18n";

export default {
  name: "Video",
  props: ["id"],
  setup(props) {
    const { locale } = useI18n();
    const video = useVideo(locale, parseInt(props.id));

    return { video };
  },
};
</script>
