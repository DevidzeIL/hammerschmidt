'use client'

import { Button } from "@/components/ui/button"
import { Phone, Mail } from "lucide-react"
import { GoogleMapsLink } from "@/components/google-maps-link"
import { ReviewsSection } from "@/components/reviews-section"
import { useLanguage } from "@/hooks/use-language"
import { getTranslations } from "@/lib/translations"

export function CharlottenburgPageContent() {
  const lang = useLanguage()
  const t = getTranslations(lang)

  // Для страниц районов пока оставляем немецкий контент, но добавляем переключатель языка
  // В будущем можно добавить полные переводы
  
  return (
    <main className="flex-1">
      <article className="container py-12 md:py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">
          {lang === 'en' 
            ? 'Locksmith Charlottenburg – 24 Hour Emergency Service'
            : 'Schlüsseldienst Charlottenburg – Notdienst 24 Stunden'
          }
        </h1>

        <div className="prose prose-lg max-w-none space-y-6">
          <p className="text-lg text-muted-foreground">
            {lang === 'en'
              ? 'Locked out? Door closed or locked? Our locksmith service in Charlottenburg is available around the clock – even at night, on weekends and holidays. We open your door quickly and without damage.'
              : 'Sie haben sich ausgesperrt? Die Tür ist zugefallen oder abgeschlossen? Unser Schlüsseldienst in Charlottenburg ist rund um die Uhr für Sie da – auch nachts, am Wochenende und an Feiertagen. Wir öffnen Ihre Tür schnell und ohne Beschädigung.'
            }
          </p>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">
              {lang === 'en' ? 'Open Locked Door in Charlottenburg' : 'Zugefallene Tür öffnen in Charlottenburg'}
            </h2>
            <p>
              {lang === 'en'
                ? 'A closed door is one of the most common emergencies in everyday life. Whether you forgot your keys or the door accidentally closed – our locksmith service in Charlottenburg is on site immediately. We reach you quickly at Savignyplatz, Kantstraße, Lietzensee or Ernst-Reuter-Platz.'
                : 'Eine zugefallene Tür ist eine der häufigsten Notfälle im Alltag. Ob Sie die Schlüssel vergessen haben oder die Tür versehentlich ins Schloss gefallen ist – unser Schlüsseldienst in Charlottenburg ist sofort vor Ort. Wir erreichen Sie schnell am Savignyplatz, in der Kantstraße, am Lietzensee oder am Ernst-Reuter-Platz.'
              }
            </p>
            <p>
              {lang === 'en'
                ? 'Our experienced technicians open your door without damage. We use modern methods and tools to safely open your door without damaging the lock or door. This saves you time and money.'
                : 'Unsere erfahrenen Techniker öffnen Ihre Tür ohne Beschädigung. Wir verwenden moderne Methoden und Werkzeuge, um Ihre Tür sicher zu öffnen, ohne das Schloss oder die Tür zu beschädigen. So sparen Sie Zeit und Geld.'
              }
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">
              {lang === 'en' ? 'Prices & Transparency' : 'Preise & Transparenz'}
            </h2>
            <p>
              {lang === 'en'
                ? 'Transparency is important to us. Before we start work, we inform you about the expected costs. Our prices are fair and transparent. We do not charge hidden costs or excessive emergency service fees.'
                : 'Transparenz ist uns wichtig. Bevor wir mit der Arbeit beginnen, informieren wir Sie über die voraussichtlichen Kosten. Unsere Preise sind fair und transparent. Wir berechnen keine versteckten Kosten und keine überhöhten Notdienst-Gebühren.'
              }
            </p>
          </section>

          <section className="mt-12 p-6 bg-muted rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">{t.contact}</h2>
            <p className="mb-4">
              <strong>Paul Gammershmidt</strong><br />
              Leibnizstr. 25<br />
              10625 Berlin
            </p>
            <p className="mb-4">
              <strong>{t.phone}:</strong> <a href="tel:+4915215033843" className="text-primary hover:underline">+49 152 15033843</a><br />
              <strong>{t.email}:</strong> <a href="mailto:info@hammerschmidt.com" className="text-primary hover:underline">info@hammerschmidt.com</a>
            </p>
            <div className="flex flex-col gap-3 sm:flex-row mt-6">
              <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
                <a href="tel:+4915215033843">
                  <Phone className="mr-2 h-4 w-4" />
                  {t.callNow}
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="mailto:info@hammerschmidt.com">
                  <Mail className="mr-2 h-4 w-4" />
                  {t.sendEmail}
                </a>
              </Button>
            </div>
          </section>
        </div>
      </article>

      {/* Google Maps */}
      <section className="container py-12 border-t">
        <div className="max-w-4xl mx-auto">
          <GoogleMapsLink 
            url="https://maps.app.goo.gl/tdw1sw71d1FxZ67q9"
            address="Leibnizstr. 25, 10625 Berlin"
            locale={lang}
          />
        </div>
      </section>

      {/* Reviews */}
      <ReviewsSection 
        googleMapsUrl="https://maps.app.goo.gl/tdw1sw71d1FxZ67q9"
        locale={lang}
      />
    </main>
  )
}
