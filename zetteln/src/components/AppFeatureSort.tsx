import ArrowRight from '../assets/icons/ArrowRight'
import VideoPlayer from './VideoPlayer'

export default function AppFeatureExplain({ id }: { id: string }) {
  return (
    <section id={id} className="border-t-2 border-gray-100 bg-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col py-16 text-2xl md:flex-row md:items-center md:justify-between md:py-0">
        <div className="px-4 md:w-2/5 md:px-8">
          <p className="pb-4 leading-relaxed">
            Aus Angst, etwas Wichtiges zu verlieren bewahren viele Menschen jedes Papier auf. zetteln hilft, die
            türmende Papierstapeln systematisch aufzuräumen.
          </p>
          <ul className="hidden space-y-2 pt-4 text-xl md:visible">
            <li className="flex items-center gap-2">
              <ArrowRight size={24} className="text-gray-400" /> Automatisch Kategorisierung
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight size={24} className="text-gray-400" />
              Lokales, strukturiertes Archiv
            </li>

            <li className="flex items-center gap-2">
              <ArrowRight size={24} className="text-gray-400" />
              Klaren Handlungsempfehlungen
            </li>
          </ul>
        </div>
        <div className="mt-16 flex aspect-square w-full items-center justify-center rounded-4xl bg-blue-300 p-4 md:w-1/2">
          <div className="flex flex-col items-center gap-2 rounded-4xl border border-white p-1">
            <div className="flex h-160 shrink-1 items-center justify-center overflow-hidden rounded-4xl shadow-2xl">
              <VideoPlayer src="/videos/04_DokumentSortieren.mp4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
