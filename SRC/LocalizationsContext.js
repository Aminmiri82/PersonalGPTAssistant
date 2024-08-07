import React, { createContext, useState, useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import localizations from "./localizations";

const LocalizationContext = createContext();

export const LocalizationProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [translations, setTranslations] = useState(localizations["en"]);

  useEffect(() => {
    const fetchLanguage = async () => {
      let storedLanguage = await SecureStore.getItemAsync("language");
      if (!storedLanguage) {
        await SecureStore.setItemAsync("language", "en"); // Default language
        storedLanguage = "en";
      }
      setLanguage(storedLanguage);
      setTranslations(localizations[storedLanguage]);
    };

    fetchLanguage();
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setTranslations(localizations[lang]);
    SecureStore.setItemAsync("language", lang);
  };

  return (
    <LocalizationContext.Provider
      value={{ language, translations, changeLanguage }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => useContext(LocalizationContext);
