<template>
  <Disclosure as="nav" v-slot="{ open }">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-28">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <router-link to="/">
              <img class="w-28" src="@/assets/logo.png" alt="logo" />
            </router-link>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8 mt-8">
            <router-link
              v-for="item in nav"
              :key="item.name"
              :to="item.href"
              :class="[
                item.current
                  ? 'bg-near-gray '
                  : 'text-gray-600 hover:bg-near-gray hover:text-black',
                'rounded-md my-4 px-3 inline-flex items-center font-medium h-10',
              ]"
              :aria-current="item.current ? 'page' : undefined"
            >
              {{ item.label }}
            </router-link>
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center mt-4">
          <BaseLocaleSwitcher />
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
              hover:text-gray-500 hover:bg-gray-100
              focus:outline-none
              focus:ring-2
              focus:ring-inset
              focus:ring-indigo-500
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
      <div class="pt-2 pb-3 space-y-1">
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
          >{{ item.label }}</router-link
        >
      </div>
      <div class="pt-2 pb-3 px-2">
        <BaseLocaleSwitcher />
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script>
import { useI18n } from "vue-i18n";
import { ref, computed, watch, reactive } from "vue";
import { useRoute } from "vue-router";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { MenuIcon, XIcon } from "@heroicons/vue/outline";
import BaseLocaleSwitcher from "@/components/base/BaseLocaleSwitcher.vue";

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    MenuIcon,
    XIcon,
    BaseLocaleSwitcher,
  },
  name: "Navbar",
  setup() {
    const open = ref(false);
    const { t } = useI18n({ useScope: "global" });

    const navigation = [
      {
        name: "Videos",
        label: computed(() => t("navbar.videos")),
        href: "/videos",
        current: false,
      },
      {
        name: "Collections",
        label: computed(() => t("navbar.collections")),
        href: "/collections",
        current: false,
      },
      {
        name: "Authors",
        label: computed(() => t("navbar.authors")),
        href: "/authors",
        current: false,
      },
      {
        name: "Contribute",
        label: computed(() => t("navbar.contribute")),
        href: "/contribute",
        current: false,
      },
      {
        name: "About",
        label: computed(() => t("navbar.about")),
        href: "/about",
        current: false,
      },
    ];

    const route = useRoute();
    const name = computed(() => route.name);
    const nav = reactive(navigation);

    //this method watchs the router link's current page to add the hover affect
    watch(name, (newValue) => {
      for (let i = 0; i < nav.length; i++) {
        const route = nav[i];
        route.current = false;
        if (route.name === newValue) {
          route.current = true;
        }
      }
    });

    return { open, nav };
  },
};
</script>
