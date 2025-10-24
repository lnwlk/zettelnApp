import React from 'react';
import { useTranslation } from 'react-i18next';

export function ProgressBar({ current, total }) {
  const { t } = useTranslation();
  const percentage = (current / total) * 100;
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-slate-600">
          {t('survey.progress', { current, total })}
        </span>
        <span className="text-sm font-medium text-blue-600">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  
  const languages = [
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    // Aktiviere nach DeepL Übersetzung:
    // { code: 'ar', label: 'العربية', flag: '🇸🇦' },
    // { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
    // { code: 'uk', label: 'Українська', flag: '🇺🇦' },
    // { code: 'ru', label: 'Русский', flag: '🇷🇺' }
  ];
  
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-6">
      {languages.map(lang => (
        <button
          key={lang.code}
          className={`
            px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
            ${i18n.language === lang.code 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }
          `}
          onClick={() => i18n.changeLanguage(lang.code)}
          dir={lang.code === 'ar' ? 'rtl' : 'ltr'}
        >
          <span className="mr-1">{lang.flag}</span>
          {lang.label}
        </button>
      ))}
    </div>
  );
}

export function ThankYouScreen() {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
      <div className="max-w-md mx-auto">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
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
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          {t('survey.thanks.title')}
        </h1>
        <p className="text-lg text-slate-700 mb-4">
          {t('survey.thanks.message')}
        </p>
        <p className="text-slate-600 mb-8">
          {t('survey.thanks.next')}
        </p>
        
        <button 
          className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
          onClick={() => {
            localStorage.removeItem('zetteln_survey_answers');
            window.location.href = '/';
          }}
        >
          {t('survey.thanks.home')}
        </button>
      </div>
    </div>
  );
}

export default ProgressBar;
