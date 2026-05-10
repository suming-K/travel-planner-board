import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'

interface DashboardProps { tripId: string }

const DashboardPage = dynamic<DashboardProps>(
  () => import('@/features/dashboard/DashboardPage').then(
    (m): { default: ComponentType<DashboardProps> } => ({ default: m.DashboardPage })
  ),
  { ssr: false, loading: () => null }
)

export default function Page({ params }: { params: { tripId: string } }) {
  return <DashboardPage tripId={params.tripId} />
}
