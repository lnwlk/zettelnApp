import TallyEmbed from '../components/TallyEmbed'

export default function AppWaitlistPage() {
  return (
    <>
      <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-40 text-center text-xl md:px-8">
        <h1 className="text-4xl">zetteln wird aktuell in ausgewählten Pilotprojekten eingesetzt</h1>
        <p>
          Wir wollen Teil eines Systems aus Beratung, Verwaltung und Zivilgesellschaft sein. Und für diese die besten
          Lösungen anbieten. Deshalb wird zetteln aktuell in ausgewählen Pilotprojekten getestet und verbessert. Du
          möchtest dabei sein? Nimm Kontakt mit uns auf und wir informieren dich, sobald du zetteln ausprobieren kannst.
        </p>
        <TallyEmbed
          src="https://tally.so/embed/w2QRGL?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
          height={800}
          title="Feedback Form"
        />
      </div>
    </>
  )
}
