// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: false,
    lng: "en",
    supportedLngs: ["en", "tr"],
    backend: {
      loadPath: "/locales/{{lng}}.json",
    },

    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["path", "cookie", "localStorage", "navigator", "htmlTag", "querystring"],
      caches: ["cookie"],
    },
  });

export default i18n;
