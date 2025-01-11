import React, { createContext, ReactNode, useEffect, useState } from "react";

interface ThemeProp {
  primary: string;
  secondary: string;
  dark: string;
}

interface ThemeContextType {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const defaultThemeContext: ThemeContextType = {
  theme: "blue",
  setTheme: () => {},
};

export const availableThemes: Record<string, ThemeProp> = {
  blue: {
    primary: "rgb(0, 112, 186)",
    secondary: "rgb(3, 83, 164)",
    dark: "rgb(6, 26, 64)",
  },
  red: {
    primary: "rgb(189, 31, 54)",
    secondary: "rgb(224, 30, 55)",
    dark: "rgb(100, 18, 32)",
  },
  green: {
    primary: "rgb(21, 93, 39)",
    secondary: "rgb(32, 139, 58)",
    dark: "rgb(16, 69, 29)",
  },
};

const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem("theme") || "blue";
  });

  useEffect(() => {
    if (availableThemes[theme]) {
      const { primary, secondary, dark } = availableThemes[theme];
      document.documentElement.style.setProperty("--primary-color", primary);
      document.documentElement.style.setProperty(
        "--secondary-color",
        secondary
      );
      document.documentElement.style.setProperty("--dark-color", dark);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
