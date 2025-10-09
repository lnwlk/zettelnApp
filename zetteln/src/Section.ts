import AppFeatureExplain from './components/AppFeatureExplain'
import AppFeatureFill from './components/AppFeatureFill'
import AppFeatureSearch from './components/AppFeatureFind'
import AppFeatureSort from './components/AppFeatureSort'

export const sections = [
  { id: 'section1', label: 'Verstehen', Component: AppFeatureExplain },
  { id: 'section2', label: 'Ausfüllen', Component: AppFeatureFill },
  { id: 'section3', label: 'Sortieren', Component: AppFeatureSort },
  { id: 'section4', label: 'Finden', Component: AppFeatureSearch },
]
