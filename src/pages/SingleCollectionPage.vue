<template>
  <div class="relative pt-20 px-4 sm:px-6 lg:pb-28 lg:px-8">
    <div class="relative max-w-6xl m-auto">
      <div class="text-center">
        <h2 class="text-3xl tracking-tight font-extrabold sm:text-4xl">
          <span class="text-near-green"
            >{{ t("collections.single.title") }} </span
          ><span class="text-gray-500">{{ collection.name }}</span>
        </h2>
        <p
          v-if="collectionStatus === 'ready'"
          v-html="renderMarkdown(collection.description)"
          class="mt-3 max-w-6xl mx-auto text-xl sm:mt-4 text-gray-500"
        ></p>
      </div>
    </div>
    <div class="relative max-w-6xl m-auto">
      <main>
        <div class="mt-8 block">
          <div class="align-middle inline-block min-w-full">
            <div class="bg-gray-50 p-4">
              <dl class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div
                  v-for="item in stats"
                  :key="item.id"
                  class="
                    relative
                    bg-white
                    py-6
                    px-4
                    sm:py-4 sm:px-6
                    shadow
                    rounded-lg
                    overflow-hidden
                  "
                >
                  <dt>
                    <div :class="[item.color.bg, 'absolute rounded-md p-3']">
                      <component
                        :is="item.icon"
                        class="h-8 w-8 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    <p class="ml-16 text-sm font-bold text-gray-500 truncate">
                      {{ item.name }}
                    </p>
                  </dt>
                  <dd class="ml-16 flex items-baseline sm:pb-7">
                    <p :class="[item.color.text, 'text-4xl font-semibold']">
                      {{ item.stat }}
                    </p>
                  </dd>
                </div>
              </dl>
            </div>

            <table v-if="collection.total_posts" class="min-w-full">
              <thead>
                <tr>
                  <th
                    class="
                      px-6
                      pt-8
                      pb-4
                      border-b border-gray-200
                      bg-gray-50
                      text-left text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                  >
                    <span class="lg:pl-2">Videos</span>
                  </th>
                  <th
                    class="
                      hidden
                      sm:table-cell
                      px-6
                      pt-8
                      pb-4
                      border-b border-gray-200
                      bg-gray-50
                      text-left text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                  >
                    Authors
                  </th>
                  <th
                    class="
                      hidden
                      md:table-cell
                      px-6
                      pt-8
                      pb-4
                      border-b border-gray-200
                      bg-gray-50
                      text-right text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                      whitespace-nowrap
                    "
                  >
                    Created On
                  </th>
                  <th
                    class="
                      hidden
                      md:table-cell
                      px-6
                      pt-8
                      pb-4
                      border-b border-gray-200
                      bg-gray-50
                      text-right text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                      whitespace-nowrap
                    "
                  >
                    Last updated
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-100 align-top">
                <tr
                  v-for="video in content"
                  :key="video.id"
                  @click="
                    $router.push({ name: 'video', params: { id: video.id } })
                  "
                  class="hover:bg-near-yellow-light cursor-pointer"
                >
                  <td
                    class="
                      px-6
                      py-3
                      max-w-0
                      w-full
                      whitespace-nowrap
                      text-sm
                      font-medium
                      text-gray-600
                    "
                  >
                    <div class="flex flex-row">
                      <div>
                        <PlayIcon class="w-8 text-gray-400" />
                      </div>
                      <div class="ml-2 my-auto text-xl font-extralight">
                        {{ video.title }}
                      </div>
                    </div>
                    <div class="mt-2 ml-10">
                      <span class="text-gray-400">tags:</span>
                      <span
                        v-for="tag in video.tags"
                        :key="tag"
                        class="
                          inline-flex
                          items-center
                          ml-2
                          px-2
                          py-0.5
                          rounded
                          text-xs
                          bg-gray-100
                          text-gray-800
                        "
                      >
                        {{ tag }}
                      </span>
                    </div>
                    <div class="mt-2 ml-10">
                      <span class="text-gray-400">translations:</span>
                      <span
                        v-for="lang in video.languages"
                        :key="lang"
                        class="
                          inline-flex
                          items-center
                          ml-2
                          px-2
                          py-0.5
                          rounded
                          text-xs
                          bg-gray-100
                          text-gray-800
                        "
                      >
                        {{ lang }}
                      </span>
                    </div>
                  </td>
                  <td
                    class="
                      hidden
                      sm:table-cell
                      px-6
                      py-3
                      text-sm text-gray-600
                      font-light
                    "
                  >
                    <div class="flex items-center space-x-2">
                      <div class="flex flex-col min-w-max">
                        <p v-for="author in video.authors" :key="author">
                          {{ author }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td
                    class="
                      hidden
                      md:table-cell
                      px-6
                      py-3
                      whitespace-nowrap
                      text-sm text-gray-500 text-right
                    "
                  >
                    {{ formatDate(video.created) }}
                  </td>
                  <td
                    class="
                      hidden
                      md:table-cell
                      px-6
                      py-3
                      whitespace-nowrap
                      text-sm text-gray-500 text-right
                    "
                  >
                    {{ formatDate(video.modified) }}
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-else>
              <div
                class="mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8"
              >
                <h2
                  class="
                    text-3xl
                    font-extrabold
                    tracking-tight
                    text-gray-400
                    sm:text-4xl
                  "
                >
                  <span class="block"
                    >Interested in making this collection?</span
                  >
                  <span class="block">Register to get started today</span>
                </h2>
                <div class="mt-8 flex justify-center">
                  <button
                    @click="openForm"
                    type="button"
                    class="
                      my-6
                      inline-flex
                      items-center
                      px-2.5
                      py-1.5
                      border border-transparent
                      font-medium
                      rounded
                      shadow-sm
                      text-white
                      bg-near-royal
                      hover:bg-near-royal-medium
                      focus:outline-none
                      focus:ring-2
                      focus:ring-offset-2
                      focus:ring-near-royal-light
                      uppercase
                    "
                  >
                    register as a video creator
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";
import { useCollections } from "@/composables/useCollections";
import { useContent } from "@/composables/useContent";
import { onMounted, watch, toRaw, reactive } from "@vue/runtime-core";
import {
  PlayIcon,
  VideoCameraIcon,
  UserGroupIcon,
  TranslateIcon,
} from "@heroicons/vue/outline";
import marked from "marked";

const stats = reactive([
  {
    name: "Videos",
    color: { text: "text-near-red", bg: "bg-near-red" },
    icon: VideoCameraIcon,
  },
  {
    name: "Authors",
    color: { text: "text-near-blue", bg: "bg-near-blue" },
    icon: UserGroupIcon,
  },
  {
    name: "Languages",
    color: { text: "text-near-orange", bg: "bg-near-orange" },
    icon: TranslateIcon,
  },
]);

function addStat(name, value) {
  const index = stats.findIndex((s) => s.name === name);
  stats[index].stat = value;
}

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    PlayIcon,
  },
  methods: {
    formatDate(d) {
      const date = new Date(d);
      return date.toLocaleDateString();
    },
    renderMarkdown(md) {
      return marked(md);
    },
  },
  setup(props) {
    /* eslint-disable */
    const { t } = useI18n({ useScope: "global" });
    const {
      collections: collection,
      fetchOneCollection,
      status: collectionStatus,
    } = useCollections();
    const {
      content,
      fetchAllContent,
      setLimit,
      status: contentStatus,
    } = useContent();

    onMounted(() => fetchOneCollection(props.id));

    watch(collectionStatus, async (status) => {
      if (status === "ready") {
        const rawCollection = toRaw(collection.value);
        const numAuthors = rawCollection.authors.length;
        const numLanguages = rawCollection.languages.length;
        const numVideos = rawCollection.total_posts;

        addStat("Videos", numVideos);
        addStat("Authors", numAuthors);
        addStat("Languages", numLanguages);

        if (rawCollection.content) {
          setLimit(numVideos);
          await fetchAllContent(rawCollection.content);
        } else {
        }
      }
    });

    return {
      t,
      collection,
      collectionStatus,
      content,
      contentStatus,
      stats,
    };
  },
};
</script>
