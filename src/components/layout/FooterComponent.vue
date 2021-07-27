<template>
  <footer class="bg-white mt-12 border-t border-gray pt-8">
    <div class="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
      <nav
        class="-mx-5 -my-2 flex flex-wrap justify-center"
        aria-label="Footer"
      >
        <div
          v-for="item in navigation.main"
          :key="item.name"
          class="px-5 py-2 hover:font-bold"
        >
          <a
            v-if="item.href"
            :href="item.href"
            class="text-base text-gray-500 hover:text-gray-900"
            target="_blank"
          >
            {{ item.name }}
          </a>
          <router-link
            v-else
            :to="item.to"
            class="text-base text-gray-500 hover:text-gray-900"
            >{{ item.name }}</router-link
          >
        </div>
      </nav>

      <p class="mt-8 text-center text-base text-gray-400">
        &copy; {{ t("footer.rights") }}
      </p>
    </div>
  </footer>
</template>

<script>
import { useI18n } from "vue-i18n";
const navigation = {
  main: [
    {
      name: "Contribute",
      to: "/contribute",
    },
    { name: "NEAR Protocol", href: "https://near.org/" },
    { name: "NEAR Token", href: "https://near.org/tokens/" },
  ],
};

export default {
  name: "Footer",
  setup() {
    const { t } = useI18n({ useScope: "global" });

    return { t, navigation };
  },
};
</script>
