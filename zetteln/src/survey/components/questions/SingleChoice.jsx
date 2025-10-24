import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function SingleChoice({ questionId, value, onChange, hasFollowUp }) {
  const { t } = useTranslation();
  const [followUpText, setFollowUpText] = useState('');
  
  const optionsKey = `survey.questions.${questionId}.options`;
  const options = t(optionsKey, { returnObjects: true });
  
  const handleSelect = (optionKey) => {
    const newValue = { selected: optionKey };
    
    if (hasFollowUp && optionKey === 'yes') {
      newValue.followUp = followUpText;
    }
    
    onChange(newValue);
  };

  const handleFollowUpChange = (e) => {
    const text = e.target.value;
    setFollowUpText(text);
    onChange({ selected: 'yes', followUp: text });
  };

  return (
    <div className="space-y-3">
      {Object.entries(options).map(([key, label]) => (
        <div key={key}>
          <label 
            className={`
              group block p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
              ${value?.selected === key 
                ? 'border-blue-600 bg-blue-50' 
                : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
              }
            `}
          >
            <div className="flex items-center">
              <input
                type="radio"
                name={questionId}
                value={key}
                checked={value?.selected === key}
                onChange={() => handleSelect(key)}
                className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              />
              <span className={`
                ml-3 text-base font-medium
                ${value?.selected === key ? 'text-blue-900' : 'text-slate-900'}
              `}>
                {label}
              </span>
            </div>
          </label>
          
          {hasFollowUp && key === 'yes' && value?.selected === 'yes' && (
            <div className="mt-3 ml-7 animate-fade-in">
              <input
                type="text"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder={t(`survey.questions.${questionId}.whichApp`)}
                value={followUpText}
                onChange={handleFollowUpChange}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default SingleChoice;
