import { createI18n } from 'vue-i18n';

import en from './en.json';
import hi from './hi.json';
import tr from './tr.json';

const messages = {
  en,
  hi,
  tr
};

const config = {
  legacy: false, // you must set `false`, to use Composition API
  locale: 'en',
  fallbackLocale: 'en',
  pluralRules: {
    en: collectionSize,
    hi: collectionSize,
    tr: collectionSize
  }
};

export default createI18n({
  messages,
  ...config
});

function collectionSize(size, choices) {
  // "FAST | DIET | SNACK | PICNIC | FEAST",
  if (choices === 5) {
    if (size === 0) return 0;
    if (size === 1) return 1;
    if (size <= 3) return 2;
    if (size <= 10) return 3;
    return 4;
  } else {
    if (size === 0) return 0;
    if (size === 1) return 1;
    return 2;
  }
}
