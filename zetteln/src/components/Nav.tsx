import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ArrowRight from '../assets/icons/ArrowRight'

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  const handleAnchorClick = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/', { replace: false })
      setTimeout(() => {
        const element = document.getElementById(id)
        element?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      const element = document.getElementById(id)
      element?.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  // 🧭 Hide nav when scrolling down, show when scrolling up
  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      if (window.scrollY < lastScrollY) {
        setVisible(true)
      } else if (window.scrollY > lastScrollY + 10) {
        setVisible(false)
      }
      lastScrollY = window.scrollY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 🆕 Instantly scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0) // 👈 instant, no animation
  }, [location.pathname])

  return (
    <div
      className={`fixed top-0 z-50 w-full bg-white transition-transform duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-6 text-lg font-normal md:px-16">
        {/* Logo */}
        <div className="flex w-24 items-center gap-2">
          <Link
            to="/"
            className="text-xl font-semibold tracking-normal transition-all duration-300 ease-in-out hover:tracking-widest"
            onClick={() => {
              setIsOpen(false)
              window.scrollTo(0, 0) // 👈 instant scroll to top
            }}
          >
            zetteln
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden items-center space-x-2 md:flex">
          <button
            onClick={() => handleAnchorClick('features')}
            className="hover:bg-sand-100 border-sand-100 rounded-full border px-6 py-3"
          >
            App Features
          </button>
          <button
            onClick={() => handleAnchorClick('about')}
            className="hover:bg-sand-100 border-sand-100 rounded-full border px-6 py-3"
          >
            Über uns
          </button>
          <button
            onClick={() => handleAnchorClick('support')}
            className="hover:bg-sand-100 border-sand-100 rounded-full border px-6 py-3"
          >
            Für Helfende
          </button>
        </div>

        {/* Desktop Button */}
        <div className="hidden md:block">
          <Link
            to="/AppWaitlist"
            onClick={() => {
              setIsOpen(false)
              window.scrollTo(0, 0) // 👈 instant scroll to top
            }}
            className="bg-black-800 flex items-center gap-2 rounded-full px-6 py-3 text-white transition-all duration-200 hover:bg-black"
          >
            <ArrowRight /> App testen
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="hover:bg-sand-100 rounded-md p-2 md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <svg width="24" height="24" fill="none" color="#000">
              <path
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.758 17.243 12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
              />
            </svg>
          ) : (
            <svg width="24" height="24" fill="none" color="#000">
              <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" d="M3 5h18M3 12h18M3 19h18" />
            </svg>
          )}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="border-sand-100 absolute top-20 left-0 z-50 w-full border-t bg-white shadow-md md:hidden">
            <div className="flex flex-col items-center space-y-4 py-6 text-lg">
              <button onClick={() => handleAnchorClick('features')} className="hover:text-sand-600">
                App Features
              </button>
              <button onClick={() => handleAnchorClick('about')} className="hover:text-sand-600">
                Über uns
              </button>
              <button onClick={() => handleAnchorClick('support')} className="hover:text-sand-600">
                Für Helfende
              </button>

              <Link
                to="/AppWaitlist"
                onClick={() => {
                  setIsOpen(false)
                  window.scrollTo(0, 0) // 👈 instant scroll to top
                }}
                className="bg-black-800 flex items-center gap-2 rounded-full px-6 py-3 text-white transition-all duration-200 hover:bg-black"
              >
                <ArrowRight /> App testen
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}
