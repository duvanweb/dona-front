import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import es from './locales/es/translation.json'
import en from './locales/en/translation.json'
import pt from './locales/pt/translation.json'

export const SUPPORTED_LANGUAGES = [
  { code: 'es', label: 'Español', locale: 'es-CO' },
  { code: 'en', label: 'English', locale: 'en-US' },
  { code: 'pt', label: 'Português', locale: 'pt-BR' },
] as const

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]['code']

// Locale Intl para formateo de números/monedas según idioma activo
export function intlLocale(lang: string): string {
  return SUPPORTED_LANGUAGES.find((l) => lang.startsWith(l.code))?.locale ?? 'es-CO'
}

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng
})

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      en: { translation: en },
      pt: { translation: pt },
    },
    fallbackLng: 'es',
    supportedLngs: SUPPORTED_LANGUAGES.map((l) => l.code),
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'lang',
      caches: ['localStorage'],
    },
  })

export default i18n
