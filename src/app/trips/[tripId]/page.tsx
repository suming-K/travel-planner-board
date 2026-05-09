import { DashboardPage } from '@/features/dashboard/DashboardPage'

export default function Page({ params }: { params: { tripId: string } }) {
  return <DashboardPage tripId={params.tripId} />
}
