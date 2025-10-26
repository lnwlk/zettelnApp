import React from 'react'
import { useTranslation } from 'react-i18next'

export function ProgressBar({ current, total }) {
  const { t } = useTranslation()
  const percentage = (current / total) * 100

  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm text-slate-600">{t('supportSurvey.progress', { current, total })}</span>
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

export function ThankYouScreen() {
  const { t } = useTranslation()

  return (
    <div className="rounded-2xl bg-white p-4 text-center shadow-lg md:p-12">
      <div className="mx-auto max-w-md">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h1 className="mb-4 text-3xl font-bold text-slate-900">{t('supportSurvey.thanks.title')}</h1>
        <p className="mb-4 text-lg text-slate-700">{t('supportSurvey.thanks.message')}</p>
        <p className="mb-8 text-slate-600">{t('supportSurvey.thanks.next')}</p>

        <button
          className="w-full rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-blue-700 hover:shadow-md sm:w-auto"
          onClick={() => {
            localStorage.removeItem('zetteln_support_survey_answers')
            window.location.href = '/'
          }}
        >
          {t('supportSurvey.thanks.home')}
        </button>
      </div>
    </div>
  )
}

export default ProgressBar
