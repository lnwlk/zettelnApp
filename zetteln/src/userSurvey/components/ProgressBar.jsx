import React from 'react'
import { useTranslation } from 'react-i18next'

export function ProgressBar({ current, total }) {
  const { t } = useTranslation()
  const percentage = (current / total) * 100

  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm text-slate-600">{t('survey.progress', { current, total })}</span>
        <span className="text-black-800 text-sm">{Math.round(percentage)}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-2.5 rounded-full bg-blue-300 transition-all duration-300 ease-in-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const languages = [
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
    { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
    { code: 'uk', label: 'Українська', flag: '🇺🇦' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'fa', label: 'فارسی', flag: '🇮🇷🇦🇫' },
    { code: 'fr', label: 'français', flag: '🇫🇷' },
    { code: 'ro', label: 'română', flag: '🇷🇴' },
    { code: 'zh', label: '中文', flag: '🇨🇳' },
  ]

  return (
    <div className="mb-6 flex flex-wrap justify-center gap-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          className={`rounded-full px-4 py-2 transition-all duration-200 ${
            i18n.language === lang.code
              ? 'bg-black-800 text-white shadow-md'
              : 'hover:bg-sand-100 border border-gray-100 bg-white text-slate-700'
          } `}
          onClick={() => i18n.changeLanguage(lang.code)}
          dir={['ar', 'fa'].includes(lang.code) ? 'rtl' : 'ltr'}
        >
          <span className="mr-1">{lang.flag}</span>
          {lang.label}
        </button>
      ))}
    </div>
  )
}

export function ThankYouScreen() {
  const { t } = useTranslation()

  return (
    <div className="rounded-2xl bg-white p-4 text-center md:p-12">
      <div className="mx-auto max-w-md">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h1 className="text-black-800 mb-4 text-3xl font-semibold">{t('survey.thanks.title')}</h1>
        <p className="text-black-800 mb-4 text-lg">{t('survey.thanks.message')}</p>

        <button
          className="w-full rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-blue-700 hover:shadow-md sm:w-auto"
          onClick={() => {
            localStorage.removeItem('zetteln_survey_answers')
            window.location.href = '/'
          }}
        >
          {t('survey.thanks.home')}
        </button>
      </div>
    </div>
  )
}

export default ProgressBar
