import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

function MultipleChoice({ questionId, value, onChange, maxSelections, hasOther }) {
  const { t } = useTranslation()
  const [otherText, setOtherText] = useState('')

  const optionsKey = `survey.questions.${questionId}.options`
  const options = t(optionsKey, { returnObjects: true })

  const handleToggle = (optionKey) => {
    let newValue = [...value]

    if (newValue.includes(optionKey)) {
      newValue = newValue.filter((v) => v !== optionKey)
    } else {
      if (maxSelections && newValue.length >= maxSelections) {
        return // Max erreicht
      }
      newValue.push(optionKey)
    }

    onChange(newValue)
  }

  const handleOtherChange = (e) => {
    const text = e.target.value
    setOtherText(text)

    let newValue = [...value.filter((v) => v !== 'other')]
    if (text.trim()) {
      newValue.push('other')
      onChange({ selections: newValue, otherText: text })
    } else {
      onChange(newValue)
    }
  }

  const isChecked = (key) => {
    if (Array.isArray(value)) {
      return value.includes(key)
    }
    return value?.selections?.includes(key) || false
  }

  const currentCount = Array.isArray(value) ? value.length : value?.selections?.length || 0

  return (
    <div className="space-y-3">
      {Object.entries(options).map(([key, label]) => {
        if (key === 'other' && !hasOther) return null

        return (
          <div key={key}>
            <label
              className={`group block cursor-pointer rounded-lg border p-4 transition-all duration-200 ${
                isChecked(key)
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-200 hover:bg-slate-50'
              } `}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name={questionId}
                  value={key}
                  checked={isChecked(key)}
                  onChange={() => handleToggle(key)}
                  className="h-4 w-4 rounded border-gray-200 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                />
                <span className={`ml-3 text-base ${isChecked(key) ? 'text-blue-900' : 'text-slate-900'} `}>
                  {label}
                </span>
              </div>
            </label>

            {hasOther && key === 'other' && isChecked('other') && (
              <div className="animate-fade-in mt-3 ml-7">
                <input
                  type="text"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder={t(`survey.questions.${questionId}.otherPlaceholder`)}
                  value={otherText}
                  onChange={handleOtherChange}
                />
              </div>
            )}
          </div>
        )
      })}

      {maxSelections && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-sm text-slate-600">
            {currentCount} / {maxSelections} ausgewählt
          </p>
          {currentCount >= maxSelections && <p className="text-sm text-amber-600">Maximum erreicht</p>}
        </div>
      )}
    </div>
  )
}

export default MultipleChoice
