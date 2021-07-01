<template>
  <Disclosure as="nav" class="bg-white shadow" v-slot="{ open }">
    <div class="max-w-7xl mx-auto mb-4 px-10">
      <div class="flex justify-between h-28 items-center">
        <div class="flex-shrink-0 flex items-center">
          <a href="/">
            <img class="w-28" src="@/assets/logo.png" alt="logo" />
          </a>
          <div class="hidden lg:py-2 lg:flex lg:space-x-8 ml-20 items-center">
            <router-link
              v-for="item in nav"
              :key="item.name"
              :to="item.href"
              :class="[
                item.current
                  ? 'bg-near-gray '
                  : 'text-black hover:bg-near-gray hover:text-black',
                'rounded-md py-3 px-3 inline-flex items-center text-lg font-medium h-15',
              ]"
              :aria-current="item.current ? 'page' : undefined"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>

        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <button
            v-if="!accountId"
            @click="signIn"
            class="
              mx-8
              w-30
              inline-flex
              items-center
              justify-center
              px-5
              py-2
              font-medium
              rounded-md
              text-white
              bg-near-green
              hover:bg-green-600
              hover:text-white
              transform
              hover:scale-105
              sm:w-auto
            "
          >
            Sign in to NEAR
          </button>
          <div v-else class="flex items-center">
            <h1>{{ accountId }}</h1>
            <button
              @click="signOut"
              class="
                mr-8
                ml-2
                w-30
                inline-flex
                items-center
                justify-center
                px-5
                py-2
                font-medium
                rounded-md
                bg-near-gray
                hover:bg-green-600
                hover:text-white
                transform
                hover:scale-105
                sm:w-auto
              "
            >
              Log out
            </button>
          </div>
          <Menu as="div" class="relative inline-block text-left">
            <MenuButton
              class="
                inline-flex
                justify-center
                w-full
                rounded-md
                border border-gray-400
                shadow-sm
                px-4
                py-2
                bg-white
                text-sm
                font-medium
                text-black
                hover:bg-near-gray
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-offset-near-gray
                focus:ring-green-200
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
                  ring-1 ring-green-200 ring-opacity-5
                  z-10
                  focus:outline-none
                "
              >
                <div class="py-1">
                  <MenuItem v-for="language in languages" :key="language.index">
                    <button
                      class="block px-4 py-2 w-full text-md hover:bg-near-gray"
                      @click="changeLanguage(language.code)"
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
        <router-link
          v-for="item in nav"
          :key="item.name"
          :to="item.href"
          :class="[
            item.current
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900',
            'block rounded-md py-2 px-3 text-base font-medium',
          ]"
          :aria-current="item.current ? 'page' : undefined"
          >{{ item.name }}</router-link
        >
        <div class="pt-4 pb-3 px-2 space-y-1 border-t border-gray-100">
          <button
            v-if="!accountId"
            @click="signIn"
            class="
              w-30
              px-5
              py-2
              font-medium
              rounded-md
              text-white
              bg-near-green
              hover:bg-green-600
              hover:text-white
              transform
              hover:scale-105
              sm:w-auto
            "
          >
            Sign in to NEAR
          </button>
          <div v-else class="flex flex-col items-start">
            <h1>{{ accountId }}</h1>
            <button
              @click="signOut"
              class="
                mt-4
                block
                px-4
                py-2
                text-sm
                font-medium
                rounded-md
                bg-near-gray
                hover:bg-green-600
                hover:text-white
                transform
                hover:scale-105
                sm:w-auto
              "
            >
              Log out
            </button>
          </div>
        </div>
        <div class="pt-4 pb-3 border-t border-gray-100">
          <button
            v-for="language in languages"
            :key="language.index"
            class="block px-4 py-2 text-sm hover:bg-near-gray"
            @click="changeLanguage(language.code)"
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
import { ref, computed, watch, reactive } from "vue";
import { useRoute } from "vue-router";

import { useNearAuth, useWallet } from "@/composables/near";

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

const languages = [
  { name: "English", code: "en" },
  { name: "Turkish", code: "tr" },
  { name: "Hindi", code: "hi" },
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
    const { locale, t } = useI18n();
    const changeLanguage = (lng) => {
      locale.value = lng;
    };

    const navigation = [
      {
        name: computed(() => t("navbar.home")),
        href: "/",
        current: true,
      },
      {
        name: computed(() => t("navbar.videos")),
        href: "/videos",
        current: false,
      },
    ];

    const route = useRoute();
    const name = computed(() => route.name);
    const nav = reactive(navigation);

    //this method watchs the router link's current page to add the hover affect
    watch(name, (newValue, _) => {
      for (let i = 0; i < nav.length; i++) {
        const route = nav[i];
        route.current = false;
        if (route.name === newValue) {
          route.current = true;
        }
      }
    });

    const { wallet, signIn, signOut } = useWallet();
    const { accountId } = useNearAuth();

    return {
      languages,
      changeLanguage,
      open,
      nav,
      wallet,
      accountId,
      signIn,
      signOut,
    };
  },
};
</script>
