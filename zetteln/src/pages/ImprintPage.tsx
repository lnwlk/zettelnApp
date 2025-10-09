export default function ImprintPage() {
  return (
    <>
      <div className="mx-auto mb-8 min-h-screen px-4 pt-56 md:max-w-7xl md:px-8">
        <div className="w-2/3">
          {/* Impressum */}
          <div>
            <h1 className="pt-8 text-4xl">Impressum</h1>
            <h2 className="pt-8 text-2xl">Verantwortlich für den Inhalt dieser Website:</h2>
            <p className="pb-4 text-xl">
              <span className="font-bold">Lena Wilke</span> <br />
              Skalitzer Str. 74A <br /> 10997 Berlin
            </p>
            <a
              className="pb-4 text-xl tracking-normal transition-all duration-300 ease-in-out hover:tracking-wide"
              href="maito:lena@zetteln.app"
            >
              lena@zetteln.app
            </a>
          </div>
          {/* Datenschutzerklärung */}
          <div className="text-base">
            <h1 className="pt-40 text-4xl">Datenschutzerklärung</h1>
            <div>
              <h2 className="pt-8 pb-2 text-xl font-bold">1. Verantwortliche Stelle</h2>
              <p className="pb-4 text-base">
                <span className="font-bold">Lena Wilke</span> <br />
                Skalitzer Str. 74A <br /> 10997 Berlin
              </p>
              <a
                className="pb-4 text-base tracking-normal transition-all duration-300 ease-in-out hover:tracking-wide"
                href="maito:lena@zetteln.app"
              >
                lena@zetteln.app
              </a>
            </div>
            <div>
              <h2 className="pt-8 pb-2 text-xl font-bold">
                2. Erhebung und Speicherung personenbezogener Daten sowie Art und Zweck von deren Verwendung
              </h2>
              <p>
                Beim Besuch dieser Website werden keine personenbezogenen Daten gespeichert, da weder Cookies gesetzt
                noch Tracking-Dienste verwendet werden. <br />
                <br />
                <strong>Server-Logfiles (Automatische Speicherung durch Hosting-Anbieter)</strong>
                <br />
                Obwohl die Website selbst keine Daten speichert, kann der Hosting-Anbieter automatisch folgende
                technische Daten in sogenannten Logfiles erfassen:
              </p>
              <ul className="list-disc pb-4 pl-12 text-base">
                <li>IP-Adresse des Besuchers</li>
                <li>Datum und Uhrzeit der Serveranfrage</li>
                <li>Name der abgerufenen Datei</li>
                <li>Referrer-URL (die Seite, von der der Besucher gekommen ist)</li>
                <li>Verwendeter Browser und Betriebssystem</li>
              </ul>
              <p>
                <strong>Rechtsgrundlage der Verarbeitung:</strong>
                <br />
                Diese Daten sind erforderlich, um den sicheren Betrieb der Website zu gewährleisten, und werden
                automatisch von Ihrem Hosting-Anbieter erfasst. Eine Zusammenführung dieser Daten mit anderen
                Datenquellen erfolgt nicht.
              </p>
              <br />
              <strong>Speicherdauer:</strong>
              <br />
              Logfiles werden in der Regel nach einigen Tagen oder Wochen automatisch gelöscht, abhängig von den
              Richtlinien Ihres Hosting-Anbieters.
            </div>
            <div>
              <h2 className="pt-8 pb-2 text-xl font-bold">3. Keine Verwendung von Cookies</h2>
              <p>
                Diese Website verwendet keine Cookies, Tracking-Technologien oder externe Analyse- bzw. Marketingdienste
                (z. B. Google Analytics, Facebook Pixel). Mit Ausnahme von:
              </p>
            </div>
            <div>
              <h2 className="pt-8 pb-2 text-xl font-bold">4. Tracking-Technologien von TWIPLA</h2>
              <p>
                TWIPLA ist ein Webanalysedienst, der den Website-Traffic misst und allgemeine Informationen über die
                Website-Besucher sammelt. TWIPLA erstellt Statistiken, die zur Verbesserung der Nutzererfahrung
                beitragen. Hierfür werden keine Cookies verwendet. Nutzt ein Website-Betreiber TWIPLA zur
                Reichweitenmessung, können je nach Datenschutzstufe Informationen über das Gerät des Besuchers und
                dessen Eigenschaften, technische Details des Website-Besuchs, die Anzahl der Seitenbesuche sowie
                statistisch relevante Besucherverhaltensweisen verarbeitet werden. Die Technologie von TWIPLA verwendet
                die gesammelten Daten nicht zur Identifikation einzelner Besucher und verknüpft sie nicht mit anderen
                personenbezogenen Informationen. In manchen Fällen kann TWIPLA aufgrund des Standorts des Besuchers und
                der technischen Einstellungen der Website überhaupt keine Geräteinformationen erfassen.
              </p>
            </div>
            <div>
              <h2 className="pt-8 pb-2 text-xl font-bold">5. Keine Weitergabe von Daten</h2>
              <p>Es werden keine personenbezogenen Daten gespeichert oder an Dritte weitergegeben.</p>
            </div>
            <div>
              <h2 className="pt-8 pb-2 text-xl font-bold">6. Externe Links</h2>
              <p>
                Diese Website kann Links zu externen Websites enthalten. Für deren Inhalte und den Datenschutz sind die
                jeweiligen Betreiber verantwortlich.
              </p>
            </div>
            <div>
              <h2 className="pt-8 pb-2 text-xl font-bold">7. Sicherheit durch SSL/TLS-Verschlüsselung</h2>
              <p>
                Diese Website nutzt SSL/TLS-Verschlüsselung (erkennbar am “https://” in der Adresszeile). Dadurch wird
                gewährleistet, dass sämtliche übermittelten Daten verschlüsselt sind und nicht von Dritten eingesehen
                werden können.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
