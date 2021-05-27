<template>
  <main class="py-20 mx-auto max-w-full px-4">
    <div>
      <h1>{{ video.title }}</h1>
      <p>{{ video.description }}</p>
      <p>{{ video.tags }}</p>
      <p>{{ video.transcription }}</p>
      <div class="flex-shrink-0">
        <div
          style="position: relative; padding-bottom: 56.25%; height: 0"
          class="object-cover"
        >
          <iframe
            :src="`https://www.loom.com/embed/${video.link}`"
            frameborder="0"
            webkitallowfullscreen
            mozallowfullscreen
            allowfullscreen
            style="
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
            "
          >
          </iframe>
        </div>
      </div>
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
