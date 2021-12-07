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
          <div class="hidden lg:ml-6 lg:flex lg:space-x-6 mt-8">
            <Popover class="relative" v-slot="{ open }">
              <PopoverButton :class="[open ? 'text-gray-900' : 'text-gray-600 hover:bg-near-gray hover:text-black', nav1[0].current | nav1[1].current ? 'bg-near-gray ' : 'text-gray-600 hover:bg-near-gray hover:text-black', 'rounded-md my-4 px-3 inline-flex items-center font-medium h-10']">
                <router-link :to="nav[0].href">
                  {{ nav[0].label }}
                </router-link>
                <ChevronDownIcon :class="[open ? 'text-gray-600' : 'text-gray-400', 'ml-2 h-5 w-5 group-hover:text-gray-500']" aria-hidden="true" />
              </PopoverButton>

              <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
                <PopoverPanel class="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-xs sm:px-0">
                  <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                      <a v-for="item in nav1" :key="item.name" :href="item.href" :class="[item.current ? 'bg-near-gray ' : 'text-gray-600 hover:bg-near-gray hover:text-black', '-m-3 p-3 block rounded-md hover:bg-gray-50']">
                        <p class="text-base font-medium text-gray-900">
                          {{ item.label }}
                        </p>
                        <p class="mt-1 text-sm text-gray-500">
                          {{ item.description }}
                        </p>
                      </a>
                    </div>
                  </div>
                </PopoverPanel>
              </transition>
            </Popover>

            <Popover class="relative" v-slot="{ open }">
              <PopoverButton :class="[open ? 'text-gray-900' : 'text-gray-600 hover:bg-near-gray hover:text-black', nav2[0].current | nav2[1].current ? 'bg-near-gray ' : 'text-gray-600 hover:bg-near-gray hover:text-black', 'rounded-md my-4 px-3 inline-flex items-center font-medium h-10']">
                <router-link :to="nav[1].href">
                  {{ nav[1].label }}
                </router-link>
                <ChevronDownIcon :class="[open ? 'text-gray-600' : 'text-gray-400', 'ml-2 h-5 w-5 group-hover:text-gray-500']" aria-hidden="true" />
              </PopoverButton>

              <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
                <PopoverPanel class="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-xs sm:px-0">
                  <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                      <a v-for="item in nav2" :key="item.name" :href="item.href" :class="[item.current ? 'bg-near-gray ' : 'text-gray-600 hover:bg-near-gray hover:text-black', '-m-3 p-3 block rounded-md hover:bg-gray-50']">
                        <p class="text-base font-medium text-gray-900">
                          {{ item.label }}
                        </p>
                        <p class="mt-1 text-sm text-gray-500">
                          {{ item.description }}
                        </p>
                      </a>
                    </div>
                  </div>
                </PopoverPanel>
              </transition>
            </Popover>

            <router-link :to="nav[2].href" :class="[nav[2].current ? 'bg-near-gray ' : 'text-gray-600 hover:bg-near-gray hover:text-black', 'rounded-md my-4 px-3 inline-flex items-center font-medium h-10']">
              {{ nav[2].label }}
            </router-link>
          </div>
        </div>
        <div class="hidden lg:ml-6 lg:flex lg:items-center mt-4">
          <NearLogin />
          <BaseLocaleSwitcher />
        </div>
        <div class="-mr-2 flex items-center lg:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <DisclosurePanel class="lg:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <router-link v-for="item in nav" :key="item.name" :to="item.href" :class="[item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900', 'block rounded-md py-2 px-3 text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.label }}</router-link>
      </div>
      <div class="pt-2 pb-3 px-2">
        <NearLogin />
        <BaseLocaleSwitcher />
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { ref, computed, watch, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { MenuIcon, XIcon } from '@heroicons/vue/outline';
import BaseLocaleSwitcher from '@/components/base/BaseLocaleSwitcher.vue';
import NearLogin from '@/components/NearLogin.vue';
import { ChevronDownIcon } from '@heroicons/vue/solid';

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    MenuIcon,
    XIcon,
    BaseLocaleSwitcher,
    NearLogin,
    Popover,
    PopoverButton,
    PopoverPanel,
    ChevronDownIcon
  },
  name: 'Navbar',
  setup() {
    const open = ref(false);
    const { t } = useI18n({ useScope: 'global' });

    const navigation = [
      {
        name: 'videos',
        label: computed(() => t('navbar.videos')),
        href: '/videos',
        current: false
      },
      // {
      //   name: 'collections',
      //   label: computed(() => t('navbar.collections')),
      //   href: '/collections',
      //   current: false
      // },
      // {
      //   name: 'authors',
      //   label: computed(() => t('navbar.authors')),
      //   href: '/authors',
      //   current: false
      // },

      {
        name: 'about',
        label: computed(() => t('navbar.about')),
        href: '/about',
        current: false
      },
      {
        name: 'NimDAO',
        label: 'NimDAO',
        href: '/nim-dao',
        current: false
      }
      // ,
      //  {
      //   name: 'contribute',
      //   label: computed(() => t('navbar.contribute')),
      //   href: '/contribute',
      //   current: false
      // },
    ];

    const videos = [
      {
        name: 'videos',
        label: computed(() => t('navbar.videos')),
        description: computed(() => t('videos.subtitle')),
        href: '/videos',
        current: false
      },
      {
        name: 'collections',
        label: computed(() => t('navbar.collections')),
        description: computed(() => t('collections.subtitle')),
        href: '/collections',
        current: false
      },
      {
        name: 'guide',
        label: 'Guide',
        description: 'Learn how to create a video and submit to NiM.',
        href: '/contribute',
        current: false
      }
    ];

    const about = [
      {
        name: 'about',
        label: computed(() => t('navbar.about')),
        description: computed(() => t('about.desc')),
        href: '/about',
        current: false
      },
      {
        name: 'authors',
        label: computed(() => t('navbar.authors')),
        description: computed(() => t('authors.subtitle')),
        href: '/authors',
        current: false
      }
    ];

    const route = useRoute();
    const name = computed(() => route.name);
    const nav = reactive(navigation);
    const nav1 = reactive(videos);
    const nav2 = reactive(about);

    //this method watchs the router link's current page to add the hover affect
    watch(name, newValue => {
      for (let i = 0; i < nav.length; i++) {
        const route = nav[i];
        route.current = false;
        if (route.name === newValue) {
          route.current = true;
        }
      }
    });

    watch(name, newValue => {
      for (let i = 0; i < nav1.length; i++) {
        const route = nav1[i];
        route.current = false;
        if (route.name === newValue) {
          route.current = true;
        }
      }
    });

    return { open, nav, nav1, nav2 };
  }
};
</script>
