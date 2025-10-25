import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ar from './locales/ar.json'
import de from './locales/de.json'
import en from './locales/en.json'
import fa from './locales/fa.json'
import fr from './locales/fr.json'
import ro from './locales/ro.json'
import ru from './locales/ru.json'
import tr from './locales/tr.json'
import uk from './locales/uk.json'
import zh from './locales/zh.json'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
    de: { translation: de },
    ru: { translation: ru },
    tr: { translation: tr },
    uk: { translation: uk },
    fr: { translation: fr },
    fa: { translation: fa },
    ro: { translation: ro },
    zh: { translation: zh },
  },
  lng: 'de', // Standard-Sprache
  fallbackLng: 'de', // Fallback-Sprache
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
