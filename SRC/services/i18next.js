import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from "react-native-localize";
import en from "../locales/en.json";
import fa from "../locales/fa.json";
import fr from "../locales/fr.json";

export const languageResources = {
  en: { translation: en },
  fa: { translation: fa },
  fr: { translation: fr },
};

const detectLanguage = () => {
  const locales = RNLocalize.getLocales();
  if (Array.isArray(locales)) {
    const phoneLang = locales[0]?.languageCode;
    if (phoneLang) {
      return phoneLang; // e.g., 'en', 'fa', 'fr'
    }
  }
  return "fa"; // Fallback to farsi if detection fails
  //change for international version
};

i18next.use(initReactI18next).init({
  compatibilityJSON: "v3",
  lng: detectLanguage(),
  fallbackLng: "fa",
  resources: languageResources,
});

export default i18next;
