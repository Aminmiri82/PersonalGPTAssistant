import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import * as Localization from "expo-localization";
import en from "./locales/en.json";
import fa from "./locales/fa.json";

const translations = {
  en,
  fa,
};

const LocalizationContext = createContext();

export const LocalizationProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [currentTranslations, setCurrentTranslations] = useState(
    translations.en
  );

  useEffect(() => {
    const initializeLanguage = async () => {
      const storedLanguage = await SecureStore.getItemAsync("language");
      const deviceLanguage = Localization.locale.split("-")[0];
      const initialLanguage = storedLanguage || deviceLanguage || "en";
      setLanguage(initialLanguage);
      setCurrentTranslations(translations[initialLanguage]);
    };

    initializeLanguage();
  }, []);

  const changeLanguage = async (lang) => {
    setLanguage(lang);
    setCurrentTranslations(translations[lang]);
    await SecureStore.setItemAsync("language", lang);
  };

  return (
    <LocalizationContext.Provider
      value={{ language, translations: currentTranslations, changeLanguage }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => useContext(LocalizationContext);
