import React, { useState, useEffect } from 'react';
import { questions } from './questions';
import QuestionScreen from './components/QuestionScreen';
import ProgressBar, { ThankYouScreen } from './components/ProgressBar';
import { useNavigate } from 'react-router-dom';

const Survey = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const totalSteps = questions.length;

  // Load saved answers from localStorage
  useEffect(() => {
    const savedAnswers = localStorage.getItem('lime_survey_answers');
    if (savedAnswers) {
      try {
        setAnswers(JSON.parse(savedAnswers));
      } catch (e) {
        console.error('Failed to parse saved answers:', e);
      }
    }
  }, []);

  // Save answers to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem('lime_survey_answers', JSON.stringify(answers));
    }
  }, [answers]);

  const currentQuestion = questions[currentStep - 1];

  const handleAnswerChange = (value) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const isCurrentQuestionAnswered = () => {
    const answer = answers[currentQuestion.id];

    if (!currentQuestion.required) {
      return true;
    }

    if (currentQuestion.type === 'multiple') {
      return Array.isArray(answer) && answer.length > 0;
    }

    return answer !== undefined && answer !== null && answer !== '';
  };

  const goToNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const goToPrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isCurrentQuestionAnswered()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/submit-limesurvey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit survey');
      }

      const data = await response.json();
      console.log('Survey submitted successfully:', data);

      // Clear localStorage after successful submission
      localStorage.removeItem('lime_survey_answers');

      // Show thank you screen
      setShowThankYou(true);
    } catch (error) {
      console.error('Error submitting survey:', error);
      alert('Fehler beim Absenden der Umfrage. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  if (showThankYou) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <ThankYouScreen onGoHome={handleGoHome} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Umfrage</h1>
            <p className="text-gray-600">Bitte beantworten Sie alle Pflichtfragen</p>
          </div>

          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

          <form onSubmit={handleSubmit}>
            <QuestionScreen
              question={currentQuestion}
              value={answers[currentQuestion.id]}
              onChange={handleAnswerChange}
            />

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={goToPrevious}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  currentStep === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Zurück
              </button>

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={goToNext}
                  disabled={!isCurrentQuestionAnswered()}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    !isCurrentQuestionAnswered()
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Weiter
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!isCurrentQuestionAnswered() || isSubmitting}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    !isCurrentQuestionAnswered() || isSubmitting
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {isSubmitting ? 'Wird gesendet...' : 'Absenden'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Survey;
