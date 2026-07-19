'use client'

import { useState, useEffect } from 'react'
import { ShoppingCart, TrendingUp, Package, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react'
import { getDashboardRevenue, getOrders, type DashboardRevenue, type Order } from '@/lib/admin-api'

export default function CommercePage() {
  const [stats, setStats] = useState<DashboardRevenue | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    Promise.all([
      getDashboardRevenue().catch(() => null),
      getOrders(page).catch(() => ({ items: [], page: 1, per_page: 20, total: 0, total_pages: 1 })),
    ]).then(([s, o]) => {
      setStats(s)
      setOrders(o.items)
      setTotalPages(o.total_pages)
      setLoading(false)
    })
  }, [page])

  if (loading) return <div className="text-gray-400 text-sm">Loading commerce data...</div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Commerce</h1>
        <p className="text-gray-400 text-sm mt-1">Orders, revenue, and products</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: `$${(stats?.total_revenue ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`, icon: DollarSign, color: '#3ECF8E' },
          { label: 'Revenue (30d)', value: `$${(stats?.revenue_30d ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`, icon: TrendingUp, color: '#3B82F6' },
          { label: 'Total Orders', value: (stats?.total_orders ?? 0).toLocaleString(), icon: ShoppingCart, color: '#A165DB' },
          { label: 'Paid Orders', value: (stats?.paid_orders ?? 0).toLocaleString(), icon: Package, color: '#E67E22' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-[#1A1D24] p-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${color}15` }}>
              <Icon size={18} style={{ color }} />
            </div>
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-xs text-gray-500 mt-1">{label}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#1A1D24] overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="font-semibold text-white">Recent Orders</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Customer</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Product</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Amount</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {orders.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-12 text-sm text-gray-500 text-center">No orders yet</td></tr>
            )}
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-sm text-white">{order.email}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{order.product_name}</td>
                <td className="px-6 py-4 text-sm text-white font-medium">${order.amount.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    order.status === 'paid' ? 'bg-emerald-500/15 text-emerald-400' :
                    order.status === 'pending' ? 'bg-yellow-500/15 text-yellow-400' :
                    order.status === 'delivered' ? 'bg-blue-500/15 text-blue-400' :
                    'bg-red-500/15 text-red-400'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Page {page} of {totalPages}</span>
          <div className="flex gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 rounded-lg border border-white/10 text-xs text-gray-400 hover:text-white disabled:opacity-40">
              <ChevronLeft size={14} />
            </button>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1.5 rounded-lg border border-white/10 text-xs text-gray-400 hover:text-white disabled:opacity-40">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
