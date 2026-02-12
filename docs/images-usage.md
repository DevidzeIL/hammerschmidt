# Использование изображений

## Папка для изображений

Изображения должны быть размещены в папке `public/images/`.

## Добавление изображений

1. Загрузите изображения в `public/images/`
2. Используйте компонент `ImageGallery` для отображения:

```tsx
import { ImageGallery } from "@/components/image-gallery"

<ImageGallery 
  images={[
    {
      src: "/images/photo1.jpg",
      alt: "Описание изображения 1",
    },
    {
      src: "/images/photo2.jpg",
      alt: "Описание изображения 2",
    }
  ]}
/>
```

## Рекомендации

- **Формат**: Используйте WebP или AVIF для лучшей оптимизации
- **Размер**: Оптимизируйте изображения перед загрузкой (рекомендуется max 1920px по ширине)
- **Alt-текст**: Всегда добавляйте описательный alt-текст для SEO и доступности
- **Количество**: Рекомендуется 3-6 изображений для галереи

## Пример использования на странице

```tsx
import { ImageGallery } from "@/components/image-gallery"

export default function Page() {
  const images = [
    { src: "/images/work1.jpg", alt: "Türöffnung in Charlottenburg" },
    { src: "/images/work2.jpg", alt: "Professionelle Arbeit" },
    { src: "/images/work3.jpg", alt: "Schneller Service" },
  ]

  return (
    <>
      {/* Ваш контент */}
      <ImageGallery images={images} />
    </>
  )
}
```

## Next.js Image Optimization

Next.js автоматически оптимизирует изображения из папки `public/`. Компонент `ImageGallery` использует Next.js `Image` компонент для автоматической оптимизации.
