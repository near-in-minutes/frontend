<template>
  <HeroSection />
  <CollectionsList />

  <!--To show all videos we need to pass show="all" as props  -->
  <VideosList show="3" />
  <div class="bg-gray">
    <BaseButton :btn-text="btnText" />
  </div>
  <CTASection />
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";
import CollectionsList from "@/components/CollectionsList.vue";
import VideosList from "@/components/VideosList.vue";
import CTASection from "@/components/CTASection.vue";
import BaseButton from "@/components/BaseButton.vue";
import { useI18n } from "vue-i18n";
import { computed } from "vue";

export default {
  name: "Home",
  components: {
    HeroSection,
    VideosList,
    CTASection,
    BaseButton,
    CollectionsList,
  },
  setup() {
    const { t } = useI18n();
    const btnText = computed(() => t("videos.btn"));

    return { btnText };
  },
};
</script>
