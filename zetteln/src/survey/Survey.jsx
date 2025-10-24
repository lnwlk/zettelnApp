import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ConsentScreen from './components/ConsentScreen'
import ProgressBar, { LanguageSwitcher, ThankYouScreen } from './components/ProgressBar'
import QuestionScreen from './components/QuestionScreen'
import { questions } from './questions'

function Survey() {
  const { t } = useTranslation()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [hasConsented, setHasConsented] = useState(false)

  // Speichere Antworten lokal (Privacy-by-Design!)
  useEffect(() => {
    const savedAnswers = localStorage.getItem('zetteln_survey_answers')
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers))
    }
  }, [])

  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem('zetteln_survey_answers', JSON.stringify(answers))
    }
  }, [answers])

  const handleConsent = (consented) => {
    if (consented) {
      setHasConsented(true)
      setCurrentStep(1)
    }
  }

  const handleAnswer = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const goToNext = () => {
    if (currentStep < questions.length) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const goToPrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    } else if (currentStep === 1) {
      setHasConsented(false)
      setCurrentStep(0)
    }
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/submit-survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers: answers,
          language: i18n.language,
          timestamp: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit')
      }

      // Erfolg!
      localStorage.removeItem('zetteln_survey_answers')
      setCurrentStep(questions.length + 1)
    } catch (error) {
      console.error('Error:', error)
      alert('Fehler beim Senden. Bitte versuche es erneut.')
    }
  }

  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <LanguageSwitcher />
          <ConsentScreen onConsent={handleConsent} />
        </div>
      </div>
    )
  }

  if (currentStep === questions.length + 1) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <LanguageSwitcher />
          <ThankYouScreen />
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentStep - 1]
  const isLastQuestion = currentStep === questions.length

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <LanguageSwitcher />

        <div className="mb-8 text-center">
          <h1 className="mb-3 text-3xl font-bold text-slate-900 md:text-4xl">{t('survey.title')}</h1>
          <p className="text-lg text-slate-600">{t('survey.subtitle')}</p>
        </div>

        <ProgressBar current={currentStep} total={questions.length} />

        <QuestionScreen
          question={currentQuestion}
          answer={answers[currentQuestion.id]}
          onAnswer={handleAnswer}
          onNext={goToNext}
          onBack={goToPrevious}
          onSubmit={handleSubmit}
          isFirst={currentStep === 1}
          isLast={isLastQuestion}
        />
      </div>
    </div>
  )
}

export default Survey
