import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { WilmersdorfPageContent } from "@/components/wilmersdorf-page-content"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Schlüsseldienst Wilmersdorf – 24h Türöffnung",
  description: "Schlüsselnotdienst Wilmersdorf – Rund um die Uhr erreichbar. Schnelle Türöffnung ohne Beschädigung. Sofort vor Ort am Kurfürstendamm, Hohenzollerndamm, Fehrbelliner Platz und Bundesplatz.",
  alternates: {
    canonical: "/schluesseldienst-wilmersdorf",
  },
  openGraph: {
    title: "Schlüsseldienst Wilmersdorf – 24h Türöffnung",
    description: "Schlüsselnotdienst Wilmersdorf – Rund um die Uhr erreichbar. Schnelle Türöffnung ohne Beschädigung.",
  },
}

export default function WilmersdorfPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <WilmersdorfPageContent />
      <SiteFooter />
    </div>
  )
}
