import { SiteFooterWrapper } from "@/components/site-footer-wrapper"
import { SiteHeaderWrapper } from "@/components/site-header-wrapper"
import { HomePageContentWrapper } from "@/components/home-page-content-wrapper"
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
      <SiteHeaderWrapper />
      <HomePageContentWrapper />
      <SiteFooterWrapper />
    </div>
  )
}
