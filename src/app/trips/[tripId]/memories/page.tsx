import dynamic from 'next/dynamic'

const MemoriesPage = dynamic(
  () => import('@/features/memories/MemoriesPage').then(
    (m) => ({ default: m.MemoriesPage })
  ),
  { ssr: false, loading: () => null }
)

export default MemoriesPage
