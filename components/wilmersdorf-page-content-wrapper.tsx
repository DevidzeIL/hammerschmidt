import { Suspense } from 'react'
import { WilmersdorfPageContent } from './wilmersdorf-page-content'

export function WilmersdorfPageContentWrapper() {
  return (
    <Suspense fallback={
      <main className="flex-1">
        <div className="container py-12">
          <div className="h-96 bg-muted animate-pulse rounded-lg" />
        </div>
      </main>
    }>
      <WilmersdorfPageContent />
    </Suspense>
  )
}
