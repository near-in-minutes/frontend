<template>
  <div class="relative pt-6 px-4 sm:px-6 lg:pb-28 lg:px-8">
    <div class="relative max-w-6xl m-auto">
      <ul
        v-if="collections"
        class="
          mt-12
          max-w-lg
          mx-auto
          grid
          gap-6
          sm:grid-cols-2
          lg:grid-cols-4 lg:max-w-none
        "
      >
        <li
          v-for="collection in collections"
          :key="collection.id"
          @click="
            $router.push({ name: 'collection', params: { id: collection.id } })
          "
          class="col-span-1 flex shadow-sm rounded-md cursor-pointer"
        >
          <div
            :class="[
              colorizeCollection(collection.total_posts),
              'flex-shrink-0 flex items-center justify-center w-16 text-sm font-medium rounded-l-md',
            ]"
          >
            {{ t("collections.meal", collection.total_posts) }}
          </div>
          <div
            class="
              flex-1 flex
              justify-between
              border-t border-r border-b border-gray-light
              hover:border-gray-300 hover:bg-gray-100
              bg-white
              rounded-r-md
              truncate
              w-56
            "
          >
            <div class="flex-1 px-4 py-2 text-sm truncate">
              <div class="text-gray-900 font-medium hover:text-gray-600">
                {{ collection.name }}
              </div>
              <p class="text-gray-500">
                {{ t("collections.posts", collection.total_posts) }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";
import { useCollections } from "@/composables/useCollections";
import { onMounted } from "@vue/runtime-core";

export default {
  methods: {
    openCollection(id) {
      window.location.href = "/collections/" + id;
    },
  },
  setup() {
    const { t } = useI18n({ useScope: "global" });
    const { collections, fetchAllCollections } = useCollections();

    onMounted(fetchAllCollections);

    function colorizeCollection(size) {
      // "FAST | DIET | SNACK | PICNIC | FEAST",
      const key = t("collections.meal", size).toLowerCase();
      const color = {
        fast: "bg-near-royal-medium text-near-gray",
        diet: "bg-near-green-medium text-gray-600",
        snack: "bg-near-yellow-medium text-gray-600",
        picnic: "bg-near-orange-medium text-gray-600",
        feast: "bg-near-red-medium text-gray-600",
      }[key];
      if (color) return color;
      return "bg-near-gray";
    }

    return {
      collections,
      t,
      colorizeCollection,
    };
  },
};
</script>
