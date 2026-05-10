import dynamic from 'next/dynamic'

const ReservationsPage = dynamic(
  () => import('@/features/reservations/ReservationsPage').then(
    (m) => ({ default: m.ReservationsPage })
  ),
  { ssr: false, loading: () => null }
)

// Tell Next.js which tripId values to pre-render
export function generateStaticParams(): Array<{ tripId: string }> {
  return [{ tripId: 'trip-ny-2026' }]
}

export default ReservationsPage
