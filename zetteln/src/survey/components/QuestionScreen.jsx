import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import MultipleChoice from './questions/MultipleChoice'
import SingleChoice from './questions/SingleChoice'
import TextInput, { EmailInput, ShortTextInput } from './questions/TextInput'

function QuestionScreen({ question, answer, onAnswer, onNext, onBack, onSubmit, isFirst, isLast }) {
  const { t } = useTranslation()
  const [error, setError] = useState('')

  const handleNext = () => {
    if (question.required && !answer) {
      setError(t('survey.errors.required'))
      return
    }

    if (question.maxSelections && answer && answer.length > question.maxSelections) {
      setError(t('survey.errors.maxSelections', { max: question.maxSelections }))
      return
    }

    setError('')
    if (isLast) {
      onSubmit()
    } else {
      onNext()
    }
  }

  const handleAnswer = (value) => {
    setError('')
    onAnswer(question.id, value)
  }

  const renderQuestion = () => {
    switch (question.type) {
      case 'single':
        return (
          <SingleChoice
            questionId={question.id}
            value={answer}
            onChange={handleAnswer}
            hasFollowUp={question.hasFollowUp}
          />
        )

      case 'multiple':
        return (
          <MultipleChoice
            questionId={question.id}
            value={answer || []}
            onChange={handleAnswer}
            maxSelections={question.maxSelections}
            hasOther={question.hasOther}
          />
        )

      case 'text':
        return <TextInput questionId={question.id} value={answer || ''} onChange={handleAnswer} />

      case 'shortText': // ← NEU!
        return <ShortTextInput questionId={question.id} value={answer || ''} onChange={handleAnswer} />

      case 'email':
        return <EmailInput questionId={question.id} value={answer || ''} onChange={handleAnswer} />

      default:
        return null
    }
  }

  return (
    <div className="rounded-2xl p-6 md:p-8">
      {/* Question Content */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl leading-tight font-semibold text-slate-900 md:text-3xl">
          {t(`survey.questions.${question.id}.question`)}
        </h2>

        {question.maxSelections && (
          <p className="mb-4 text-sm text-slate-600">{t(`survey.questions.${question.id}.hint`)}</p>
        )}

        {renderQuestion()}

        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
            <div className="flex items-start">
              <svg className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          className="rounded-lg bg-gray-200 px-6 py-3 text-gray-700 transition-colors duration-200 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={onBack}
          disabled={isFirst}
        >
          {t('survey.navigation.back')}
        </button>

        <div className="flex gap-3 sm:ml-auto">
          {!question.required && !isLast && (
            <button
              className="px-6 py-3 text-gray-600 transition-colors duration-200 hover:text-gray-900"
              onClick={onNext}
            >
              {t('survey.navigation.skip')}
            </button>
          )}

          <button
            className="rounded-lg bg-blue-300 px-6 py-3 font-semibold transition-colors duration-200 hover:bg-blue-400"
            onClick={handleNext}
          >
            {isLast ? t('survey.navigation.submit') : t('survey.navigation.next')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuestionScreen
