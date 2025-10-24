// tailwind-survey.config.js
// Optional: Erweiterte Tailwind-Konfiguration für Survey-Komponenten
// 
// VERWENDUNG:
// Füge diese Erweiterungen zu deiner tailwind.config.js hinzu

module.exports = {
  theme: {
    extend: {
      // Animationen für Survey
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out'
      }
    }
  }
};

// INTEGRATION IN DEINE tailwind.config.js:
// 
// import { extend } from 'lodash'; // oder manuell mergen
// import surveyConfig from './path/to/tailwind-survey.config.js';
// 
// export default {
//   content: ['./src/**/*.{js,jsx,ts,tsx}'],
//   theme: {
//     extend: {
//       ...surveyConfig.theme.extend
//     }
//   }
// }
