import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import config from '../config/settings.json';

import commonEn from '../i18n/en/common.json';
import commonPt from '../i18n/pt/common.json';
import commonEs from '../i18n/es/common.json';

import validationsPt from '../i18n/pt/validations.json';
import validationsEn from '../i18n/en/validations.json';
import validationsEs from '../i18n/es/validations.json';

export const defaultNS = 'common';

export const resources = {
  en: { common: commonEn, validations: validationsEn },
  pt: { common: commonPt, validations: validationsPt },
  es: { common: commonEs, validations: validationsEs },
} as const;

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    debug: true,
    ns: ['common', 'validations'],
    defaultNS: 'common',
    fallbackLng: config.DEFAULT_LANGUAGE,
  });

export default i18next;
