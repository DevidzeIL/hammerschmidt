'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Globe } from 'lucide-react'
import { Locale } from '@/lib/translations'

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentLang = (searchParams.get('lang') || 'de') as Locale

  const switchLanguage = (lang: Locale) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('lang', lang)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <div className="flex border rounded-md overflow-hidden">
        <Button
          variant={currentLang === 'de' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => switchLanguage('de')}
          className="rounded-none border-0"
        >
          DE
        </Button>
        <Button
          variant={currentLang === 'en' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => switchLanguage('en')}
          className="rounded-none border-0"
        >
          EN
        </Button>
      </div>
    </div>
  )
}
