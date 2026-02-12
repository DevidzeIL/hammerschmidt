import { SiteFooterWrapper } from "@/components/site-footer-wrapper"
import { SiteHeaderWrapper } from "@/components/site-header-wrapper"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung von Hammerschmidt Schlüsseldienst Berlin",
  robots: {
    index: false,
    follow: false,
  },
}

export default function DatenschutzPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeaderWrapper />
      <main className="flex-1">
        <article className="container py-12 md:py-16 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Datenschutzerklärung</h1>

          <div className="prose prose-lg max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Datenschutz auf einen Blick</h2>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Allgemeine Hinweise</h3>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Datenerfassung auf dieser Website</h3>
              <p>
                <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.
              </p>
              <p>
                <strong>Wie erfassen wir Ihre Daten?</strong><br />
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
              </p>
              <p>
                <strong>Was nutzen wir Ihre Daten?</strong><br />
                Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
              </p>
              <p>
                <strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong><br />
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Hosting</h2>
              <p>
                Diese Website wird über einen europäischen Hosting-Anbieter betrieben.
                Server-Logfiles werden aus technischen Gründen gespeichert und dienen der Sicherheit der Website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Datenschutz</h3>
              <p>
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzbestimmungen sowie dieser Datenschutzerklärung.
              </p>
              <p>
                Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
              </p>
              <p>
                Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Hinweis zur verantwortlichen Stelle</h3>
              <p>
                Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
              </p>
              <p>
                <strong>Paul Gammershmidt</strong><br />
                Leibnizstr. 25<br />
                10625 Berlin
              </p>
              <p>
                <strong>Telefon:</strong> <a href="tel:+4915215033843" className="text-primary hover:underline">+49 152 15033843</a><br />
                <strong>E-Mail:</strong> <a href="mailto:info@hammerschmidt.com" className="text-primary hover:underline">info@hammerschmidt.com</a>
              </p>
              <p>
                Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Zugriffsdaten</h2>
              <p>
                Bei jedem Zugriff auf diese Website werden automatisch Informationen übertragen und in sogenannten Server-Logfiles gespeichert. Dabei handelt es sich um:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Browsertyp und Browserversion</li>
                <li>verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>
              <p>
                Diese Daten werden nicht mit anderen Datenquellen zusammengeführt. Die Speicherung erfolgt aus technischen Gründen und dient der Sicherheit der Website. Eine Auswertung dieser Daten erfolgt nicht.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Kontakt per Telefon / E-Mail</h2>
              <p>
                Wenn Sie uns per Telefon oder E-Mail kontaktieren, werden Ihre Angaben aus dem Anruf oder der E-Mail inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>
              <p>
                Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags oder der Durchführung vorvertraglicher Maßnahmen zusammenhängt. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), sofern diese abgefragt wurde.
              </p>
              <p>
                Die von Ihnen an uns per Kontaktanfragen übersandten Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere gesetzliche Aufbewahrungsfristen – bleiben unberührt.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Keine Formulare</h2>
              <p>
                Diese Website verwendet keine Kontaktformulare. Der Kontakt erfolgt ausschließlich per Telefon oder E-Mail.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Keine Benutzerkonten</h2>
              <p>
                Diese Website bietet keine Möglichkeit zur Registrierung oder zur Anlage von Benutzerkonten. Es werden keine Benutzerdaten gespeichert.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Keine Tracking-Tools</h2>
              <p>
                Diese Website verwendet keine Tracking-Tools, keine Analyse-Software und keine Cookies zu Analysezwecken. Es werden keine Daten an Drittanbieter übermittelt.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Ihre Rechte</h2>
              <p>
                Sie haben das Recht, jederzeit Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten zu erhalten. Außerdem haben Sie das Recht auf Berichtigung, Löschung oder Einschränkung der Verarbeitung Ihrer personenbezogenen Daten sowie ein Widerspruchsrecht gegen die Verarbeitung sowie das Recht auf Datenübertragbarkeit.
              </p>
              <p>
                Sofern Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese jederzeit widerrufen. Der Widerruf wirkt für die Zukunft.
              </p>
              <p>
                Sie haben außerdem das Recht, bei einer Aufsichtsbehörde Beschwerde einzulegen, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen die DSGVO verstößt.
              </p>
            </section>
          </div>
        </article>
      </main>
      <SiteFooterWrapper />
    </div>
  )
}
