import { Suspense } from 'react'
import { CharlottenburgPageContent } from './charlottenburg-page-content'

export function CharlottenburgPageContentWrapper() {
  return (
    <Suspense fallback={
      <main className="flex-1">
        <div className="container py-12">
          <div className="h-96 bg-muted animate-pulse rounded-lg" />
        </div>
      </main>
    }>
      <CharlottenburgPageContent />
    </Suspense>
  )
}
