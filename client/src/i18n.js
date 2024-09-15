import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector'; // Import the language detector
import translationEN from './locales/en/translation.json';
import translationKN from './locales/kn/translation.json';
import translationHI from './locales/hi/translation.json';

// The translations
const resources = {
  en: {
    translation: translationEN
  },
  kn: {
    translation: translationKN
  },
  hi: {
    translation: translationHI
  }
};

i18n
  .use(LanguageDetector) // Use the language detector
  .use(initReactI18next) // Passes i18n instance to react-i18next.
  .init({
    resources,
    fallbackLng: 'en', // Default language
    interpolation: {
      escapeValue: false, // React already escapes content by default
    },
  });

export default i18n;
