import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SingleChoice from './questions/SingleChoice';
import MultipleChoice from './questions/MultipleChoice';
import TextInput, { EmailInput } from './questions/TextInput';

function QuestionScreen({ 
  question, 
  answer, 
  onAnswer, 
  onNext, 
  onBack, 
  onSubmit,
  isFirst,
  isLast 
}) {
  const { t } = useTranslation();
  const [error, setError] = useState('');

  const handleNext = () => {
    if (question.required && !answer) {
      setError(t('survey.errors.required'));
      return;
    }
    
    if (question.maxSelections && answer && answer.length > question.maxSelections) {
      setError(t('survey.errors.maxSelections', { max: question.maxSelections }));
      return;
    }
    
    setError('');
    if (isLast) {
      onSubmit();
    } else {
      onNext();
    }
  };

  const handleAnswer = (value) => {
    setError('');
    onAnswer(question.id, value);
  };

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
        );
      
      case 'multiple':
        return (
          <MultipleChoice
            questionId={question.id}
            value={answer || []}
            onChange={handleAnswer}
            maxSelections={question.maxSelections}
            hasOther={question.hasOther}
          />
        );
      
      case 'text':
        return (
          <TextInput
            questionId={question.id}
            value={answer || ''}
            onChange={handleAnswer}
          />
        );
      
      case 'email':
        return (
          <EmailInput
            questionId={question.id}
            value={answer || { wantsUpdates: false, email: '' }}
            onChange={handleAnswer}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      {/* Section Badge */}
      <div className="mb-6">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700">
          {t(`survey.sections.${question.section}`)}
        </span>
      </div>

      {/* Question Content */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-tight">
          {t(`survey.questions.${question.id}.question`)}
        </h2>
        
        {question.maxSelections && (
          <p className="text-sm text-slate-600 mb-4">
            {t(`survey.questions.${question.id}.hint`)}
          </p>
        )}

        {renderQuestion()}

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <button
          className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onBack}
          disabled={isFirst}
        >
          {t('survey.navigation.back')}
        </button>

        <div className="flex gap-3 sm:ml-auto">
          {!question.required && !isLast && (
            <button
              className="px-6 py-3 text-slate-600 hover:text-slate-900 font-medium transition-colors duration-200"
              onClick={onNext}
            >
              {t('survey.navigation.skip')}
            </button>
          )}

          <button
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
            onClick={handleNext}
          >
            {isLast ? t('survey.navigation.submit') : t('survey.navigation.next')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuestionScreen;
