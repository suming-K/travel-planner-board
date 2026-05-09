import { TimelinePage } from '@/features/timeline/TimelinePage'

export default function Page({ params }: { params: { tripId: string } }) {
  return <TimelinePage tripId={params.tripId} />
}
