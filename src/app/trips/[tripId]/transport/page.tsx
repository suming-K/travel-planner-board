import dynamic from 'next/dynamic'

const TransportPage = dynamic(
  () => import('@/features/transport/TransportPage').then(
    (m) => ({ default: m.TransportPage })
  ),
  { ssr: false, loading: () => null }
)

export default TransportPage
