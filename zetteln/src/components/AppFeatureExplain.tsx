import ArrowRight from '../assets/icons/ArrowRight'
import VideoPlayer from './VideoPlayer'

export default function AppFeatureExplain({ id }: { id: string }) {
  return (
    <section id={id} className="border-t-2 border-gray-100 bg-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col py-16 text-2xl md:flex-row md:items-center md:justify-between md:py-0">
        <div className="px-4 md:w-2/5 md:px-8">
          <p className="pb-4 leading-relaxed">
            Deutsche Behördentexte sind oft überformalisiert und voller juristischer Fachbegriffe. zetteln macht diese
            Texte für jeden zugänglich.
          </p>
          <ul className="hidden space-y-2 pt-4 text-xl md:block">
            <li className="flex items-center gap-2">
              <ArrowRight size={24} className="text-gray-400" /> Erklärt Begriffe im Kontext
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight size={24} className="text-gray-400" />
              Markiert relevante Abschnitte
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight size={24} className="text-gray-400" />
              Übersetzt, wo nötig
            </li>
          </ul>
        </div>
        <div className="mt-16 flex aspect-square w-full items-center justify-center rounded-4xl bg-blue-300 p-4 md:w-1/2">
          <div className="flex flex-col items-center gap-2 rounded-4xl border border-white p-1">
            <div className="flex h-160 shrink-1 items-center justify-center overflow-hidden rounded-4xl shadow-2xl">
              <VideoPlayer src="/videos/01_DokumentVerstehen.mp4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
