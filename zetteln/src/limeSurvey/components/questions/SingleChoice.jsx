import React from 'react';

const SingleChoice = ({ question, value, onChange }) => {
  const handleChange = (selectedValue) => {
    onChange(selectedValue);
  };

  return (
    <div className="w-full space-y-3">
      {question.options.map((option) => (
        <label
          key={option.value}
          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
            value === option.value
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-blue-300'
          }`}
        >
          <input
            type="radio"
            name={question.id}
            value={option.value}
            checked={value === option.value}
            onChange={() => handleChange(option.value)}
            className="w-5 h-5 text-blue-600 focus:ring-blue-500"
            required={question.required}
          />
          <span className="ml-3 text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default SingleChoice;
