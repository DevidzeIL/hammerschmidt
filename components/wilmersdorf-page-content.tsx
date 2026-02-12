'use client'

import { Button } from "@/components/ui/button"
import { Phone, Mail } from "lucide-react"
import { GoogleMapsLink } from "@/components/google-maps-link"
import { ReviewsSection } from "@/components/reviews-section"
import { useLanguage } from "@/hooks/use-language"
import { getTranslations } from "@/lib/translations"

export function WilmersdorfPageContent() {
  const lang = useLanguage()
  const t = getTranslations(lang)

  return (
    <main className="flex-1">
      <article className="container py-12 md:py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">
          {lang === 'en'
            ? 'Locksmith Wilmersdorf – Available Around the Clock'
            : 'Schlüsselnotdienst Wilmersdorf – Rund um die Uhr erreichbar'
          }
        </h1>

        <div className="prose prose-lg max-w-none space-y-6">
          <p className="text-lg text-muted-foreground">
            {lang === 'en'
              ? 'Locked out in Wilmersdorf? Our locksmith service is available 24 hours a day. We open your closed or locked door quickly and without damage – even at night, on weekends and holidays.'
              : 'Ausgesperrt in Wilmersdorf? Unser Schlüsseldienst ist 24 Stunden am Tag für Sie da. Wir öffnen Ihre zugefallene oder verschlossene Tür schnell und ohne Beschädigung – auch nachts, am Wochenende und an Feiertagen.'
            }
          </p>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">
              {lang === 'en' ? 'Fast Door Opening in Wilmersdorf' : 'Schnelle Türöffnung in Wilmersdorf'}
            </h2>
            <p>
              {lang === 'en'
                ? 'A locked door is always an emergency. Whether you forgot your keys, the door closed, or the lock is defective – our locksmith service in Wilmersdorf helps you immediately. We reach you quickly at Kurfürstendamm, Hohenzollerndamm, Fehrbelliner Platz or Bundesplatz.'
                : 'Eine ausgesperrte Tür ist immer ein Notfall. Ob Sie die Schlüssel vergessen haben, die Tür zugefallen ist oder das Schloss defekt ist – unser Schlüsseldienst in Wilmersdorf hilft Ihnen sofort. Wir erreichen Sie schnell am Kurfürstendamm, am Hohenzollerndamm, am Fehrbelliner Platz oder am Bundesplatz.'
              }
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">
              {lang === 'en' ? 'Transparent Prices' : 'Transparente Preise'}
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
