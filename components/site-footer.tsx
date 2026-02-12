'use client'

import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"
import { getTranslations } from "@/lib/translations"

export function SiteFooter() {
  const lang = useLanguage()
  const t = getTranslations(lang)

  return (
    <footer className="border-t bg-background mt-auto">
      <div className="container py-6">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-muted-foreground">
          <Link 
            href={`/impressum?lang=${lang}`}
            className="hover:text-foreground transition-colors"
          >
            {t.impressum}
          </Link>
          <span className="hidden sm:inline">|</span>
          <Link 
            href={`/datenschutz?lang=${lang}`}
            className="hover:text-foreground transition-colors"
          >
            {t.datenschutz}
          </Link>
        </div>
      </div>
    </footer>
  )
}
