import dynamic from 'next/dynamic'

const BudgetPage = dynamic(
  () => import('@/features/budget/BudgetPage').then(
    (m) => ({ default: m.BudgetPage })
  ),
  { ssr: false, loading: () => null }
)

// Tell Next.js which tripId values to pre-render
export function generateStaticParams(): Array<{ tripId: string }> {
  return [{ tripId: 'trip-ny-2026' }]
}

export default BudgetPage
