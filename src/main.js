import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import tr from "./locales/tr.json";
import "tailwindcss/tailwind.css";

const i18n = createI18n({
  messages: {
    en: en,
    tr: tr,
  },
  locale: "en",
  fallbackLocale: "en",
});

createApp(App).use(router).use(i18n).mount("#app");
