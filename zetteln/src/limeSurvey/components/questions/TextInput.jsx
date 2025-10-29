import React from 'react';

const TextInput = ({ question, value, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  if (question.type === 'email') {
    return (
      <div className="w-full">
        <input
          type="email"
          value={value || ''}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="your.email@example.com"
          required={question.required}
        />
      </div>
    );
  }

  if (question.type === 'text') {
    return (
      <div className="w-full">
        <textarea
          value={value || ''}
          onChange={handleChange}
          rows={5}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Enter your message here..."
          required={question.required}
        />
      </div>
    );
  }

  // shortText
  return (
    <div className="w-full">
      <input
        type="text"
        value={value || ''}
        onChange={handleChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Enter your answer..."
        required={question.required}
      />
    </div>
  );
};

export default TextInput;
