<template>
  <main class="py-20 mx-auto max-w-7xl px-4 bg-white">
    <div class="flex flex-col items-center">
      <img
        class="w-10/12 my-10 hidden md:block"
        src="@/assets/hero-image.png"
        alt="Workflow"
      />
      <h1
        class="
          text-4xl
          tracking-tight
          my-6
          font-extrabold
          text-gray-900 text-center
          sm:text-5xl
          md:text-6xl
        "
      >
        <i18n-t keypath="main.title" tag="p" class="block xl:inline">
          <span class="block text-near-green xl:inline">{{
            t("main.titleHighlight")
          }}</span>
        </i18n-t>
      </h1>
    </div>
  </main>
</template>

<script>
import { useI18n } from "vue-i18n";

export default {
  setup() {
    const { t } = useI18n({ useScope: "global" });

    return { t };
  },
};
</script>
