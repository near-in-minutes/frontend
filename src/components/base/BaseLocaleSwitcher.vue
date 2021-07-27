<template>
  <Listbox as="div" v-model="selected">
    <div class="relative w-44">
      <ListboxButton
        class="
          relative
          w-full
          bg-white
          border border-gray-300
          rounded-md
          shadow-sm
          pl-3
          pr-10
          py-2
          text-left
          cursor-default
          focus:outline-none
          focus:ring-1
          focus:ring-indigo-500
          focus:border-indigo-500
          sm:text-sm
        "
      >
        <div class="flex items-center">
          <span
            :aria-label="selected.available ? 'available' : 'unavailable'"
            :class="[
              selected.available ? 'bg-green-400' : 'bg-gray-200',
              'flex-shrink-0 inline-block h-2 w-2 rounded-full',
            ]"
          />
          <span class="ml-3 block truncate">{{ selected.name }}</span>
        </div>
        <span
          class="
            absolute
            inset-y-0
            right-0
            flex
            items-center
            pr-2
            pointer-events-none
          "
        >
          <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="
            absolute
            z-10
            mt-1
            w-full
            bg-white
            shadow-lg
            max-h-60
            rounded-md
            py-1
            text-base
            ring-1 ring-black ring-opacity-5
            overflow-auto
            focus:outline-none
            sm:text-sm
          "
        >
          <ListboxOption
            as="template"
            v-for="(lang, index) in languages"
            :key="index"
            :value="lang"
            v-slot="{ active, selected }"
          >
            <li
              :class="[
                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                'cursor-default select-none relative py-2 pl-3 pr-9',
              ]"
            >
              <div class="flex items-center">
                <span
                  :class="[
                    lang.available ? 'bg-near-green-medium' : 'bg-gray-200',
                    'flex-shrink-0 inline-block h-2 w-2 rounded-full',
                  ]"
                  aria-hidden="true"
                />
                <span
                  :class="[
                    selected ? 'font-semibold' : 'font-normal',
                    'ml-3 block truncate',
                  ]"
                >
                  {{ lang.name }}
                  <span class="sr-only">
                    is {{ lang.available ? "available" : "unavailable" }}</span
                  >
                </span>
              </div>

              <span
                v-if="selected"
                :class="[
                  active ? 'text-white' : 'text-indigo-600',
                  'absolute inset-y-0 right-0 flex items-center pr-4',
                ]"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script>
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";

const languages = [
  { name: "English", code: "en", available: true },
  { name: "Chinese", code: "zh", available: false },
  { name: "Hindi", code: "hi", available: true },
  { name: "Russian", code: "ru", available: false },
  { name: "Spanish", code: "es", available: true },
  { name: "Turkish", code: "tr", available: true },
  { name: "German", code: "de", available: true },
];

export default {
  components: {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
    CheckIcon,
    SelectorIcon,
  },
  setup() {
    const { locale } = useI18n({ useScope: "global" });

    const selected = ref(languages[0]);
    watch(selected, (val) => (locale.value = val.code));

    return {
      languages,
      selected,
    };
  },
};
</script>
