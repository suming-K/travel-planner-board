import dynamic from 'next/dynamic'

const ChecklistPage = dynamic(
  () => import('@/features/checklist/ChecklistPage').then(
    (m) => ({ default: m.ChecklistPage })
  ),
  { ssr: false, loading: () => null }
)

// Tell Next.js which tripId values to pre-render
export function generateStaticParams(): Array<{ tripId: string }> {
  return [{ tripId: 'trip-ny-2026' }]
}

export default ChecklistPage
