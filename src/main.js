import LogRocket from 'logrocket';

LogRocket.init('near/near-in-minutes');

import { createApp } from 'vue';

import App from './App.vue';
import router from '@/router';

import 'tailwindcss/tailwind.css';

import i18n from '@/i18n';

import VueAnalytics from 'vue3-analytics';

createApp(App).use(router).use(i18n).use(VueAnalytics, { id: 'UA-179825760-1', disabled: false }).mount('#app');
