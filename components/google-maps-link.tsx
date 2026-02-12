'use client'

import { Button } from "@/components/ui/button"
import { MapPin, ExternalLink } from "lucide-react"
import { Locale } from "@/lib/translations"
import { getTranslations } from "@/lib/translations"

interface GoogleMapsLinkProps {
  url: string
  address?: string
  className?: string
  locale?: Locale
}

export function GoogleMapsLink({ url, address, className, locale = 'de' }: GoogleMapsLinkProps) {
  const t = getTranslations(locale)
  
  // Используем адрес для создания embed карты
  // Простой способ без API ключа - используем параметр output=embed
  const addressQuery = address || 'Leibnizstr. 25, 10625 Berlin'
  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(addressQuery)}&output=embed`
  
  return (
    <div className={`space-y-4 ${className || ""}`}>
      <div className="p-6 border rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
              <MapPin className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{t.location}</h3>
            {address && (
              <p className="text-sm text-muted-foreground">{address}</p>
            )}
          </div>
        </div>
        
        {/* Встроенная карта */}
        <div className="w-full h-[400px] rounded-lg overflow-hidden border shadow-sm bg-gray-100">
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
            title={t.location}
          />
        </div>
        
        {/* Кнопка для открытия в полном размере */}
        <div className="mt-4">
          <Button 
            asChild 
            variant="outline" 
            className="bg-white hover:bg-blue-50 border-blue-300 w-full sm:w-auto"
          >
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <span>{t.viewOnGoogleMaps}</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
