import { useState } from 'react'
import ArrowRight from '../assets/icons/ArrowRight'

export default function AppFeature() {
  const [topDiv, setTopDiv] = useState<'initial' | 'morphed'>('morphed')

  const toggleCards = () => {
    setTopDiv((prev) => (prev === 'morphed' ? 'initial' : 'morphed'))
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col md:flex-row md:items-center">
      <div className="px-4 pt-24 text-5xl md:w-1/2 md:px-8 md:pt-16 md:text-7xl">
        <h1>Endlich Behördenbriefe verstehen.</h1>
      </div>

      {/* Card container */}
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center md:h-screen md:w-1/2">
        {/* Toggle Switch */}
        <div className="absolute top-8 flex w-full items-center justify-center text-base md:top-20 md:pt-8">
          <div className="flex items-center gap-4">
            <span
              className={`flex w-32 items-center justify-end gap-2 font-serif transition-colors ${
                topDiv === 'initial' ? 'font-bold text-black' : 'text-gray-400'
              }`}
            >
              <h2>Behörde</h2>
            </span>

            <button
              onClick={toggleCards}
              className={`relative h-8 w-16 rounded-full transition-colors duration-300 ${
                topDiv === 'morphed' ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-white shadow-md transition-all duration-300 ${
                  topDiv === 'morphed' ? 'translate-x-8' : 'translate-x-0'
                }`}
              ></span>
            </button>

            <span
              className={`w-32 transition-colors ${topDiv === 'morphed' ? 'font-bold text-black' : 'text-gray-400'}`}
            >
              zetteln
            </span>
          </div>
        </div>

        {/* Card Behörde */}
        <div
          onMouseEnter={() => setTopDiv('initial')}
          className={`absolute min-h-130 w-[80%] rounded-4xl border bg-white transition duration-600 ease-in-out md:mt-32 ${topDiv === 'initial' ? 'z-10 -translate-x-6 scale-100 border-gray-100 shadow-2xl' : 'z-0 -translate-x-14 scale-80 border-gray-300 bg-transparent'}`}
        >
          <div
            className={`px-4 py-8 transition delay-100 duration-300 ease-in-out md:px-8 md:py-16 ${topDiv === 'initial' ? 'opacity-100' : 'opacity-50'}`}
          >
            <div className={`flex flex-col gap-4 font-serif leading-tight ${topDiv === 'initial' ? '' : ''}`}>
              <h3 className="text-2xl"> Informationen zur Zielsetzung</h3>
              <p>
                Im Rahmen der <span className="font-bold">digitalen Transformation</span> entwickeln wir eine mobile
                Applikation, deren <span className="italic">primäre Zielsetzung</span> in der Vereinfachung des Zugangs
                zu behördlicher Kommunikation liegt. zetteln ist eine Applikation die offizielle Texte in verständliche
                Sprache wiedergibt. Die Applikation erläutert amtlicher Schriftstücke durch Kontextualisierung und
                bietet eine adaptive Ausfüllhilfen für Antragsverfahren.
              </p>
            </div>
          </div>
        </div>
        {/* Card Zetteln */}
        <div
          onMouseEnter={() => setTopDiv('morphed')}
          className={`absolute min-h-130 w-[80%] rounded-4xl border bg-white transition duration-600 ease-in-out md:mt-32 ${topDiv === 'morphed' ? 'z-10 translate-x-6 scale-100 border-gray-100 shadow-2xl' : 'z-0 translate-x-14 scale-80 border-gray-300'}`}
        >
          <div
            className={`px-6 transition delay-100 duration-300 ease-in-out md:px-8 md:py-16 ${topDiv === 'morphed' ? 'opacity-100' : 'opacity-50'}`}
          >
            <div className={`flex flex-col gap-4 pt-16 ${topDiv === 'morphed' ? '' : ''}`}>
              <h3 className="pb-4 text-3xl"> Unser Ziel</h3>
              <p className="text-2xl">
                Unsere App <span className="font-bold">hilft dir,</span> <br /> schwierigen Briefe und Formulare
                <br /> zu verstehen.
              </p>
              <ul className="flex flex-col gap-2 text-xl leading-snug">
                <li className="flex items-center gap-3">
                  <ArrowRight size={16} className="shrink-0 text-gray-400" />
                  Sie erklärt Briefe in einfacher Sprache.
                </li>
                <li className="flex items-center gap-3">
                  <ArrowRight size={16} className="shrink-0 text-gray-400" />
                  Sie hilft beim Ausfüllen von Formularen.
                </li>
                <li className="flex items-center gap-3">
                  <ArrowRight size={16} className="shrink-0 text-gray-400" />
                  Sie sortiert deine Dokumente.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
