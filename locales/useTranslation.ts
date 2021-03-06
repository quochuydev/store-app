import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locale-en";
import vn from "./locale-vn";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      vn: {
        translation: vn,
      },
    },
    fallbackLng: "vn",
    interpolation: {
      escapeValue: false,
    },
  });

export const translate = (key: string) => i18n.t(key);

export default useTranslation;
