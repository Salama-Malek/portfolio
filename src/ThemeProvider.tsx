import React, { createContext, useContext, ReactNode } from "react";
import { useTheme } from "./hooks/useTheme";

interface ThemeContextType {
  theme: string;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme] = useTheme();

  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};
