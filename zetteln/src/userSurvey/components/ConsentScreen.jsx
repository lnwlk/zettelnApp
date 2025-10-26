import React from 'react'
import { useTranslation } from 'react-i18next'

function ConsentScreen({ onConsent }) {
  const { t } = useTranslation()

  return (
    <div className="rounded-2xl md:p-8">
      {/* Intro */}
      <div className="mb-8 text-center">
        <h1 className="mb-3 text-3xl leading-tight md:text-5xl"> {t('survey.title')}</h1>

        <div className="flex flex-wrap justify-center gap-2">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
            {t('survey.duration')}
          </span>
          <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
            {t('survey.anonymous')}
          </span>
        </div>
      </div>

      {/* Consent Box */}
      <div className="rounded-xl bg-white p-4 text-center">
        <h2 className="mb-3 text-xl text-slate-900">{t('survey.consent.title')}</h2>
        <p className="mb-6 leading-relaxed text-slate-700">{t('survey.consent.text')}</p>

        <div className="flex flex-col gap-3">
          <button
            className="bg-black-800 flex-1 rounded-lg px-6 py-3 text-white shadow-sm transition-colors duration-200 hover:bg-black hover:shadow-md"
            onClick={() => onConsent(true)}
          >
            {t('survey.consent.yes')}
          </button>
          <button
            className="hover:bg-sand-50 flex-1 rounded-lg border-1 border-gray-200 bg-white px-6 py-3 text-gray-700 transition-colors duration-200"
            onClick={() => (window.location.href = '/')}
          >
            {t('survey.consent.no')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConsentScreen
