import React, { createContext, useContext } from 'react';
import { useTheme } from './hooks/useTheme';

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, toggleTheme] = useTheme();
  React.useEffect(() => {
    function onKeyDown(e) {
      if (e.key.toLowerCase() === 't' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        toggleTheme();
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [toggleTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
