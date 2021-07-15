import { createI18n } from 'vue-i18n';

import ar from './ar.json';
import de from './de.json';
import en from './en.json';
import es from './es.json';
import hi from './hi.json';
import tr from './tr.json';

const messages = {
  ar,
  en,
  es,
  hi,
  tr,
  de
};

const config = {
  legacy: false, // you must set `false`, to use Composition API
  locale: 'en',
  fallbackLocale: 'en',
  pluralRules: {
    ar: collectionSize,
    en: collectionSize,
    es: collectionSize,
    hi: collectionSize,
    tr: collectionSize,
    de: collectionSize
  }
};

export default createI18n({
  messages,
  ...config
});

export function localeToLanguage(locale) {
  return messages[locale].language.en;
}

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
