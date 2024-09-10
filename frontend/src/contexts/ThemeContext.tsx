import React, { createContext, ReactNode, useEffect, useState } from "react";

interface ThemeProp {
  primary: string;
  secondary: string;
  tertiary: string;
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
    primary: "#3234f3",
    secondary: "#2222f3",
    tertiary: "#33fff3",
  },
  red: {
    primary: "#ff0000",
    secondary: "#cc0000",
    tertiary: "#990000",
  },
  green: {
    primary: "#00ff00",
    secondary: "#00cc00",
    tertiary: "#009900",
  },
};

const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<string>("blue");

  useEffect(() => {
    if (availableThemes[theme]) {
      const { primary, secondary, tertiary } = availableThemes[theme];
      document.documentElement.style.setProperty("--primary-color", primary);
      document.documentElement.style.setProperty(
        "--secondary-color",
        secondary
      );
      document.documentElement.style.setProperty("--tertiary-color", tertiary);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
