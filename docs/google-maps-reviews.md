# Парсинг отзывов из Google Maps

## Текущая реализация

Сейчас отзывы отображаются статически в компоненте `ReviewsSection`. Они хранятся в файле `components/reviews-section.tsx` и могут быть обновлены вручную.

## Автоматический парсинг (опционально)

Для автоматического парсинга отзывов из Google Maps потребуется:

### 1. Google Maps Places API

1. Получите API ключ в [Google Cloud Console](https://console.cloud.google.com/)
2. Включите Places API
3. Добавьте ключ в переменные окружения: `GOOGLE_MAPS_API_KEY`

### 2. Backend API Endpoint

Создайте файл `app/api/reviews/route.ts`:

```typescript
import { NextResponse } from 'next/server'

const PLACE_ID = 'YOUR_PLACE_ID' // Из Google Maps URL

export async function GET() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY
  
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }

  try {
    // Получаем информацию о месте
    const placeResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${apiKey}`
    )
    
    const placeData = await placeResponse.json()
    
    if (placeData.status !== 'OK') {
      return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
    }

    // Форматируем отзывы
    const reviews = placeData.result.reviews?.map((review: any) => ({
      author: review.author_name,
      rating: review.rating,
      text: review.text,
      date: new Date(review.time * 1000).toISOString().split('T')[0]
    })) || []

    return NextResponse.json({ reviews })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

### 3. Обновление компонента

Измените `ReviewsSection` для загрузки отзывов с API:

```typescript
// В компоненте используйте fetch или SWR
const { data } = useSWR('/api/reviews', fetcher)
const reviews = data?.reviews || defaultReviews
```

### 4. Кэширование

Рекомендуется кэшировать отзывы, чтобы не превышать лимиты API:

- Используйте Next.js revalidation
- Или Redis для кэширования
- Или файловый кэш

### 5. Альтернатива: Google My Business API

Для более надежного решения используйте Google My Business API, но он требует верификации бизнеса.

## Рекомендации

- Обновляйте отзывы не чаще раза в час
- Кэшируйте результаты
- Обрабатывайте ошибки API
- Используйте fallback на статические отзывы при ошибках
