import { useEffect, useState } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const applyDarkMode = () => {
      document.documentElement.setAttribute('data-theme', 'dark');
      window.localStorage.setItem('theme', 'dark');
      setTheme('dark');
    };

    applyDarkMode();
  }, []);

  const toggleTheme = () => {
    // Light mode has been removed intentionally. This noop maintains backward compatibility.
  };

  return [theme, toggleTheme];
};
