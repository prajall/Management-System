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
    primary: "#003559",
    secondary: "#0353a4",
    dark: "#061a40",
  },
  red: {
    primary: "#bd1f36",
    secondary: "#e01e37",
    dark: "#641220",
  },
  green: {
    primary: "#155d27",
    secondary: "#208b3a",
    dark: "#10451d",
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
