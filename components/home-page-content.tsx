'use client'

import { Button } from "@/components/ui/button"
import { Phone, Mail } from "lucide-react"
import { GoogleMapsLink } from "@/components/google-maps-link"
import { ReviewsSection } from "@/components/reviews-section"
import { ServicesSection } from "@/components/services-section"
import { useLanguage } from "@/hooks/use-language"
import { getTranslations } from "@/lib/translations"

export function HomePageContent() {
  const lang = useLanguage()
  const t = getTranslations(lang)

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="container py-16 md:py-24 lg:py-32">
        <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {t.heroTitle}
          </h1>
          <p className="max-w-[700px] text-lg sm:text-xl text-muted-foreground">
            {t.heroSubtitle}
          </p>
          <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white">
              <a href="tel:+4915215033843">
                <Phone className="mr-2 h-4 w-4" />
                {t.callNow}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="mailto:info@hammerschmidt.com">
                <Mail className="mr-2 h-4 w-4" />
                {t.sendEmail}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection locale={lang} />

      {/* Google Maps */}
      <section className="container py-12 border-t">
        <div className="max-w-2xl mx-auto">
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
