import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "flag-icons/css/flag-icons.min.css";

interface Language {
  code: string;
  flag: string;
}

const languages: Language[] = [
  { code: "en", flag: "us" },
  { code: "ar", flag: "eg" },
  { code: "ru", flag: "ru" },
  { code: "de", flag: "de" },
  { code: "fr", flag: "fr" },
];

export default function LanguageSwitcher(): JSX.Element {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const normalizedLanguage = (i18n.language || "en").split("-")[0];
  const currentLanguage =
    languages.find((lang) => lang.code === normalizedLanguage) || languages[0];

  const changeLanguage = (languageCode: string): void => {
    if (languageCode !== normalizedLanguage) {
      i18n.changeLanguage(languageCode);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="language-switcher-container" ref={dropdownRef}>
      <button
        type="button"
        className="language-switcher-btn"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={t("languageSwitcher.selectLanguage")}
        title={t("languageSwitcher.selectLanguage")}
      >
        <span
          className={`fi fi-${currentLanguage.flag}`}
          aria-hidden="true"
        ></span>
        <span className="language-code">
          {currentLanguage.code.toUpperCase()}
        </span>
        <span className={`arrow ${isOpen ? "open" : ""}`} aria-hidden="true">
          {isOpen ? "^" : "v"}
        </span>
      </button>

      {isOpen && (
        <div
          className="language-dropdown"
          role="listbox"
          aria-label={t("languageSwitcher.selectLanguage")}
        >
          {languages.map((lang) => {
            const isActive = normalizedLanguage === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                className={`language-option ${isActive ? "active" : ""}`}
                onClick={() => changeLanguage(lang.code)}
                role="option"
                aria-selected={isActive}
                title={t("languageSwitcher.languageNames." + lang.code)}
              >
                <span
                  className={`fi fi-${lang.flag}`}
                  aria-hidden="true"
                ></span>
                <span className="language-name">
                  {t(`languageSwitcher.languageNames.${lang.code}`)}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
