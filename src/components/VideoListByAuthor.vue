<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="w-full flex justify-center mt-8">
    <ul
      class="
        max-w-7xl
        grid grid-cols-1
        gap-y-6 gap-x-12
        sm:grid-cols-2
        lg:grid-cols-3
      "
    >
      <li
        v-for="video in videoDetails"
        :key="video.content"
        class="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
      >
        <!-- Goes to Loom website for now -->
        <a :href="video.fields.link" target="_blank">
          <div class="w-full flex items-center justify-between p-6 space-x-6">
            <div class="flex-1 truncate">
              <div class="flex items-center space-x-3">
                <h3 class="text-gray-900 text-sm font-medium truncate">
                  {{ video.fields.title }}
                </h3>
                <span
                  class="
                    flex-shrink-0
                    inline-block
                    px-2
                    py-0.5
                    text-green-800 text-xs
                    font-medium
                    bg-green-100
                    rounded-full
                  "
                  >{{
                    video.fields.content_tags.toString().replaceAll(",", " ")
                  }}</span
                >
              </div>
              <p class="mt-1 text-gray-500 text-sm truncate">
                {{ video.fields.subheadline }}
              </p>
              <p class="mt-1 text-gray-500 text-sm text-right truncate">
                Created at:
                {{ moment(video.fields.created_at).format("MMM Do YY") }}
              </p>
            </div>
            <img
              class="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
              :src="`${author.fields.github}.png`"
              alt=""
            />
          </div>
          <div>
            <div class="-mt-px flex divide-x divide-gray-200"></div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";

import moment from "moment";

import { findOneContent } from "../services/airtable/index";

export default {
  props: ["content", "author"],
  async setup(props) {
    const videoDetails = ref([]);

    // eslint-disable-next-line vue/no-setup-props-destructure
    let videoContentId = await props.content;
    let authorId = await props.author;

    // console.log(authorId.fields.github);

    await videoContentId.forEach((vc) => {
      findOneContent(vc).then((res) => {
        return videoDetails.value.push(res);
      });
    });
    // console.log(videoDetails.value);

    return {
      videoDetails,
      authorId,
      moment,
    };
  },
};
</script>
