<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div
    v-if="summaryStatus === 'ready'"
    class="
      max-w-6xl
      mx-auto
      py-12
      px-4
      sm:px-6
      lg:px-8
      border-b border-gray-light
    "
  >
    <div class="grid grid-cols-2 gap-8 lg:grid-cols-5">
      <div class="text-gray-400 flex flex-col justify-center">
        <p class="mx-auto text-6xl font-extralight">
          {{ summary.authors.length }}
        </p>
        <p class="mx-auto text-base text-gray-500">contributors</p>
      </div>
      <div class="text-gray-400 flex flex-col justify-center">
        <p class="mx-auto text-6xl font-extralight">
          {{ summary.contributions }}
        </p>
        <p class="mx-auto text-base text-gray-500">videos</p>
      </div>
      <div class="text-gray-400 flex flex-col justify-center">
        <p class="mx-auto text-6xl font-extralight">
          {{ toHours(summary.duration) }}
        </p>
        <p class="mx-auto text-base text-gray-500">hours of content</p>
      </div>
      <div class="text-gray-400 flex flex-col justify-center">
        <p class="mx-auto text-6xl font-extralight">
          {{ summary.language_content.length }}
        </p>
        <p class="mx-auto text-base text-gray-500">languages</p>
      </div>
      <div class="text-gray-400 flex flex-col justify-center">
        <p class="mx-auto text-6xl font-extralight">{{ summary.tags.size }}</p>
        <p class="mx-auto text-base text-gray-500">tags to filter</p>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, watch, toRaw } from "vue";
import { useSummary } from "@/composables/useSummary";

export default {
  methods: {
    toHours(seconds) {
      const hours = seconds / 60 / 60;
      return `${hours.toFixed(1)}`;
    },
  },
  setup() {
    const { status: summaryStatus, summary, fetchSummary } = useSummary();

    onMounted(fetchSummary);

    watch(summaryStatus, (status) => {
      const rawSummary = toRaw(summary.value);
      if (status === "ready") {
        summary.value = {
          ...rawSummary,
          tags: new Set(rawSummary.tags),
        };
      }
    });

    return {
      summary,
      summaryStatus,
    };
  },
};
</script>
