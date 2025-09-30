import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

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
  });

i18n.on('languageChanged', lng => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lng;
    document.documentElement.dir = ['ar', 'he'].includes(lng) ? 'rtl' : 'ltr';
  }
});

i18n.on('failedLoading', (lng, ns, msg) => {
  // Silent fail for production
});

i18n.on('loaded', (loaded) => {
  // Translations loaded successfully
});

i18n.on('initialized', (options) => {
  // i18n initialized successfully
});

export default i18n;
