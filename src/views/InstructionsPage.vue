<template>
  <div class="py-20 mx-auto max-w-5xl px-4 bg-white">
    <div class="text-center">
      <h2
        class="
          mt-12
          text-3xl
          tracking-tight
          font-extrabold
          sm:text-4xl
          text-green
        "
      >
        {{ t("contributionInstruction.title") }}
      </h2>
    </div>
    <p class="mt-12">
      {{ t("contributionInstruction.desc") }}
    </p>
    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
      <div class="flex">
        <div class="ml-3">
          <i18n-t
            keypath="contributionInstruction.warning"
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
              {{ t("contributionInstruction.loomLink") }}
            </a>
          </i18n-t>
        </div>
      </div>
    </div>
    <div class="px-4">
      <h2 class="font-extrabold text-xl pb-4 text-green">
        {{ t("contributionInstruction.subTitle") }}
      </h2>
      <ol class="list-decimal">
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
              class="h-8 w-8 text-green"
              aria-hidden="true"
            />
          </div>
          <div class="ml-3 flex-1 md:flex md:justify-between flex flex-col">
            <p class="text-sm text-green">
              {{ t("contributionInstruction.seeExample") }}
              <a
                href="#"
                class="
                  whitespace-nowrap
                  font-medium
                  text-blue-700
                  hover:text-blue-600
                "
                target="_blank"
                >{{ t("contributionInstruction.clickHere")
                }}<span aria-hidden="true">&rarr;</span></a
              >
            </p>
            <br />
            <p class="text-sm text-green">
              {{ t("contributionInstruction.learnMore") }}
              <a
                href="https://github.com/near-in-minutes/community/issues/4"
                class="
                  whitespace-nowrap
                  font-medium
                  text-blue-700
                  hover:text-blue-600
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

          <ul class="list-disc" v-for="item in contribution" :key="item.name">
            <li>
              <span class="font-bold text-green"> {{ item.name }}</span>
              {{ item.description }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <CTASection />
</template>

<script>
import { useI18n } from "vue-i18n";
import { InformationCircleIcon } from "@heroicons/vue/solid";
import CTASection from "@/components/CTASection.vue";
import { computed, reactive } from "vue";

export default {
  name: "InstructionsPage",
  components: {
    InformationCircleIcon,
    CTASection,
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
