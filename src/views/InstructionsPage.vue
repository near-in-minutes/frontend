<template>
  <div class="pt-20 pb-3 mx-auto max-w-5xl px-4 bg-white">
    <div class="text-center">
      <h2
        class="
          mt-12
          text-3xl
          tracking-tight
          font-extrabold
          sm:text-4xl
          text-near-green
        "
      >
        {{ t("howToContribute.title") }}
      </h2>
    </div>
    <p class="mt-12">
      {{ t("howToContribute.desc") }}
    </p>
    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
      <div class="flex">
        <div class="ml-3">
          <i18n-t
            keypath="howToContribute.warning"
            tag="li"
            class="text-sm text-yellow-700"
          >
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
              {{ t("howToContribute.loomLink") }}
            </a>
          </i18n-t>
        </div>
      </div>
    </div>
  </div>
  <div class="w-full px-4 pt-2">
    <div class="w-full max-w-5xl p-2 pb-10 mx-auto bg-white rounded-2xl">
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
          <span>{{ t("setupSystemInstruction.title") }}</span>
          <ChevronUpIcon
            :class="open ? 'transform rotate-0' : 'transform rotate-180'"
            class="w-5 h-5 text-green-500"
          />
        </DisclosureButton>
        <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
          <div class="py-20 mx-auto max-w-5xl px-4 bg-white">
            <div class="px-4">
              <h2 class="font-extrabold text-xl pb-4 text-near-green">
                {{ t("setupSystemInstruction.title") }}
              </h2>
              <ol class="list-decimal font-bold">
                <li>
                  {{ t("setupSystemInstruction.stepOne") }}
                  <img
                    class="w-full h-auto my-6"
                    src="@/assets/contribute/setup-divided-screen.png"
                    alt="Workflow"
                  />
                </li>

                <li>
                  {{ t("setupSystemInstruction.stepTwo") }}

                  <img
                    class="w-50 my-6 mx-auto"
                    src="@/assets/contribute/setup-system-info.png"
                    alt="Workflow"
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
          <span>{{ t("makeVideoInstruction.title") }}</span>
          <ChevronUpIcon
            :class="open ? 'transform rotate-0' : 'transform rotate-180'"
            class="w-5 h-5 text-green-500"
          />
        </DisclosureButton>
        <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
          <div class="py-20 mx-auto max-w-5xl px-4 bg-white">
            <div class="px-4">
              <h2 class="font-extrabold text-xl pb-4 text-near-green">
                {{ t("makeVideoInstruction.title") }}
              </h2>
              <ol class="list-decimal font-bold">
                <li>
                  {{ t("makeVideoInstruction.stepOne") }}
                  <a
                    href="https://www.loom.com/"
                    class="font-medium underline"
                    target="_blank"
                  >
                    {{ t("makeVideoInstruction.loom") }}</a
                  >
                  <img
                    class="w-full h-auto my-6"
                    src="@/assets/contribute/loom-website.png"
                    alt="Workflow"
                  />
                </li>

                <li>
                  {{ t("makeVideoInstruction.stepTwo") }}

                  <img
                    class="w-50 my-6 mx-auto"
                    src="@/assets/contribute/loom-sign-up.png"
                    alt="Workflow"
                  />
                </li>
                <li>
                  {{ t("makeVideoInstruction.stepThree") }}
                  <img
                    class="w-50 my-6 mx-auto"
                    src="@/assets/contribute/loom-download.png"
                    alt="Workflow"
                  />
                </li>
                <li>
                  {{ t("makeVideoInstruction.stepFour") }}
                  <img
                    class="w-50 my-6 mx-auto"
                    src="@/assets/contribute/loom-app.png"
                    alt="Workflow"
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
          <span>{{ t("contributionInstruction.subTitle") }}</span>
          <ChevronUpIcon
            :class="open ? 'transform rotate-0' : 'transform rotate-180'"
            class="w-5 h-5 text-green-500"
          />
        </DisclosureButton>
        <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
          <div class="py-20 mx-auto max-w-5xl px-4 bg-white">
            <div class="px-4">
              <h2 class="font-extrabold text-xl pb-4 text-near-green">
                {{ t("contributionInstruction.subTitle") }}
              </h2>
              <ol class="list-decimal font-bold">
                <li>
                  {{ t("contributionInstruction.stepOne") }}
                  <a
                    href="https://github.com/near-in-minutes/community/issues"
                    class="font-medium underline"
                    target="_blank"
                  >
                    {{ t("contributionInstruction.issues") }}</a
                  >
                  <img
                    class="w-full h-auto my-6"
                    src="@/assets/contribution-issues.png"
                    alt="Workflow"
                  />
                </li>

                <li>
                  {{ t("contributionInstruction.stepTwo") }}

                  <img
                    class="w-full my-6"
                    src="@/assets/contribution-new-issue.png"
                    alt="Workflow"
                  />
                </li>
                <li>
                  {{ t("contributionInstruction.stepThree") }}
                  <img
                    class="w-full my-6"
                    src="@/assets/contribution-add-issue.png"
                    alt="Workflow"
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
                      {{ t("contributionInstruction.seeExample") }}
                      <a
                        href="#"
                        class="
                          whitespace-nowrap
                          font-medium
                          text-green-700
                          hover:text-green-600
                        "
                        target="_blank"
                        >{{ t("contributionInstruction.clickHere")
                        }}<span aria-hidden="true">&rarr;</span></a
                      >
                    </p>
                    <br />
                    <p class="text-sm text-near-green">
                      {{ t("contributionInstruction.learnMore") }}
                      <a
                        href="https://github.com/near-in-minutes/community/issues/4"
                        class="
                          whitespace-nowrap
                          font-medium
                          text-green-700
                          hover:text-green-600
                        "
                        target="_blank"
                        >{{ t("contributionInstruction.clickHere")
                        }}<span aria-hidden="true">&rarr;</span></a
                      >
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <p class="mt-10">{{ t("contributionInstruction.types") }}</p>

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

  <CTASection />
</template>

<script>
import { useI18n } from "vue-i18n";
import { InformationCircleIcon } from "@heroicons/vue/solid";
import CTASection from "@/components/CTASection.vue";
import { computed, reactive } from "vue";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronUpIcon } from "@heroicons/vue/solid";

export default {
  name: "InstructionsPage",
  components: {
    InformationCircleIcon,
    CTASection,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    ChevronUpIcon,
  },
  setup() {
    const { t } = useI18n();

    const contribution = reactive([
      {
        name: computed(() => t("cta.newContent")),
        description: computed(() =>
          t("contributionInstruction.newContentDesc")
        ),
      },
      {
        name: computed(() => t("cta.newTopic")),
        description: computed(() => t("contributionInstruction.newTopicDesc")),
      },
      {
        name: computed(() => t("cta.translate")),
        description: computed(() => t("contributionInstruction.translateDesc")),
      },
    ]);
    return { t, contribution };
  },
};
</script>
