import dynamic from 'next/dynamic'

const MemoriesPage = dynamic(
  () => import('@/features/memories/MemoriesPage').then(
    (m) => ({ default: m.MemoriesPage })
  ),
  { ssr: false, loading: () => null }
)

// Tell Next.js which tripId values to pre-render
export function generateStaticParams(): Array<{ tripId: string }> {
  return [{ tripId: 'trip-ny-2026' }]
}

export default MemoriesPage
