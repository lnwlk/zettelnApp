import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Nav from './components/Nav'
import { useTwiplaAnalytics } from './hooks/useTwiplaAnalytics'
import AppWaitlistPage from './pages/AppWaitlistPage'
import HomePage from './pages/HomePage'
import ImprintPage from './pages/ImprintPage'

export default function App() {
  useTwiplaAnalytics()
  return (
    <div className="bg-sand-50 text-black-800 relative text-lg font-light">
      <Nav />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/imprint" element={<ImprintPage />} />

        <Route path="/AppWaitlist" element={<AppWaitlistPage />} />
      </Routes>

      <Footer />
    </div>
  )
}
