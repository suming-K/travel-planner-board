import dynamic from 'next/dynamic'

const BudgetPage = dynamic(
  () => import('@/features/budget/BudgetPage').then(
    (m) => ({ default: m.BudgetPage })
  ),
  { ssr: false, loading: () => null }
)

export default BudgetPage
