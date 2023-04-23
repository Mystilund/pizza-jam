import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ENGLISH_TRANSLATIONS from './lang/en.json';
import FRENCH_TRANSLATIONS from './lang/fr.json';

export function initI18n() {
  // if i18n is not initialized, initialize it
  if (i18n.isInitialized) {
    return i18n;
  }
  i18n.use(initReactI18next);

  i18n.init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'fr'],
    ns: ['lang'],
    defaultNS: 'lang',
    resources: {
      en: {
        lang: ENGLISH_TRANSLATIONS,
      },
      fr: {
        lang: FRENCH_TRANSLATIONS,
      },
    },
    returnEmptyString: false,
  });

  // The i18n instance needs to be passed to Storybook to allow locale switching
  return i18n;
}
