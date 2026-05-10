import dynamic from 'next/dynamic'

const TransportPage = dynamic(
  () => import('@/features/transport/TransportPage').then(
    (m) => ({ default: m.TransportPage })
  ),
  { ssr: false, loading: () => null }
)

// Tell Next.js which tripId values to pre-render
export function generateStaticParams(): Array<{ tripId: string }> {
  return [{ tripId: 'trip-ny-2026' }]
}

export default TransportPage
