import { lightColors, darkColors } from "./colorsTh";
import { useColorScheme } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  dark: false,
  colorsTh: lightColors,
  setScheme: () => {},
});

export const ThemeProvider = (props) => {
  const [isDark, setDark] = useState(colorScheme == "dark");
  const colorScheme = useColorScheme();

  useEffect(() => {
    setDark(colorScheme === "dark");
  }, [colorScheme]);

  const defaultTheme = {
    dark: isDark,
    colorsTh: isDark ? darkColors : lightColors,
    setScheme: (scheme) => setDark(scheme === "dark"),
  };

  return (
    <ThemeContext.Provider value={defaultTheme}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
