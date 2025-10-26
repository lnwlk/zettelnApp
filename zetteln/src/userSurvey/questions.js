export const questions = [
  // Allgemeines
  {
    id: 'languages',
    type: 'multiple',
    section: 'about',
    hasOther: true,
    required: false,
  },
  {
    id: 'name',
    type: 'shortText',
    section: 'about',
    required: false,
  },

  {
    id: 'frequency',
    type: 'single',
    section: 'about',
    required: false,
  },
  // Scenarios
  {
    id: 'scenarioLetter',
    type: 'single',
    section: 'challenges',
    required: false,
  },
  {
    id: 'challengeLetter',
    type: 'multiple',
    section: 'challenges',
    required: false,
  },
  {
    id: 'scenarioAppointments',
    type: 'single',
    section: 'challenges',
    required: false,
  },
  {
    id: 'challengeAppointments',
    type: 'multiple',
    section: 'challenges',
    required: false,
  },
  {
    id: 'scenarioForm',
    type: 'single',
    section: 'challenges',
    required: false,
  },
  {
    id: 'challengeForm',
    type: 'multiple',
    section: 'challenges',
    required: false,
  },

  // More question
  {
    id: 'helpSource',
    type: 'multiple',
    section: 'challenges',
    hasOther: true,
    required: false,
  },
  {
    id: 'missedDeadline',
    type: 'single',
    section: 'challenges',
    required: false,
  },
  {
    id: 'organization',
    type: 'multiple',
    section: 'challenges',
    hasOther: true,
    required: false,
  },
  {
    id: 'organizationSuccess',
    type: 'single',
    section: 'challenges',
    required: false,
  },

  {
    id: 'appPriorities',
    type: 'multiple',
    section: 'digital',
    maxSelections: 3,
    hasOther: true,
    required: false,
  },
  {
    id: 'perfectHelp',
    type: 'text',
    section: 'wishes',
    required: false,
  },
  // Contact
  {
    id: 'email',
    type: 'email',
    section: 'wishes',
    required: false,
  },
]
