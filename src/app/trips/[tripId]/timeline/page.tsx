import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'

interface TimelineProps { tripId: string }

const TimelinePage = dynamic<TimelineProps>(
  () => import('@/features/timeline/TimelinePage').then(
    (m): { default: ComponentType<TimelineProps> } => ({ default: m.TimelinePage })
  ),
  { ssr: false, loading: () => null }
)

export function generateStaticParams(): Array<{ tripId: string }> {
  return [{ tripId: 'trip-ny-2026' }]
}

export default function Page({ params }: { params: { tripId: string } }): JSX.Element {
  return <TimelinePage tripId={params.tripId} />
}
