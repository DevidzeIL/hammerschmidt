import { Suspense } from 'react'
import { SiteFooter } from './site-footer'

export function SiteFooterWrapper() {
  return (
    <Suspense fallback={
      <footer className="border-t bg-background mt-auto">
        <div className="container py-6">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-muted-foreground">
            <div className="h-4 w-20 bg-muted animate-pulse rounded" />
            <span className="hidden sm:inline">|</span>
            <div className="h-4 w-32 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </footer>
    }>
      <SiteFooter />
    </Suspense>
  )
}
