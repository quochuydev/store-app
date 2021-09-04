import i18n from "i18next";
// import Backend from "i18next-xhr-backend";
import { useTranslation, initReactI18next } from "react-i18next";
import en from "./locale-en";
import vn from "./locale-vn";

i18n
  //   .use(Backend)
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
    lng: "vn",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export const translate = (key: string) => i18n.t(key);

export default useTranslation;
