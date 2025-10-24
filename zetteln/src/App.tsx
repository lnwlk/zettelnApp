import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Nav from './components/Nav'
import AppWaitlistPage from './pages/AppWaitlistPage'
import HomePage from './pages/HomePage'
import ImprintPage from './pages/ImprintPage'
import SurveyUserPage from './pages/SurveyUserPage'

export default function App() {
  return (
    <div className="bg-sand-50 text-black-800 relative text-lg font-light">
      <Nav />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/imprint" element={<ImprintPage />} />
        <Route path="/AppWaitlist" element={<AppWaitlistPage />} />
        <Route path="/SurveyUser" element={<SurveyUserPage />} />
      </Routes>

      <Footer />
    </div>
  )
}
