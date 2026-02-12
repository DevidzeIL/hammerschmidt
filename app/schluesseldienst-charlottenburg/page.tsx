import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { CharlottenburgPageContent } from "@/components/charlottenburg-page-content"
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
      <SiteHeader />
      <CharlottenburgPageContent />
      <SiteFooter />
    </div>
  )
}
