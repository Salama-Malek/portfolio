import React from 'react';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

export default function ThemeSwitcher() {
  const { t } = useTranslation();

  return (
    <span
      className="theme-switcher theme-switcher--static"
      role="img"
      aria-label={t('themeSwitcher.darkModeLabel')}
      title={t('themeSwitcher.darkModeLabel')}
    >
      <Icon icon="ph:moon-bold" />
    </span>
  );
}
