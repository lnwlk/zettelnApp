import React from 'react';

const MultipleChoice = ({ question, value = [], onChange }) => {
  const handleChange = (optionValue) => {
    const currentSelections = Array.isArray(value) ? value : [];

    if (currentSelections.includes(optionValue)) {
      // Remove selection
      onChange(currentSelections.filter(v => v !== optionValue));
    } else {
      // Add selection
      onChange([...currentSelections, optionValue]);
    }
  };

  return (
    <div className="w-full space-y-3">
      {question.options.map((option) => {
        const isChecked = Array.isArray(value) && value.includes(option.value);

        return (
          <label
            key={option.value}
            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
              isChecked
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-blue-300'
            }`}
          >
            <input
              type="checkbox"
              value={option.value}
              checked={isChecked}
              onChange={() => handleChange(option.value)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-700">{option.label}</span>
          </label>
        );
      })}
    </div>
  );
};

export default MultipleChoice;
