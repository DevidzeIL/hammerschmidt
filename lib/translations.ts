export type Locale = 'de' | 'en'

export const translations = {
  de: {
    // Navigation
    impressum: 'Impressum',
    datenschutz: 'Datenschutzerklärung',
    
    // Homepage
    heroTitle: 'Schlüsseldienst Charlottenburg & Wilmersdorf – 24h Notdienst',
    heroSubtitle: 'Schnelle Türöffnung bei zugefallener oder verschlossener Tür – rund um die Uhr erreichbar.',
    callNow: 'Jetzt anrufen',
    sendEmail: 'E-Mail senden',
    charlottenburgTitle: 'Schlüsseldienst Charlottenburg',
    charlottenburgDesc: '24 Stunden Notdienst für schnelle Türöffnung in Charlottenburg',
    wilmersdorfTitle: 'Schlüsseldienst Wilmersdorf',
    wilmersdorfDesc: 'Rund um die Uhr erreichbar für Türöffnung in Wilmersdorf',
    
    // Google Maps
    location: 'Standort',
    viewOnGoogleMaps: 'Auf Google Maps anzeigen',
    
    // Reviews
    customerReviews: 'Kundenbewertungen',
    reviewsSubtitle: 'Was unsere Kunden über unseren Service sagen',
    moreReviews: 'Mehr Bewertungen auf Google Maps',
    viewAllReviews: 'Alle Bewertungen anzeigen',
    
    // Contact
    contact: 'Kontakt',
    phone: 'Telefon',
    email: 'E-Mail',
    
    // Review buttons
    showMore: 'Mehr',
    showLess: 'Weniger',
  },
  en: {
    // Navigation
    impressum: 'Imprint',
    datenschutz: 'Privacy Policy',
    
    // Homepage
    heroTitle: 'Locksmith Charlottenburg & Wilmersdorf – 24h Emergency Service',
    heroSubtitle: 'Fast door opening for locked or closed doors – available around the clock.',
    callNow: 'Call Now',
    sendEmail: 'Send Email',
    charlottenburgTitle: 'Locksmith Charlottenburg',
    charlottenburgDesc: '24-hour emergency service for fast door opening in Charlottenburg',
    wilmersdorfTitle: 'Locksmith Wilmersdorf',
    wilmersdorfDesc: 'Available around the clock for door opening in Wilmersdorf',
    
    // Google Maps
    location: 'Location',
    viewOnGoogleMaps: 'View on Google Maps',
    
    // Reviews
    customerReviews: 'Customer Reviews',
    reviewsSubtitle: 'What our customers say about our service',
    moreReviews: 'More reviews on Google Maps',
    viewAllReviews: 'View all reviews',
    
    // Contact
    contact: 'Contact',
    phone: 'Phone',
    email: 'Email',
    
    // Review buttons
    showMore: 'More',
    showLess: 'Less',
  }
} as const

export function getTranslations(locale: Locale) {
  return translations[locale]
}
