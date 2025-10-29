import React from 'react';
import SingleChoice from './questions/SingleChoice';
import MultipleChoice from './questions/MultipleChoice';
import TextInput from './questions/TextInput';

const QuestionScreen = ({ question, value, onChange }) => {
  const renderInput = () => {
    switch (question.type) {
      case 'single':
        return <SingleChoice question={question} value={value} onChange={onChange} />;
      case 'multiple':
        return <MultipleChoice question={question} value={value} onChange={onChange} />;
      case 'text':
      case 'shortText':
      case 'email':
        return <TextInput question={question} value={value} onChange={onChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {question.label}
          {question.required && <span className="text-red-500 ml-1">*</span>}
        </h2>
        {question.description && (
          <p className="text-gray-600">{question.description}</p>
        )}
      </div>

      {renderInput()}
    </div>
  );
};

export default QuestionScreen;
