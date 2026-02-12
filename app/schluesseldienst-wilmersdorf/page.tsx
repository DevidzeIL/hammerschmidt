import { SiteFooterWrapper } from "@/components/site-footer-wrapper"
import { SiteHeaderWrapper } from "@/components/site-header-wrapper"
import { WilmersdorfPageContentWrapper } from "@/components/wilmersdorf-page-content-wrapper"
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
      <SiteHeaderWrapper />
      <WilmersdorfPageContentWrapper />
      <SiteFooterWrapper />
    </div>
  )
}
