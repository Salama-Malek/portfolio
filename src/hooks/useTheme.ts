import { useEffect } from "react";

export const useTheme = (): [string] => {
  const theme = "dark";

  useEffect(() => {
    // Apply dark theme on mount
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  return [theme];
};
