import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'

interface DashboardProps { tripId: string }

const DashboardPage = dynamic<DashboardProps>(
  () => import('@/features/dashboard/DashboardPage').then(
    (m): { default: ComponentType<DashboardProps> } => ({ default: m.DashboardPage })
  ),
  { ssr: false, loading: () => null }
)

// Tell Next.js which tripId values to pre-render
export function generateStaticParams(): Array<{ tripId: string }> {
  return [{ tripId: 'trip-ny-2026' }]
}

export default function Page({ params }: { params: { tripId: string } }): JSX.Element {
  return <DashboardPage tripId={params.tripId} />
}
