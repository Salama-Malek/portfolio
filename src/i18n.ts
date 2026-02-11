import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

type SupportedLanguage = "en" | "ar" | "ru" | "de" | "fr";

const RTL_LANGUAGES: SupportedLanguage[] = ["ar"];

const LANGUAGE_FONT_GROUPS: Record<SupportedLanguage, string> = {
  ar: "arabic",
  de: "latin",
  en: "latin",
  fr: "latin",
  ru: "cyrillic",
};

const DEFAULT_FONT_GROUP = "latin";

const applyDocumentLanguageSettings = (lng: string = "en"): void => {
  if (typeof document === "undefined") {
    return;
  }

  const fontGroup =
    LANGUAGE_FONT_GROUPS[lng as SupportedLanguage] || DEFAULT_FONT_GROUP;
  const isRTL = RTL_LANGUAGES.includes(lng as SupportedLanguage);

  document.documentElement.lang = lng;
  document.documentElement.dir = isRTL ? "rtl" : "ltr";
  document.documentElement.setAttribute("data-locale", lng);
  document.documentElement.setAttribute("data-locale-group", fontGroup);
};

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(
    {
      fallbackLng: "en",
      supportedLngs: ["en", "ar", "ru", "de", "fr"],
      debug: false,
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ["localStorage", "htmlTag", "navigator"],
        caches: ["localStorage"],
        lookupLocalStorage: "i18nextLng",
      },
      backend: {
        loadPath: "/locales/{{lng}}/translation.json",
        allowMultiLoading: false,
        crossDomain: false,
        withCredentials: false,
        requestOptions: {
          mode: "cors" as const,
          credentials: "same-origin" as const,
          cache: "default" as const,
        },
      },
      react: {
        useSuspense: true,
      },
    },
    () => {
      const initialLanguage =
        i18n.resolvedLanguage ||
        i18n.language ||
        (Array.isArray(i18n.options?.fallbackLng)
          ? i18n.options.fallbackLng[0]
          : i18n.options?.fallbackLng) ||
        "en";

      applyDocumentLanguageSettings(initialLanguage);
    },
  );

i18n.on("languageChanged", (lng: string) => {
  applyDocumentLanguageSettings(lng);
});

i18n.on("failedLoading", (lng: string, ns: string, msg: string) => {
  // Silent fail for production
});

i18n.on("loaded", () => {
  // Translations loaded successfully
});

i18n.on("initialized", () => {
  applyDocumentLanguageSettings(
    i18n.resolvedLanguage ||
      i18n.language ||
      (Array.isArray(i18n.options?.fallbackLng)
        ? i18n.options.fallbackLng[0]
        : i18n.options?.fallbackLng) ||
      "en",
  );
});

export default i18n;
