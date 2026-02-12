'use client'

import { Phone } from 'lucide-react'
import { LanguageSwitcher } from './language-switcher'
import { ThemeToggle } from './theme-toggle'
import { useLanguage } from '@/hooks/use-language'
import { getTranslations } from '@/lib/translations'
import { Button } from '@/components/ui/button'

export function SiteHeader() {
  const lang = useLanguage()
  const t = getTranslations(lang)
  const phoneNumber = '+4915215033843'
  const phoneDisplay = '+49 152 15033843'

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container flex items-center justify-between h-16 gap-4">
        <div className="font-bold text-xl">
          Hammerschmidt
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Номер телефона */}
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden sm:flex items-center gap-2 text-base font-medium hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950 dark:hover:text-red-400"
          >
            <a href={`tel:${phoneNumber}`} className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>{phoneDisplay}</span>
            </a>
          </Button>
          
          {/* Мобильная версия - только иконка */}
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="sm:hidden hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950 dark:hover:text-red-400"
          >
            <a href={`tel:${phoneNumber}`} aria-label={t.callNow}>
              <Phone className="h-5 w-5" />
            </a>
          </Button>
          
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}
