<template>
  <HeroSection />
  <!--To show all videos we need to pass show="all" as props  -->
  <VideosList show="3" />
  <div class="bg-gray">
    <BaseButton :btn-text="videosBtn" link="/videos" />
  </div>
  <CTASection />
  <BaseButton :btn-text="ctaBtn" link="/instructions" />
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";
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
  },
  setup() {
    const { t } = useI18n();
    const videosBtn = computed(() => t("videos.btn"));
    const ctaBtn = computed(() => t("cta.btn"));

    return { videosBtn, ctaBtn };
  },
};
</script>
