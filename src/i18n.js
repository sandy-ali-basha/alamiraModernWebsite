import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import navbarAr from "./translation/ar/navbar.json";
import indexAr from "./translation/ar/index.json";
import authAr from "./translation/ar/auth.json";
import aboutAr from "./translation/ar/about.json";

import authTr from "./translation/tr/auth.json";
import navbarTr from "./translation/tr/navbar.json";
import indexTr from "./translation/tr/index.json";
import aboutTr from "./translation/tr/about.json";

import authFr from "./translation/fr/auth.json";
import navbarFr from "./translation/fr/navbar.json";
import indexFr from "./translation/fr/index.json";
import aboutFr from "./translation/fr/about.json";

const resources = {
  fr: { navbar: navbarFr, index: indexFr, auth: authFr, about: aboutFr },
  ar: { navbar: navbarAr, index: indexAr, auth: authAr, about: aboutAr },
  tr: { navbar: navbarTr, index: indexTr, auth: authTr, about: aboutTr },
};

// Get the saved language or default to "ar"
const savedLanguage = localStorage.getItem("i18nextLng") || "ar";

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage, // Use saved language
  fallbackLng: ["ar", "fr"], // Fallback to Arabic, then English
  debug: true,
  ns: ["navbar", "index", "auth", "about"],
  defaultNS: "navbar",
  interpolation: { escapeValue: false },
});

// Ensure language is updated if needed
if (i18n.language !== savedLanguage) {
  i18n.changeLanguage(savedLanguage);
}

export default i18n;
