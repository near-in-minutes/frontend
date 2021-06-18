<template>
  <div
    class="
      relative
      bg-near-gray
      pt-16
      pb-20
      px-4
      sm:px-6
      lg:pt-25
      lg:pb-28
      lg:px-8
    "
  >
    <div class="absolute inset-0">
      <div class="bg-white h-1/3 sm:h-2/3" />
    </div>
    <div class="relative max-w-7xl m-auto">
      <div class="text-center">
        <h2
          class="
            text-3xl
            tracking-tight
            font-extrabold
            text-gray-900
            sm:text-4xl
          "
        >
          {{ t("videos.title") }}
        </h2>
        <p class="mt-3 max-w-7xl mx-auto text-xl sm:mt-4">
          {{ t("videos.desc") }}
        </p>
      </div>

      <div
        class="mt-12 max-w-lg mx-auto grid gap-12 lg:grid-cols-3 lg:max-w-none"
      >
        <div
          v-for="video in videos"
          :key="video.id"
          class="flex flex-col rounded-lg shadow-lg overflow-hidden"
        >
          <div class="flex-shrink-0">
            <div class="h-50 w-full object-cover flex justify-center">
              <div class="absolute h-40 flex flex-col">
                <div class="pt-12">
                  <p class="text-sm font-medium text-near-green text-center">
                    {{ video.collection }}
                  </p>

                  <p class="text-2xl font-semibold text-white">
                    {{ video.title }}
                  </p>
                </div>
                <router-link :to="`/videos/${video.id}`">
                  <PlayIcon
                    class="
                      text-white
                      w-10
                      mx-auto
                      hover:text-near-green
                      hover:w-12
                      cursor-pointer
                    "
                  />
                </router-link>
              </div>
              <img src="@/assets/video-thumbnail.png" alt="logo" />
            </div>
          </div>

          <div class="flex-1 bg-white p-6 flex flex-col justify-between">
            <router-link :to="`/videos/${video.id}`">
              <div class="flex-1">
                <p
                  class="text-sm font-medium text-near-green"
                  v-for="tag in video.tags"
                  :key="tag"
                >
                  {{ tag }}
                </p>

                <p class="text-xl font-semibold text-gray-900">
                  {{ video.title }}
                </p>
                <p class="mt-3 text-base text-gray-500">
                  {{ video.description }}
                </p>
              </div>

              <div class="mt-6 flex items-center">
                <div class="flex-shrink-0">
                  <span class="sr-only">{{ video.creator_name }}</span>
                  <img
                    class="h-10 w-10 rounded-full"
                    :src="video.creator_imageUrl"
                    alt=""
                  />
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-gray-900">
                    {{ video.creator_name }}
                  </p>
                  <div class="flex space-x-1 text-sm text-gray-500">
                    <time :datetime="video.datetime"> {{ video.date }} </time>
                    <span aria-hidden="true"> &middot; </span>
                    <span> {{ video.time }} </span>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";
import { useVideos } from "@/composables/videos";
import { PlayIcon } from "@heroicons/vue/outline";

export default {
  name: "VideosList",
  props: ["show", "title"],
  components: {
    PlayIcon,
  },
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
