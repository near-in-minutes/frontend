<template>
  <Main />
  <!--To show all videos we need to pass show="all" as props  -->
  <VideosList show="3" />
  <div class="bg-gray">
    <VideosButton />
  </div>
  <CTASection />
</template>

<script>
import Main from "@/components/Main.vue";
import VideosList from "@/components/VideosList.vue";
import CTASection from "@/components/CTASection.vue";
import VideosButton from "@/components/VideosButton.vue";
import { useI18n } from "vue-i18n";

export default {
  name: "Home",
  components: {
    Main,
    VideosList,
    CTASection,
    VideosButton,
  },
  setup() {
    const { t } = useI18n();

    return { t };
  },
};
</script>
