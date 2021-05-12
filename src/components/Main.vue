<template>
  <main class="py-20 mx-auto max-w-full px-4 bg-gray-800">
    <div class="flex flex-col items-center">
      <img class="w-10/12 my-10" src="@/assets/main-image.png" alt="Workflow" />
      <h1
        class="text-4xl tracking-tight my-6 font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
      >
        <span class="block xl:inline text-white">{{ t("main.title1") }}</span>
        {{ " " }}
        <span class="block text-green-400 xl:inline">{{
          t("main.title2")
        }}</span>
      </h1>
    </div>
  </main>
</template>

<script>
import { useI18n } from "vue-i18n";
export default {
  name: "Main",
  setup() {
    const { t } = useI18n();
    return { t };
  },
};
</script>
