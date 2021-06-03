<template>
  <div class="relative bg-white py-16 sm:py-24 mx-auto px-4 max-w-6xl">
    <div
      class="
        lg:mx-auto
        lg:max-w-7xl
        lg:px-8
        lg:grid lg:grid-cols-1
        lg:gap-24
        lg:items-start
      "
    >
      <div class="relative sm:py-16 lg:py-0">
        <div
          aria-hidden="true"
          class="
            hidden
            sm:block
            lg:absolute
            lg:inset-y-0
            lg:right-0
            lg:w-screen
          "
        >
          <div
            class="
              absolute
              inset-y-0
              right-1/2
              w-full
              bg-gray-50
              rounded-r-3xl
              lg:right-72
            "
          />
          <svg
            class="
              absolute
              top-8
              left-1/2
              -ml-3
              lg:-right-8
              lg:left-auto
              lg:top-12
            "
            width="404"
            height="392"
            fill="none"
            viewBox="0 0 404 392"
          >
            <defs>
              <pattern
                id="02f20b47-fd69-4224-a62a-4c9de5c763f7"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  class="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width="404"
              height="392"
              fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)"
            />
          </svg>
        </div>
        <div
          class="
            relative
            mx-auto
            max-w-md
            px-4
            sm:max-w-3xl
            sm:px-6
            lg:px-0
            lg:max-w-none
            lg:py-20
          "
        >
          <SingleVideoBase :link="video.link" />
        </div>
      </div>

      <div class="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
        <!-- Content area -->
        <div class="pt-12 sm:pt-16 lg:pt-20">
          <SingleVideoTitle :video="video" />
          <div class="mt-6 space-y-6 border-t-2 border-gray pt-6">
            <SingleVideoTranscript
              :transcriptionLink="video.transcription"
              v-if="video.transcription"
            />
          </div>
          <div class="mt-10 border-t-2 border-gray pt-6">
            <a
              :href="video.reference"
              target="_blank"
              class="text-base font-medium"
            >
              {{ t("singleVideo.learnMore") }}
              <span aria-hidden="true">{{ video.title }} &rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useVideo } from "@/composables/videos";
import { useI18n } from "vue-i18n";
import SingleVideoBase from "@/components/SingleVideoBase.vue";
import SingleVideoTitle from "@/components/SingleVideoTitle.vue";
import SingleVideoTranscript from "@/components/SingleVideoTranscript.vue";

export default {
  name: "Video",
  components: {
    SingleVideoBase,
    SingleVideoTitle,
    SingleVideoTranscript,
  },
  props: ["id"],
  setup(props) {
    const { locale, t } = useI18n();
    const video = useVideo(locale, parseInt(props.id));

    return { video, t };
  },
};
</script>
