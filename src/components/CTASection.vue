<template>
  <div class="bg-gray pt-16 sm:pt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-extrabold sm:text-4xl">
          Would you like to Contribute?
        </h2>
        <p class="mt-3 text-xl sm:mt-4 text-green">Let's hear from you</p>
      </div>
    </div>
    <div class="mt-10 pb-12 bg-white sm:pb-16">
      <div class="relative">
        <div class="absolute inset-0 h-1/2 bg-gray" />
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-4xl mx-auto">
            <dl class="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
              <div
                class="
                  flex flex-col
                  border-b border-gray
                  p-6
                  text-center
                  sm:border-0 sm:border-r
                "
              >
                <a
                  href="https://github.com/near-in-minutes/community/issues/new/choose"
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
                >
                  Submit New Content
                </a>
              </div>
              <div
                class="
                  flex flex-col
                  border-t border-b border-gray
                  p-6
                  text-center
                  sm:border-0 sm:border-l sm:border-r
                "
              >
                <a
                  href="https://github.com/near-in-minutes/community/issues/new/choose"
                  class="
                    inline-flex
                    items-center
                    justify-center
                    p-6
                    text-base
                    font-medium
                  "
                >
                  Suggest New Topic
                </a>
              </div>
              <div
                class="
                  flex flex-col
                  border-t border-gray
                  p-6
                  text-center
                  sm:border-0 sm:border-l
                "
              >
                <a
                  href="https://github.com/near-in-minutes/community/issues/new/choose"
                  class="
                    inline-flex
                    items-center
                    justify-center
                    p-6
                    text-base
                    font-medium
                  "
                >
                  Translate Content
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

export default {
  name: "CTASection",
  setup() {
    const { t } = useI18n();

    return { t };
  },
};
</script>

<div class="ml-3 inline-flex rounded-md shadow">
          <a
            href="https://github.com/near-in-minutes/community/issues/new/choose"
            class="
              inline-flex
              items-center
              justify-center
              px-6
              py-4
              text-base
              font-medium
              rounded-md
              text-green
              bg-gray
              hover:bg-green
              hover:text-white
              transform
              hover:scale-110
            "
          >
            Contribute Now
          </a>
        </div>
