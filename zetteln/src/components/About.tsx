import ArrowRight from '../assets/icons/ArrowRight'

export default function About() {
  return (
    <div className="to-sand-50 via-sand-100 from-sand-50 bg-gradient-to-b">
      <div className="mx-auto flex max-w-7xl flex-col rounded-4xl px-4 py-12 text-xl md:w-2/3 md:px-8 md:py-16">
        <h2 className="pb-8 text-4xl">Über uns</h2>
        <p>
          zetteln.app ist aus purem Frust über den Behördenwahnsinn entstanden. Als freiberufliche Designerin kennt Lena
          Wilke die eigenen Papiertürme zu Hause und beboachtet während ihrer ehrenamtlichen Arbeit mit geflüchteten
          Menschen, wie schwierig es ist, sich durch Formulare, Bescheide und komplizierte Briefe zu kämpfen. <br />
          <br /> Diverse Studien belegen, dass mindestens jede vierte bis fünfte Person regelmäßig Schwierigkeiten im
          Kontakt mit Behörden hat und sich gezielte Unterstützung wünscht – mit steigender Tendenz. Gleichzeitig ist
          die Beratungslandschaft hochfragmentiert und steht unter massivem Druck. Die Zahl der Beratungsfälle steigt
          kontinuierlich, während die personelle Ausstattung stagniert. Die Folge ist eine zunehmend überforderte
          Verwaltung, was sich besonders in Ausländer- und Sozialbehörden sowie Jugendämtern zeigt.
          <br /> <br />
          Technologie, vor allem KI, kann hier richtig helfen. Wenn sie ethisch, datenschutzkonform und im Intresse der
          Nutzer:innen eingesetzt wird. Auf diesen Grundlagen ist die Idee für eine App enstanden, die Menschen mit
          sprachlichen Hürden, Leseschwierigkeiten oder geringer digitaler Kompetenz unterstützt, sich im deutsche
          Behördensystem zurecht zu finden.
        </p>
        <h3 className="pt-8 pb-4 font-bold">Unser Ansatz</h3>
        <ul className="flex flex-col gap-2 text-xl leading-snug">
          <li className="flex items-center gap-3">
            <ArrowRight size={16} className="shrink-0 text-gray-400" />
            Kostenlos für alle Nutzer:innen
          </li>
          <li className="flex items-center gap-3">
            <ArrowRight size={16} className="shrink-0 text-gray-400" />
            Einfaches, inklusives Design in leichter Sprache
          </li>
          <li className="flex items-center gap-3">
            <ArrowRight size={16} className="shrink-0 text-gray-400" />
            Alle Daten bleiben auf dem eigenen Gerät – keine Cloud, kein Tracking
          </li>
          <li className="flex items-center gap-3">
            <ArrowRight size={16} className="shrink-0 text-gray-400" />
            Gemeinnützig und getragen von der Gemeinschaft
          </li>
        </ul>
      </div>
    </div>
  )
}
