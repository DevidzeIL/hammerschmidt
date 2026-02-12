'use client'

import { useSearchParams } from 'next/navigation'
import { Locale } from '@/lib/translations'

export function useLanguage(): Locale {
  const searchParams = useSearchParams()
  return (searchParams.get('lang') || 'de') as Locale
}
