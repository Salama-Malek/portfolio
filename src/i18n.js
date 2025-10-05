import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur'];

const LANGUAGE_FONT_GROUPS = {
  ar: 'arabic',
  de: 'latin',
  en: 'latin',
  fr: 'latin',
  ru: 'cyrillic'
};

const DEFAULT_FONT_GROUP = 'latin';

const applyDocumentLanguageSettings = (lng = 'en') => {
  if (typeof document === 'undefined') {
    return;
  }

  const fontGroup = LANGUAGE_FONT_GROUPS[lng] || DEFAULT_FONT_GROUP;
  const isRTL = RTL_LANGUAGES.includes(lng);

  document.documentElement.lang = lng;
  document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  document.documentElement.setAttribute('data-locale', lng);
  document.documentElement.setAttribute('data-locale-group', fontGroup);
};

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'ar', 'ru', 'de', 'fr'],
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'htmlTag', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    // lng: 'en', // Force initial language to English
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
      allowMultiLoading: false,
      crossDomain: false,
      withCredentials: false,
      requestOptions: {
        mode: 'cors',
        credentials: 'same-origin',
        cache: 'default'
      }
    },
    react: {
      useSuspense: false
    }
  }, () => {
    const initialLanguage =
      i18n.resolvedLanguage ||
      i18n.language ||
      (Array.isArray(i18n.options?.fallbackLng)
        ? i18n.options.fallbackLng[0]
        : i18n.options?.fallbackLng) ||
      'en';

    applyDocumentLanguageSettings(initialLanguage);
  });

i18n.on('languageChanged', lng => {
  applyDocumentLanguageSettings(lng);
});

i18n.on('failedLoading', (lng, ns, msg) => {
  // Silent fail for production
});

i18n.on('loaded', (loaded) => {
  // Translations loaded successfully
});

i18n.on('initialized', (options) => {
  applyDocumentLanguageSettings(
    i18n.resolvedLanguage ||
      i18n.language ||
      (Array.isArray(i18n.options?.fallbackLng)
        ? i18n.options.fallbackLng[0]
        : i18n.options?.fallbackLng) ||
      'en'
  );
});

export default i18n;
