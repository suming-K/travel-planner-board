import { MobileNav } from '@/components/layout/MobileNav'
import { OfflineBanner } from '@/components/layout/OfflineBanner'

interface TripLayoutProps {
  children: React.ReactNode
  params: { tripId: string }
}

export default function TripLayout({ children, params }: TripLayoutProps) {
  return (
    <div className="relative min-h-screen max-w-[430px] mx-auto">
      {/* Offline banner — fixed top, only visible when offline */}
      <OfflineBanner />

      {/* Page content — pb-[64px] prevents content hiding behind fixed nav */}
      <div className="pb-[64px]">{children}</div>

      {/* Fixed bottom nav */}
      <MobileNav tripId={params.tripId} />
    </div>
  )
}
