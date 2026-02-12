import { SiteFooterWrapper } from "@/components/site-footer-wrapper"
import { SiteHeaderWrapper } from "@/components/site-header-wrapper"
import { CharlottenburgPageContentWrapper } from "@/components/charlottenburg-page-content-wrapper"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Schlüsseldienst Charlottenburg – 24h Türöffnung",
  description: "Schlüsseldienst Charlottenburg – Notdienst 24 Stunden. Schnelle Türöffnung ohne Beschädigung. Sofort vor Ort am Savignyplatz, Kantstraße, Lietzensee und Ernst-Reuter-Platz.",
  alternates: {
    canonical: "/schluesseldienst-charlottenburg",
  },
  openGraph: {
    title: "Schlüsseldienst Charlottenburg – 24h Türöffnung",
    description: "Schlüsseldienst Charlottenburg – Notdienst 24 Stunden. Schnelle Türöffnung ohne Beschädigung.",
  },
}

export default function CharlottenburgPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeaderWrapper />
      <CharlottenburgPageContentWrapper />
      <SiteFooterWrapper />
    </div>
  )
}
