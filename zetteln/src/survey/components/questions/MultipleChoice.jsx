import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function MultipleChoice({ questionId, value, onChange, maxSelections, hasOther }) {
  const { t } = useTranslation();
  const [otherText, setOtherText] = useState('');
  
  const optionsKey = `survey.questions.${questionId}.options`;
  const options = t(optionsKey, { returnObjects: true });
  
  const handleToggle = (optionKey) => {
    let newValue = [...value];
    
    if (newValue.includes(optionKey)) {
      newValue = newValue.filter(v => v !== optionKey);
    } else {
      if (maxSelections && newValue.length >= maxSelections) {
        return; // Max erreicht
      }
      newValue.push(optionKey);
    }
    
    onChange(newValue);
  };

  const handleOtherChange = (e) => {
    const text = e.target.value;
    setOtherText(text);
    
    let newValue = [...value.filter(v => v !== 'other')];
    if (text.trim()) {
      newValue.push('other');
      onChange({ selections: newValue, otherText: text });
    } else {
      onChange(newValue);
    }
  };

  const isChecked = (key) => {
    if (Array.isArray(value)) {
      return value.includes(key);
    }
    return value?.selections?.includes(key) || false;
  };

  const currentCount = Array.isArray(value) ? value.length : (value?.selections?.length || 0);

  return (
    <div className="space-y-3">
      {Object.entries(options).map(([key, label]) => {
        if (key === 'other' && !hasOther) return null;
        
        return (
          <div key={key}>
            <label 
              className={`
                group block p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
                ${isChecked(key)
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                }
              `}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name={questionId}
                  value={key}
                  checked={isChecked(key)}
                  onChange={() => handleToggle(key)}
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                />
                <span className={`
                  ml-3 text-base font-medium
                  ${isChecked(key) ? 'text-blue-900' : 'text-slate-900'}
                `}>
                  {label}
                </span>
              </div>
            </label>
            
            {hasOther && key === 'other' && isChecked('other') && (
              <div className="mt-3 ml-7 animate-fade-in">
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder={t(`survey.questions.${questionId}.otherPlaceholder`)}
                  value={otherText}
                  onChange={handleOtherChange}
                />
              </div>
            )}
          </div>
        );
      })}
      
      {maxSelections && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-sm text-slate-600">
            {currentCount} / {maxSelections} ausgewählt
          </p>
          {currentCount >= maxSelections && (
            <p className="text-sm text-amber-600 font-medium">
              Maximum erreicht
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default MultipleChoice;
