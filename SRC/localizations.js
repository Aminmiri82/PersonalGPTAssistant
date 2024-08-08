import * as Localization from "expo-localization";
import i18n from "i18n-js";
import * as SecureStore from "expo-secure-store";
import en from "./locales/en.json";
import fa from "./locales/fa.json";

// Set up translations
i18n.translations = {
  en,
  fa,
};

// Set the default language
i18n.defaultLocale = "en";

// Function to set up localization
const setupLocalization = async () => {
  try {
    const storedLanguage = await SecureStore.getItemAsync("language");
    const locale = storedLanguage || Localization.locale.split("-")[0] || "en";
    i18n.locale = locale;
  } catch (error) {
    console.error("Failed to set up localization:", error);
    i18n.locale = "en"; // Fallback to default language
  }
};

// Function to change the language
const changeLanguage = async (lang) => {
  try {
    i18n.locale = lang;
    await SecureStore.setItemAsync("language", lang);
  } catch (error) {
    console.error("Failed to change language:", error);
  }
};

// Initialize localization
setupLocalization();

export { i18n, changeLanguage };
