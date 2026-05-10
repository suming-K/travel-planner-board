import dynamic from 'next/dynamic'

const ReservationsPage = dynamic(
  () => import('@/features/reservations/ReservationsPage').then(
    (m) => ({ default: m.ReservationsPage })
  ),
  { ssr: false, loading: () => null }
)

export default ReservationsPage
