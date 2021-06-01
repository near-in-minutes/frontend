<template>
  <div class="bg-gray pt-16 sm:pt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-extrabold sm:text-4xl">
          {{ t("cta.title") }}
        </h2>
        <p class="mt-3 text-xl sm:mt-4 text-green">{{ t("cta.subTitle") }}</p>
      </div>
    </div>
    <div class="mt-10 pb-12 bg-white sm:pb-16">
      <div class="relative">
        <div class="absolute inset-0 h-1/2 bg-gray" />
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-4xl mx-auto">
            <dl class="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
              <div
                v-for="item in contribution"
                :key="item.name"
                class="
                  flex flex-col
                  border-b border-gray
                  p-6
                  text-center
                  sm:border-0 sm:border-r
                "
              >
                <a
                  :href="item.href"
                  class="
                    inline-flex
                    items-center
                    justify-center
                    p-6
                    text-base
                    font-medium
                    hover:text-green
                    hover:font-bold
                  "
                  target="_blank"
                >
                  {{ item.name }}
                </a>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";
import { computed, reactive } from "vue";

export default {
  name: "CTASection",
  setup() {
    const { t } = useI18n();

    const contribution = reactive([
      {
        name: computed(() => t("cta.newContent")),
        href: "https://github.com/near-in-minutes/community/issues/new?assignees=&labels=in+progress%2C+incoming&template=submit-new-content.md&title=%5BNEW+CONTENT%5D",
      },
      {
        name: computed(() => t("cta.newTopic")),
        href: "https://github.com/near-in-minutes/community/issues/new?assignees=ozanisgor&labels=looking+for+creator%2C+incoming&template=suggest-new-topic.md&title=%5BNEW+TOPIC%5D",
      },
      {
        name: computed(() => t("cta.translate")),
        href: "https://github.com/near-in-minutes/community/issues/new?assignees=&labels=translation%2C+incoming&template=translate-existing-content.md&title=%5BNEW+TRANSLATION%5D",
      },
    ]);

    return { t, contribution };
  },
};
</script>
