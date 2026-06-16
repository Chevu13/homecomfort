import { getDashboardStats, getOrders } from '@/lib/admin-data'
import AdminDashboardClient from './AdminDashboardClient'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const [stats, orders] = await Promise.all([
    getDashboardStats(),
    getOrders(),
  ])
  return <AdminDashboardClient stats={stats} orders={orders} />
}
