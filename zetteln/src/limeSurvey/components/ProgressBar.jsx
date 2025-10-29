import React from 'react';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          Frage {currentStep} von {totalSteps}
        </span>
        <span className="text-sm font-medium text-gray-700">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export const ThankYouScreen = ({ onGoHome }) => {
  return (
    <div className="w-full max-w-2xl mx-auto text-center py-12">
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Vielen Dank!</h2>
        <p className="text-lg text-gray-600 mb-8">
          Ihre Antwort wurde erfolgreich übermittelt.
        </p>
      </div>
      {onGoHome && (
        <button
          onClick={onGoHome}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Zurück zur Startseite
        </button>
      )}
    </div>
  );
};

export default ProgressBar;
