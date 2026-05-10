import dynamic from 'next/dynamic'

const PlacesPage = dynamic(
  () => import('@/features/places/PlacesPage').then(
    (m) => ({ default: m.PlacesPage })
  ),
  { ssr: false, loading: () => null }
)

export default PlacesPage
