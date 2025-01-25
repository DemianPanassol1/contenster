import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import config from '../config/settings.json';

import commonEn from '../i18n/en/common.json';
import commonPt from '../i18n/pt/common.json';
import commonEs from '../i18n/es/common.json';

export const defaultNS = 'common';

export const resources = {
  en: { common: commonEn },
  pt: { common: commonPt },
  es: { common: commonEs },
} as const;

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    debug: true,
    ns: ['common'],
    defaultNS: 'common',
    fallbackLng: config.DEFAULT_LANGUAGE,
  });

export default i18next;
