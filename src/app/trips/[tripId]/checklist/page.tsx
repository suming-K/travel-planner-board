import dynamic from 'next/dynamic'

const ChecklistPage = dynamic(
  () => import('@/features/checklist/ChecklistPage').then(
    (m) => ({ default: m.ChecklistPage })
  ),
  { ssr: false, loading: () => null }
)

export default ChecklistPage
