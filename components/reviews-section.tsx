'use client'

import { useState } from "react"
import { Star, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Locale } from "@/lib/translations"
import { getTranslations } from "@/lib/translations"

interface Review {
  author: string
  rating: number
  text: string
  date: string
}

interface ReviewsSectionProps {
  reviews?: Review[]
  googleMapsUrl?: string
  locale?: Locale
}

// ⚠️ ВАЖНО: Отзывы НЕ парсятся автоматически из Google Maps!
// Это статические отзывы, которые можно обновлять вручную.
// Для автоматического парсинга нужен Google Places API ключ и backend.
// См. документацию: docs/google-maps-reviews.md
//
// Статические отзывы (можно обновлять вручную):
const defaultReviews: Review[] = [
        {
          author: "Filip Peretz",
          rating: 5,
          text: "Reliable, fast and professional",
          date: "2025-12-12"
        },
        {
          author: "Mustafa Bati",
          rating: 5,
          text: "Hatte ein kleines Problem mit der Tür und wollte es schnell gelöst haben. Super Kommunikation, zügig vor Ort und sauber gearbeitet. Genau so wünscht man sich das 👍",
          date: "2025-12-12"
        },
        {
          author: "Katja Barth",
          rating: 5,
          text: "Ich habe meine Schlüssel am Wittenbergplatz in Berlin verloren und war total gestresst. Er ging sofort ans Telefon, war super respektvoll, ruhig und hat alles verständlich erklärt. Er meinte sogar, ich soll mich irgendwo warm hinsetzen, während er unterwegs war. Er war bereits in der Nähe und kam schnell mit seiner Werkzeugtasche. Türnotöffnung sauber und ohne Schaden erfolgt, fairer Preis genau wie am Telefon abgesprochen. Sehr menschlicher, professioneller und vertrauenswürdiger Schlüsseldienst in Berlin. Kann nur weiterempfehlen!",
          date: "2026-01-22"
        },
        {
          author: "An We",
          rating: 5,
          text: "Im Schöneberg Schlüssel verloren, konnte nicht rein. Paul war schnell da, hat sauber gebohrt und den Zylinder direkt getauscht. Preis wurde vorab am Telefon abgesprochen, klar und direkt.",
          date: "2026-01-12"
        },
        {
          author: "Ritika Sodhi",
          rating: 5,
          text: "Er kam extra sofort mit Uber von Charlottenburg nach Spandau, hatte einen wirklich schwierigen Fall und hat trotzdem keinen Aufpreis verlangt. Sehr kompetent und extrem freundlich, als Frau habe ich mich jederzeit sicher, ernst genommen und respektiert gefühlt. Vielen Dank für den großartigen Service in Berlin! 🔑🙏",
          date: "2026-01-15"
        },
        {
          author: "Chili Fengler",
          rating: 5,
          text: "Spät Abends und trotzdem mega schnelle und unkomplizierte Abwicklung zu einem absolut fairen Preis, vielen vielen Dank für die Hilfe in Not!",
          date: "2026-01-29"
        },
        {
          author: "Mounia Kramcha",
          rating: 5,
          text: "Super schneller und professioneller Service – bin sehr zufrieden und kann diesen Schlüsseldienst nur weiterempfehlen. :)",
          date: "2026-01-12"
        },
        {
          author: "Pascal Koslowski",
          rating: 5,
          text: "Günstig, zuverlässig und super schnell Charlottenburg / Wilmersdorf",
          date: "2026-01-29"
        },
        {
          author: "E. H.",
          rating: 5,
          text: "Wir waren total zufrieden! Sehr schnell vor Ort, super freundlich und absolut fairer Preis. Es war ein komplizierter Fall mit einem alten Küchenschrank, aber er hat nicht aufgegeben und alles top gelöst. Klare Weiterempfehlung!",
          date: "2026-02-12"
        },
        {
          author: "William Lin",
          rating: 5,
          text: "Der Schlüssel für unsere Mülltonne war verloren gegangen, daher habe ich Herrn Schmidt angerufen. Er war sehr freundlich und innerhalb von 15 Minuten vor Ort. Wir sind sehr zufrieden und werden jederzeit wieder auf seine Dienste zurückgreifen!",
          date: "2026-02-11"
        },
        {
          author: "Stratulat Alexandru",
          rating: 5,
          text: "Schnell & unproblematisch",
          date: "2026-02-10"
        },
        {
          author: "Simo279",
          rating: 5,
          text: "Sehr seriöser und zuverlässiger Schlüsseldienst. Er war sehr schnell bei mir vor Ort, freundlich und äußerst hilfsbereit. Die Arbeit wurde professionell, klug und sauber erledigt. Ein Dienst, den man jederzeit weiterempfehlen kann. Vielen Dank",
          date: "2026-02-10"
        },
        {
          author: "Felix Roth",
          rating: 5,
          text: "Schnell und zuverlässig bei Türen in Charlottenburg.",
          date: "2026-02-08"
        },
        {
          author: "Julia Roth",
          rating: 5,
          text: "Wohnungstür zugefallen im Charlottenburg. Sehr zuverlässig und sauber. Alles sehr sehr gut geklappt. Schnell, nicht mal 10min gewartet. Guter Preis.",
          date: "2026-02-08"
        }
      ]


// Примечание: Для автоматического парсинга отзывов из Google Maps потребуется:
// 1. Google Maps Places API ключ
// 2. Backend API endpoint для парсинга (например, /api/reviews)
// 3. Кэширование данных (Redis или файловый кэш)
// 
// Пока используем статические отзывы, которые можно обновлять вручную
// или через периодический скрипт, который будет парсить Google Maps API

const MAX_TEXT_LENGTH = 150 // Максимальная длина текста до обрезки

function ReviewCard({ review, index, locale }: { review: Review; index: number; locale: Locale }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const t = getTranslations(locale)
  const shouldTruncate = review.text.length > MAX_TEXT_LENGTH
  const displayText = isExpanded || !shouldTruncate 
    ? review.text 
    : `${review.text.slice(0, MAX_TEXT_LENGTH)}...`

  return (
    <div 
      className="p-6 md:p-7 lg:p-8 border rounded-lg bg-card hover:shadow-md transition-shadow flex flex-col min-h-[200px]"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < review.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground ml-2">
          {review.date}
        </span>
      </div>
      <p className="text-sm md:text-base mb-3 leading-relaxed flex-grow">{displayText}</p>
      {shouldTruncate && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="self-start mt-2 h-auto p-1 text-xs text-primary hover:text-primary/80"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-3 w-3 mr-1" />
              {t.showLess}
            </>
          ) : (
            <>
              <ChevronDown className="h-3 w-3 mr-1" />
              {t.showMore}
            </>
          )}
        </Button>
      )}
      <p className="text-sm font-semibold text-muted-foreground mt-auto pt-2">
        — {review.author}
      </p>
    </div>
  )
}

export function ReviewsSection({ reviews = defaultReviews, googleMapsUrl, locale = 'de' }: ReviewsSectionProps) {
  const t = getTranslations(locale)
  
  return (
    <section className="py-12 border-t">
      <div className="container max-w-7xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">{t.customerReviews}</h2>
          <p className="text-muted-foreground">
            {t.reviewsSubtitle}
          </p>
        </div>

        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} index={index} locale={locale} />
          ))}
        </div>

        {googleMapsUrl && (
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              {t.moreReviews}
            </p>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-sm font-medium"
            >
              {t.viewAllReviews} →
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
