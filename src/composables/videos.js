import { ref, onMounted, watch } from "vue";
import { getAllVideos, getVideos, findVideoById } from "../services/videos";

export const useVideos = (locale) => {
  const videos = ref([]);

  async function setLimit(limit = 3) {
    if (limit === "all") {
      onMounted(async () => {
        videos.value = await getAllVideos(locale.value);
      });

      watch(locale, async () => {
        videos.value = await getAllVideos(locale.value);
      });
    } else {
      onMounted(async () => {
        videos.value = await getVideos(locale.value, limit);
      });

      watch(locale, async () => {
        videos.value = await getVideos(locale.value, limit);
      });
    }
  }

  return { videos, setLimit };
};

export const useVideo = (locale, id) => {
  const video = ref({});

  onMounted(async () => {
    video.value = await findVideoById(locale.value, id);
  });

  watch(locale, async () => {
    video.value = await findVideoById(locale.value, id);
  });

  return video;
};
