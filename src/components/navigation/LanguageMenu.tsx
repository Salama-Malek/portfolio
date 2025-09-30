import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'en', labelKey: 'i18n.languages.en' },
  { code: 'ar', labelKey: 'i18n.languages.ar' },
  { code: 'ru', labelKey: 'i18n.languages.ru' },
  { code: 'fr', labelKey: 'i18n.languages.fr' },
  { code: 'de', labelKey: 'i18n.languages.de' },
];

const LanguageMenu: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', clickHandler);
    return () => document.removeEventListener('mousedown', clickHandler);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    const current = i18n.language;
    document.documentElement.dir = current === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  const toggleMenu = () => setOpen((value) => !value);

  const onSelect = (code: string) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <div className="language-menu" ref={menuRef}>
      <button
        type="button"
        className="language-menu__button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('nav.language')}
        onClick={toggleMenu}
      >
        <span>{i18n.language.toUpperCase()}</span>
        <span aria-hidden="true">▾</span>
      </button>
      {open && (
        <div className="language-menu__panel" role="listbox">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              className="language-menu__option"
              onClick={() => onSelect(lang.code)}
              aria-current={lang.code === i18n.language}
            >
              {t(lang.labelKey)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageMenu;
