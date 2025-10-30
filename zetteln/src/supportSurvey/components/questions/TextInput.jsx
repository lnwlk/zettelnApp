import React from 'react'
import { useTranslation } from 'react-i18next'

export function TextInput({ questionId, value, onChange }) {
  const { t } = useTranslation()

  return (
    <div className="mt-4">
      <textarea
        className="w-full resize-none rounded-lg border border-gray-200 bg-white px-4 py-3 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        rows="5"
        placeholder={t(`supportSurvey.questions.${questionId}.placeholder`)}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export function ShortTextInput({ questionId, value, onChange }) {
  const { t } = useTranslation()

  return (
    <div className="mt-4">
      <input
        type="text"
        placeholder={t(`supportSurvey.questions.${questionId}.placeholder`)}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

export function EmailInput({ questionId, value, onChange }) {
  const { t } = useTranslation()

  return (
    <div className="mt-4">
      <input
        type="email"
        placeholder={t(`supportSurvey.questions.${questionId}.placeholder`)}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

export default TextInput
