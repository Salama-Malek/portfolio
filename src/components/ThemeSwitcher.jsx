import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { Icon } from '@iconify/react';

export default function ThemeSwitcher() {
  const [theme, toggleTheme] = useTheme();

  return (
    <button
      className="theme-switcher"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Icon icon="ph:moon-bold" />
      ) : (
        <Icon icon="ph:sun-bold" />
      )}
    </button>
  );
}
