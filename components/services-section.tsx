'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ImageCarousel } from '@/components/image-carousel'
import { Locale } from '@/lib/translations'
import { getTranslations } from '@/lib/translations'

interface Service {
  title: string
  description: string
  price: number
  currency: string
}

interface ServicesSectionProps {
  locale?: Locale
}

const services: Service[] = [
  {
    title: "Zugefallene Tür öffnen – Charlottenburg",
    description: "Notöffnung von zugefallenen Wohnungs- und Haustüren (nicht abgeschlossen). Schnelle Verfügbarkeit in Charlottenburg, fachgerechte und möglichst beschädigungsfreie Ausführung zu transparentem Festpreis. Nachts ab 00:00 Uhr pauschal +20 €. Keine Anfahrtskosten.",
    price: 70.00,
    currency: "EUR"
  },
  {
    title: "Abgeschlossene Tür öffnen – Charlottenburg",
    description: "Notöffnung von abgeschlossenen Wohnungs- und Haustüren. Fachgerechte Ausführung mit professionellem Werkzeug, transparente Festpreise und schnelle Verfügbarkeit in Charlottenburg. Nachts ab 00:00 Uhr pauschal +20 €. Keine Anfahrtskosten.",
    price: 130.00,
    currency: "EUR"
  },
  {
    title: "Zugefallene Tür öffnen – Angrenzende Bezirke",
    description: "(inkl. Anfahrt) Notöffnung von zugefallenen Wohnungs- und Haustüren außerhalb von Charlottenburg. Fachgerechte Ausführung, transparente Festpreise und zuverlässige Verfügbarkeit in weiteren Berliner Bezirken. Nachts ab 00:00 Uhr pauschal +20 €. Anfahrtskosten inklusive.",
    price: 90.00,
    currency: "EUR"
  },
  {
    title: "Abgeschlossene Tür öffnen – Angrenzende Bezirke",
    description: "(inkl. Anfahrt) Notöffnung von abgeschlossenen Wohnungs- und Haustüren außerhalb von Charlottenburg. Fachgerechte Ausführung, transparente Festpreise und zuverlässige Verfügbarkeit in weiteren Berliner Bezirken. Nachts ab 00:00 Uhr pauschal +20 €. Anfahrtskosten inklusive.",
    price: 150.00,
    currency: "EUR"
  }
]

export function ServicesSection({ locale = 'de' }: ServicesSectionProps) {
  const t = getTranslations(locale)

  // Список изображений для карусели
  const carouselImages = [
    '/images/person.jpg',
    '/images/photo_2026-01-20 20.25.03.jpeg',
    '/images/c9601ae2-4cb1-4dad-924f-675bd5f1531e.png',
  ]

  return (
    <section className="container py-12 border-t">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">
          {locale === 'en' ? 'Our Services & Prices' : 'Unsere Leistungen & Preise'}
        </h2>
        <p className="text-muted-foreground">
          {locale === 'en' 
            ? 'Transparent pricing for all our services'
            : 'Transparente Festpreise für alle unsere Leistungen'
          }
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-6xl mx-auto">
        {/* Карусель изображений слева */}
        <div className="flex-shrink-0 w-full sm:w-64 lg:w-64 xl:w-72 mx-auto lg:mx-0 max-w-xs sm:max-w-none">
          <ImageCarousel
            images={carouselImages}
            alt={locale === 'en' ? 'Professional locksmith service' : 'Professioneller Schlüsseldienst'}
          />
        </div>

        {/* Карточки услуг справа */}
        <div className="flex-1 grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-2">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg md:text-xl mb-2 leading-tight">{service.title}</CardTitle>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
                    {service.price.toFixed(2)} €
                  </span>
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    {locale === 'en' ? 'fixed price' : 'Festpreis'}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <CardDescription className="text-xs sm:text-sm leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
