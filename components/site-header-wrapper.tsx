import { Suspense } from 'react'
import { SiteHeader } from './site-header'

export function SiteHeaderWrapper() {
  return (
    <Suspense fallback={
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16 gap-4">
          <div className="font-bold text-xl">Hammerschmidt</div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="h-9 w-9" />
            <div className="h-9 w-20" />
          </div>
        </div>
      </header>
    }>
      <SiteHeader />
    </Suspense>
  )
}
