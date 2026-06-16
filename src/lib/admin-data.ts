import 'server-only'
import { supabaseAdmin } from './supabase-admin'
import { Order } from '@/types'

// Čitanja porudžbina za admin (Dashboard, Analitika).
// Koristi service_role klijent jer anon (po RLS-u) NE sme da čita orders.
// 'server-only' garantuje da ovaj modul nikad ne uđe u client bundle.

export async function getOrders(): Promise<Order[]> {
  const { data, error } = await supabaseAdmin
    .from('orders')
    .select(`*, items:order_items(*)`)
    .order('created_at', { ascending: false })
  if (error) { console.error(error); return [] }
  return data || []
}

export async function getDashboardStats() {
  const [ordersRes] = await Promise.all([
    supabaseAdmin.from('orders').select('*'),
  ])

  const orders = ordersRes.data || []
  const now = new Date()
  const today = now.toISOString().split('T')[0]
  const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

  const totalRevenue = orders.reduce((sum: number, o: any) => sum + Number(o.total_amount), 0)
  const ordersToday = orders.filter((o: any) => o.created_at.startsWith(today)).length
  const ordersThisMonth = orders.filter((o: any) => o.created_at.startsWith(thisMonth)).length

  // Prihod po mesecima (poslednjih 6)
  const revenueByMonth: Record<string, number> = {}
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    revenueByMonth[key] = 0
  }
  orders.forEach((o: any) => {
    const month = o.created_at.slice(0, 7)
    if (revenueByMonth[month] !== undefined) {
      revenueByMonth[month] += Number(o.total_amount)
    }
  })

  // Porudžbine po izvoru
  const bySource: Record<string, number> = {}
  orders.forEach((o: any) => {
    bySource[o.source] = (bySource[o.source] || 0) + 1
  })

  return {
    totalOrders: orders.length,
    totalRevenue,
    ordersToday,
    ordersThisMonth,
    averageOrderValue: orders.length ? totalRevenue / orders.length : 0,
    revenueByMonth: Object.entries(revenueByMonth).map(([month, revenue]) => ({
      month: month.slice(5),
      revenue,
    })),
    ordersBySource: Object.entries(bySource).map(([source, count]) => ({ source, count })),
    recentOrders: orders.slice(0, 10),
  }
}
