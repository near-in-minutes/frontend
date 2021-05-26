<template>
  <Disclosure as="nav" class="bg-white shadow" v-slot="{ open }">
    <div class="max-w-full mx-auto mb-4 px-10 sm:px-12">
      <div class="flex justify-between h-28 items-center">
        <div class="flex-shrink-0 flex items-center">
          <img class="w-28" src="@/assets/logo.png" alt="logo" />
          <div class="hidden lg:py-2 lg:flex lg:space-x-8 ml-20 items-center">
            <a
              v-for="item in navigation"
              :key="item.name"
              :href="item.href"
              :class="[
                item.current
                  ? 'bg-gray '
                  : 'text-black hover:bg-gray hover:text-black',
                'rounded-md py-3 px-3 inline-flex items-center text-lg font-medium h-15',
              ]"
              :aria-current="item.current ? 'page' : undefined"
            >
              {{ item.name }}
            </a>
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <Menu as="div" class="relative inline-block text-left">
            <MenuButton
              class="
                inline-flex
                justify-center
                w-full
                rounded-md
                border border-gray-dark
                shadow-sm
                px-4
                py-2
                bg-white
                text-sm
                font-medium
                text-black
                hover:bg-gray
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-offset-gray
                focus:ring-green
              "
            >
              <TranslateIcon class="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
              <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
            </MenuButton>

            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="
                  origin-top-right
                  absolute
                  right-0
                  mt-2
                  w-48
                  rounded-md
                  shadow-lg
                  py-1
                  bg-white
                  ring-1 ring-green ring-opacity-5
                  focus:outline-none
                "
              >
                <div class="py-1">
                  <MenuItem v-for="language in languges" :key="language.index">
                    <button
                      class="block px-4 py-2 w-full text-md hover:bg-gray"
                      @click="changeLanguge(language.code)"
                    >
                      {{ language.name }}
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
        <div class="-mr-2 flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="
              inline-flex
              items-center
              justify-center
              p-2
              rounded-md
              text-gray-400
              hover:text-gray-500
              hover:bg-gray-100
              focus:outline-none
              focus:ring-2 focus:ring-inset focus:ring-indigo-500
            "
          >
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="pt-2 pb-3 px-2 space-y-1">
        <a
          v-for="item in navigation"
          :key="item.name"
          :href="item.href"
          :class="[
            item.current
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900',
            'block rounded-md py-2 px-3 text-base font-medium',
          ]"
          :aria-current="item.current ? 'page' : undefined"
          >{{ item.name }}</a
        >
        <div class="pt-4 pb-3 border-t border-gray">
          <button
            v-for="language in languges"
            :key="language.index"
            class="block px-4 py-2 text-sm hover:bg-gray"
            @click="changeLanguge(language.code)"
          >
            {{ language.name }}
          </button>
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script>
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import {
  MenuIcon,
  XIcon,
  ChevronDownIcon,
  TranslateIcon,
} from "@heroicons/vue/outline";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Videos", href: "videos", current: false },
  { name: "Glossary", href: "#", current: false },
  { name: "Updates", href: "#", current: false },
];

const languges = [
  { name: "English", code: "en" },
  { name: "Turkish", code: "tr" },
];

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    MenuIcon,
    XIcon,
    ChevronDownIcon,
    TranslateIcon,
  },
  name: "Navbar",
  setup() {
    const open = ref(false);
    const { locale } = useI18n();
    const changeLanguge = (lng) => {
      locale.value = lng;
    };

    return { languges, changeLanguge, open, navigation };
  },
};
</script>
