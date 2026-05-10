import dynamic from 'next/dynamic'

const PlacesPage = dynamic(
  () => import('@/features/places/PlacesPage').then(
    (m) => ({ default: m.PlacesPage })
  ),
  { ssr: false, loading: () => null }
)

// Tell Next.js which tripId values to pre-render
export function generateStaticParams(): Array<{ tripId: string }> {
  return [{ tripId: 'trip-ny-2026' }]
}

export default PlacesPage
