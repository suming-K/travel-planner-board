'use client'

import { MobileNav } from '@/components/layout/MobileNav'
import { OfflineBanner } from '@/components/layout/OfflineBanner'

interface TripLayoutProps {
  children: React.ReactNode
  params: { tripId: string }
}

// 'use client' required — children include Zustand store consumers
// and usePathname/useAppStore hooks that must not run on server
export default function TripLayout({ children, params }: TripLayoutProps): JSX.Element {
  return (
    <div className="relative min-h-screen max-w-[430px] mx-auto">
      <OfflineBanner />
      <div className="pb-[64px]">{children}</div>
      <MobileNav tripId={params.tripId} />
    </div>
  )
}
