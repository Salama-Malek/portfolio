import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

export default function ThemeSwitcher() {
  const { t } = useTranslation();
  const [theme, toggleTheme] = useTheme();

  return (
    <button
      type="button"
      className="theme-switcher"
      onClick={toggleTheme}
      aria-label={t('themeSwitcher.toggle')}
      title={t('themeSwitcher.toggle')}
    >
      {theme === 'light' ? (
        <Icon icon="ph:moon-bold" />
      ) : (
        <Icon icon="ph:sun-bold" />
      )}
    </button>
  );
}
