import { getDashboardStats } from '@/lib/admin-data'
import { getProducts } from '@/lib/data'
import AnalyticsClient from './AnalyticsClient'

export const dynamic = 'force-dynamic'

export default async function AnalyticsPage() {
  const [stats, products] = await Promise.all([ getDashboardStats(), getProducts() ])
  return <AnalyticsClient stats={stats} products={products} />
}
