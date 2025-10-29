// LimeSurvey Questions Configuration
export const questions = [
  {
    id: 'name',
    type: 'shortText',
    required: true,
    section: 'basic'
  },
  {
    id: 'email',
    type: 'email',
    required: true,
    section: 'basic'
  },
  {
    id: 'question1',
    type: 'single',
    required: true,
    section: 'questions',
    options: [
      // Options to be filled by user
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' }
    ]
  },
  {
    id: 'question2',
    type: 'multiple',
    required: true,
    section: 'questions',
    options: [
      // Options to be filled by user
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' }
    ]
  },
  {
    id: 'message',
    type: 'text',
    required: false,
    section: 'feedback'
  }
];
