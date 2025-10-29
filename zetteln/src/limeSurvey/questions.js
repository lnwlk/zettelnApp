// LimeSurvey Fragen-Konfiguration
export const questions = [
  {
    id: 'name',
    type: 'shortText',
    label: 'Name',
    placeholder: 'Ihr Name',
    required: true,
    section: 'basic'
  },
  {
    id: 'email',
    type: 'email',
    label: 'E-Mail-Adresse',
    placeholder: 'ihre.email@beispiel.de',
    required: true,
    section: 'basic'
  },
  {
    id: 'question1',
    type: 'single',
    label: 'Frage 1',
    description: 'Bitte wählen Sie eine Option',
    required: true,
    section: 'questions',
    options: [
      // Optionen können hier angepasst werden
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' }
    ]
  },
  {
    id: 'question2',
    type: 'multiple',
    label: 'Frage 2',
    description: 'Mehrfachauswahl möglich',
    required: true,
    section: 'questions',
    options: [
      // Optionen können hier angepasst werden
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' }
    ]
  },
  {
    id: 'message',
    type: 'text',
    label: 'Nachricht',
    placeholder: 'Ihre Nachricht hier eingeben...',
    required: false,
    section: 'feedback'
  }
];
