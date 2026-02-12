import Image from "next/image"

interface ImageGalleryProps {
  images: Array<{
    src: string
    alt: string
    width?: number
    height?: number
  }>
  className?: string
}

export function ImageGallery({ images, className }: ImageGalleryProps) {
  if (images.length === 0) {
    return null
  }

  return (
    <section className={`py-12 border-t ${className || ""}`}>
      <div className="container max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-8">Unsere Arbeit</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <div 
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg border hover:shadow-lg transition-shadow"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
