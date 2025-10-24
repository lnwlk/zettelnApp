import React from 'react';
import { useTranslation } from 'react-i18next';

function ConsentScreen({ onConsent }) {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      {/* Intro */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
          {t('survey.title')}
        </h1>
        <p className="text-lg text-slate-600 mb-4">
          {t('survey.subtitle')}
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {t('survey.duration')}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            {t('survey.anonymous')}
          </span>
        </div>
      </div>

      {/* Consent Box */}
      <div className="border-2 border-slate-200 rounded-xl p-6 bg-slate-50">
        <h2 className="text-xl font-semibold text-slate-900 mb-3">
          {t('survey.consent.title')}
        </h2>
        <p className="text-slate-700 leading-relaxed mb-6">
          {t('survey.consent.text')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
            onClick={() => onConsent(true)}
          >
            {t('survey.consent.yes')}
          </button>
          <button 
            className="flex-1 px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg transition-colors duration-200"
            onClick={() => window.location.href = '/'}
          >
            {t('survey.consent.no')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConsentScreen;
