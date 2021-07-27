<template>
  <HeroSection />
  <SummaryStatistics />
  <CollectionsList />
  <div class="relative my-20 max-w-sm sm:max-w-lg lg:max-w-6xl mx-auto">
    <div class="absolute inset-0 flex items-center" aria-hidden="true">
      <div class="w-full border-t border-gray-200" />
    </div>
    <div class="relative flex justify-center">
      <span class="px-2 bg-white text-sm text-gray-500"> </span>
    </div>
  </div>
  <VideosList show="3" />

  <ContributionCTA />
  <BaseButton :btn-text="ctaBtn" link="/contribute" />
  <div class="relative max-w-6xl m-auto">
    <AuthorsList />
  </div>
</template>

<script>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import HeroSection from "@/components/HeroSection";
import SummaryStatistics from "@/components/SummaryStatistics";
import CollectionsList from "@/components/CollectionsList";
import VideosList from "@/components/VideosList";
import ContributionCTA from "@/components/ContributionCTA";
import AuthorsList from "@/components/AuthorsList";
import BaseButton from "@/components/base/BaseButton";

export default {
  components: {
    BaseButton,
    AuthorsList,
    CollectionsList,
    ContributionCTA,
    HeroSection,
    VideosList,
    SummaryStatistics,
  },
  setup() {
    const { t } = useI18n({ useScope: "global" });
    const ctaBtn = computed(() => t("contribute.btn"));

    return { t, ctaBtn };
  },
};
</script>
