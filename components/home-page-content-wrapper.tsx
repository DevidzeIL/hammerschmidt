import { Suspense } from 'react'
import { HomePageContent } from './home-page-content'

export function HomePageContentWrapper() {
  return (
    <Suspense fallback={
      <div className="flex-1">
        <div className="container py-12">
          <div className="h-96 bg-muted animate-pulse rounded-lg" />
        </div>
      </div>
    }>
      <HomePageContent />
    </Suspense>
  )
}
