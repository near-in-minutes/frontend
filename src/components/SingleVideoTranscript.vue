<template>
  <div class="text-lg">
    {{ transcription }}
  </div>
</template>

<script>
import axios from "axios";
import { ref, watchEffect } from "vue";
import { useTranscription } from "@/composables/videos";
export default {
  name: "VideoBase",
  props: ["transcriptionLink"],

  setup(props) {
    const transcription = ref("");
    watchEffect(() => {
      axios
        .get(props.transcriptionLink)
        .then((response) => {
          transcription.value = response.data.body;
        })
        .catch((error) => {
          console.log(error);
        });
    });

    return { transcription };
  },
};
</script>
