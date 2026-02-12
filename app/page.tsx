import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, Mail } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { GoogleMapsLink } from "@/components/google-maps-link"
import { ReviewsSection } from "@/components/reviews-section"
import { HomePageContent } from "@/components/home-page-content"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Schlüsseldienst Charlottenburg & Wilmersdorf – 24h Notdienst",
  description: "Schnelle Türöffnung bei zugefallener oder verschlossener Tür – rund um die Uhr erreichbar in Charlottenburg und Wilmersdorf.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Schlüsseldienst Charlottenburg & Wilmersdorf – 24h Notdienst",
    description: "Schnelle Türöffnung bei zugefallener oder verschlossener Tür – rund um die Uhr erreichbar.",
  },
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <HomePageContent />
      <SiteFooter />
    </div>
  )
}
