import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Script from "next/script"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://hammerschmidt.com"),
  title: {
    default: "Schlüsseldienst Charlottenburg & Wilmersdorf – 24h Notdienst",
    template: "%s | Hammerschmidt Schlüsseldienst Berlin"
  },
  description: "Schnelle Türöffnung bei zugefallener oder verschlossener Tür – rund um die Uhr erreichbar in Charlottenburg und Wilmersdorf.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Hammerschmidt Schlüsseldienst Berlin",
  },
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Locksmith",
  "name": "Hammerschmidt Schlüsseldienst Berlin",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Leibnizstr. 25",
    "postalCode": "10625",
    "addressLocality": "Berlin",
    "addressCountry": "DE"
  },
  "telephone": "+4915215033843"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
