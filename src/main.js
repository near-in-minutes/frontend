// import LogRocket from 'logrocket';

// LogRocket.init('near/near-in-minutes');

import { createApp } from 'vue';

import App from './App.vue';
import router from '@/router';

import 'tailwindcss/tailwind.css';

import i18n from '@/i18n';

import VueGtag from 'vue-gtag';

createApp(App)
  .use(router)
  .use(i18n)
  .use(VueGtag, { config: { id: process.env.VUE_APP_GOOGLE_ANALYTICS } })
  .mount('#app');
