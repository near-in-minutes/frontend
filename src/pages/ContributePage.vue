<template>
  <div class="relative pt-20 px-4 sm:px-6 lg:pb-28 lg:px-8">
    <div class="relative max-w-6xl m-auto">
      <div class="text-center">
        <h2
          class="
            text-3xl
            tracking-tight
            font-extrabold
            sm:text-4xl
            text-near-green
          "
        >
          {{ t("contribute.instructions.title") }}
        </h2>
      </div>
      <p class="mt-3 max-w-4xl mx-auto text-xl sm:mt-4 text-gray-500">
        {{ t("contribute.instructions.desc") }}
      </p>
      <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
        <div class="flex">
          <div class="ml-3">
            <a
              href="https://www.loom.com/"
              class="
                font-medium
                underline
                text-yellow-700
                hover:text-yellow-600
              "
              target="_blank"
            >
              {{ t("contribute.instructions.warning", ["Loom"]) }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="w-full px-4 pt-2">
    <div class="w-full max-w-6xl p-2 pb-10 mx-auto bg-white rounded-2xl">
      <Disclosure v-slot="{ open }">
        <DisclosureButton
          class="
            flex
            justify-between
            w-full
            px-4
            py-2
            text-sm
            font-medium
            text-left text-green-900
            bg-green-100
            rounded-lg
            hover:bg-green-200
            focus:outline-none
            focus-visible:ring
            focus-visible:ring-green-500
            focus-visible:ring-opacity-75
          "
        >
          <span>{{ t("contribute.instructions.setup.title") }}</span>
          <ChevronUpIcon
            :class="open ? 'transform rotate-0' : 'transform rotate-180'"
            class="w-5 h-5 text-green-500"
          />
        </DisclosureButton>
        <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
          <div class="py-20 mx-auto max-w-6xl px-4 bg-white">
            <div class="px-4">
              <h2 class="font-extrabold text-xl pb-4 text-near-green">
                {{ t("contribute.instructions.setup.title") }}
              </h2>
              <ol class="list-decimal font-bold list-inside">
                <li>
                  {{ t("contribute.instructions.setup.stepOne") }}
                  <img
                    class="w-full h-auto my-6"
                    src="@/assets/contribute/setup-divided-screen.png"
                  />
                </li>

                <li>
                  {{ t("contribute.instructions.setup.stepTwo") }}

                  <img
                    class="w-50 my-6 mx-auto"
                    src="@/assets/contribute/setup-system-info.png"
                  />
                </li>
              </ol>
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
      <Disclosure as="div" class="mt-2" v-slot="{ open }">
        <DisclosureButton
          class="
            flex
            justify-between
            w-full
            px-4
            py-2
            text-sm
            font-medium
            text-left text-green-900
            bg-green-100
            rounded-lg
            hover:bg-green-200
            focus:outline-none
            focus-visible:ring
            focus-visible:ring-green-500
            focus-visible:ring-opacity-75
          "
        >
          <span>{{ t("contribute.instructions.video.title") }}</span>
          <ChevronUpIcon
            :class="open ? 'transform rotate-0' : 'transform rotate-180'"
            class="w-5 h-5 text-green-500"
          />
        </DisclosureButton>
        <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
          <div class="py-20 mx-auto max-w-6xl px-4 bg-white">
            <div class="px-4">
              <h2 class="font-extrabold text-xl pb-4 text-near-green">
                {{ t("contribute.instructions.video.title") }}
              </h2>
              <ol class="list-decimal font-bold list-inside">
                <li>
                  {{ t("contribute.instructions.video.stepOne") }}
                  <a
                    href="https://www.loom.com/"
                    class="font-medium underline"
                    target="_blank"
                  >
                    {{ t("contribute.instructions.video.loom") }}</a
                  >
                  <img
                    class="w-full h-auto my-6"
                    src="@/assets/contribute/loom-website.png"
                  />
                </li>

                <li>
                  {{ t("contribute.instructions.video.stepTwo") }}

                  <img
                    class="w-50 my-6 mx-auto"
                    src="@/assets/contribute/loom-sign-up.png"
                  />
                </li>
                <li>
                  {{ t("contribute.instructions.video.stepThree") }}
                  <img
                    class="w-50 my-6 mx-auto"
                    src="@/assets/contribute/loom-download.png"
                  />
                </li>
                <li>
                  {{ t("contribute.instructions.video.stepFour") }}
                  <img
                    class="w-50 my-6 mx-auto"
                    src="@/assets/contribute/loom-app.png"
                  />
                </li>
              </ol>
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
      <Disclosure as="div" class="mt-2" v-slot="{ open }">
        <DisclosureButton
          class="
            flex
            justify-between
            w-full
            px-4
            py-2
            text-sm
            font-medium
            text-left text-green-900
            bg-green-100
            rounded-lg
            hover:bg-green-200
            focus:outline-none
            focus-visible:ring
            focus-visible:ring-green-500
            focus-visible:ring-opacity-75
          "
        >
          <span>{{ t("contribute.instructions.issues.subTitle") }}</span>
          <ChevronUpIcon
            :class="open ? 'transform rotate-0' : 'transform rotate-180'"
            class="w-5 h-5 text-green-500"
          />
        </DisclosureButton>
        <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
          <div class="py-20 mx-auto max-w-6xl px-4 bg-white">
            <div class="px-4">
              <h2 class="font-extrabold text-xl pb-4 text-near-green">
                {{ t("contribute.instructions.issues.subTitle") }}
              </h2>
              <ol class="list-decimal font-bold list-inside">
                <li>
                  {{ t("contribute.instructions.issues.stepOne") }}
                  <a
                    href="https://github.com/near-in-minutes/community/issues"
                    class="font-medium underline"
                    target="_blank"
                  >
                    {{ t("contribute.instructions.issues.issues") }}</a
                  >
                  <img
                    class="w-full h-auto my-6"
                    src="@/assets/contribute/issues.png"
                  />
                </li>

                <li>
                  {{ t("contribute.instructions.issues.stepTwo") }}

                  <img
                    class="w-full my-6"
                    src="@/assets/contribute/new-issue.png"
                  />
                </li>
                <li>
                  {{ t("contribute.instructions.issues.stepThree") }}
                  <img
                    class="w-full my-6"
                    src="@/assets/contribute/add-issue.png"
                  />
                </li>
              </ol>
              <div class="rounded-md bg-green-50 p-4">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <InformationCircleIcon
                      class="h-8 w-8 text-near-green"
                      aria-hidden="true"
                    />
                  </div>
                  <div
                    class="ml-3 flex-1 md:flex md:justify-between flex flex-col"
                  >
                    <p class="text-sm text-near-green">
                      {{ t("contribute.instructions.issues.seeExample") }}
                      <a
                        href="https://github.com/near-in-minutes/community/issues/47"
                        class="
                          whitespace-nowrap
                          font-medium
                          text-green-700
                          hover:text-green-600
                        "
                        target="_blank"
                        >{{ t("contribute.instructions.issues.clickHere")
                        }}<span aria-hidden="true">&rarr;</span></a
                      >
                    </p>
                    <br />
                    <p class="text-sm text-near-green">
                      {{ t("contribute.instructions.issues.learnMore") }}
                      <a
                        href="https://github.com/near-in-minutes/community/issues/4"
                        class="
                          whitespace-nowrap
                          font-medium
                          text-green-700
                          hover:text-green-600
                        "
                        target="_blank"
                        >{{ t("contribute.instructions.issues.clickHere")
                        }}<span aria-hidden="true">&rarr;</span></a
                      >
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <p class="mt-10">
                    {{ t("contribute.instructions.issues.types") }}
                  </p>

                  <ul
                    class="list-disc"
                    v-for="item in contribution"
                    :key="item.name"
                  >
                    <li>
                      <span class="font-bold text-near-green">
                        {{ item.name }}</span
                      >
                      {{ item.description }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  </div>

  <ContributionCTA />
</template>

<script>
import { computed, reactive } from "vue";

import { useI18n } from "vue-i18n";
import { ChevronUpIcon, InformationCircleIcon } from "@heroicons/vue/solid";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";

import ContributionCTA from "@/components/ContributionCTA";

export default {
  name: "InstructionsPage",
  components: {
    InformationCircleIcon,
    ContributionCTA,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    ChevronUpIcon,
  },
  setup() {
    const { t } = useI18n({ useScope: "global" });

    const contribution = reactive([
      {
        name: computed(() => t("contribute.newContent")),
        description: computed(() =>
          t("contribute.instructions.issues.newContentDesc")
        ),
      },
      {
        name: computed(() => t("contribute.newTopic")),
        description: computed(() =>
          t("contribute.instructions.issues.newTopicDesc")
        ),
      },
      {
        name: computed(() => t("contribute.translate")),
        description: computed(() =>
          t("contribute.instructions.issues.translateDesc")
        ),
      },
    ]);
    return { t, contribution };
  },
};
</script>
