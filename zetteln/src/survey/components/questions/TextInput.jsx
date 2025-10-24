import React from 'react';
import { useTranslation } from 'react-i18next';

export function TextInput({ questionId, value, onChange }) {
  const { t } = useTranslation();
  
  return (
    <div className="mt-4">
      <textarea
        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
        rows="5"
        placeholder={t(`survey.questions.${questionId}.placeholder`)}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export function EmailInput({ questionId, value, onChange }) {
  const { t } = useTranslation();
  
  const handleCheckbox = (e) => {
    const wantsUpdates = e.target.checked;
    onChange({ ...value, wantsUpdates });
  };
  
  const handleEmail = (e) => {
    onChange({ ...value, email: e.target.value });
  };
  
  return (
    <div className="mt-4 space-y-4">
      <label className="flex items-start p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:border-slate-300 bg-white hover:bg-slate-50 transition-all duration-200">
        <input
          type="checkbox"
          checked={value.wantsUpdates}
          onChange={handleCheckbox}
          className="w-4 h-4 mt-0.5 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        />
        <span className="ml-3 text-base font-medium text-slate-900">
          {t(`survey.questions.${questionId}.yes`)}
        </span>
      </label>
      
      {value.wantsUpdates && (
        <div className="animate-fade-in">
          <input
            type="email"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder={t(`survey.questions.${questionId}.placeholder`)}
            value={value.email}
            onChange={handleEmail}
          />
        </div>
      )}
      
      {!value.wantsUpdates && (
        <p className="text-sm text-slate-600 italic">
          {t(`survey.questions.${questionId}.no`)}
        </p>
      )}
    </div>
  );
}

export default TextInput;
