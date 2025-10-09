import ArrowRight from '../assets/icons/ArrowRight'

export default function Partner() {
  return (
    <div className="mx-auto max-w-7xl rounded-4xl bg-blue-900 p-8 text-white">
      <div className="mx-auto flex h-full flex-col gap-8 text-xl md:flex-row md:items-stretch">
        <h2 className="text-4xl md:w-1/2 md:pr-16">Gemeinsam mit euch wirkungsvoll unterstützen</h2>
        <div className="flex flex-col items-start gap-8 md:w-1/2">
          <p className="leading-relaxed">
            Du bist Teil einer Beratungsstelle, eines Vereins oder einer Initiative, die Menschen im Behördenalltag
            unterstützt? Wir möchten von dir lernen. Berate uns, was wirklich gebraucht wird und gestalte die App aktiv
            mit.
          </p>
          <ul className="flex flex-col gap-2 text-xl leading-snug">
            <li className="flex items-center gap-3">
              <ArrowRight size={16} className="shrink-0 text-gray-400" />
              Reduziert euren Arbeitsaufwand
            </li>
            <li className="flex items-center gap-3">
              <ArrowRight size={16} className="shrink-0 text-gray-400" />
              Verbessert euer (Beratungs-)Angebot für Betroffene
            </li>
            <li className="flex items-center gap-3">
              <ArrowRight size={16} className="shrink-0 text-gray-400" />
              Zusammen eine Lösung entwickeln, die wirklich hilft
            </li>
          </ul>
          <div className="bg-sand-100 text-black-800 hover:bg-sand-50 rounded-full px-8 py-4">
            <a href="mailto:info@zetteln.app">Schreib uns</a>
          </div>
        </div>
      </div>
    </div>
  )
}
