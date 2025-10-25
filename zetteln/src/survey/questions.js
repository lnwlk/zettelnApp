// Fragendefinitionen für die Umfrage
export const questions = [
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
  {
    id: 'challenges',
    type: 'multiple',
    section: 'challenges',
    hasOther: true,
    required: false,
  },
  {
    id: 'letterScenario',
    type: 'single',
    section: 'challenges',
    required: false,
  },
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

  {
    id: 'email',
    type: 'email',
    section: 'wishes',
    required: false,
  },
]
