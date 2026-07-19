'use client'

import { useState, useEffect } from 'react'
import { Package, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { getOrders, updateOrder, type Order } from '@/lib/admin-api'

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    setLoading(true)
    getOrders(page, statusFilter).then((res) => {
      setOrders(res.items)
      setTotalPages(res.total_pages)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [page, statusFilter])

  const handleStatusChange = async (id: string | number, newStatus: string) => {
    await updateOrder(id, { status: newStatus })
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Orders</h1>
        <p className="text-gray-400 text-sm mt-1">Manage customer orders</p>
      </div>

      <div className="flex items-center gap-2">
        {['', 'pending', 'paid', 'delivered', 'failed'].map((s) => (
          <button
            key={s}
            onClick={() => { setStatusFilter(s); setPage(1) }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              statusFilter === s ? 'bg-[#A165DB] text-white' : 'text-gray-400 hover:text-white bg-white/5'
            }`}
          >
            {s || 'All'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-gray-400 text-sm">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-gray-500 text-sm text-center py-12">No orders found</div>
      ) : (
        <>
          <div className="rounded-2xl border border-white/10 bg-[#1A1D24] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Customer</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Product</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Amount</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Coupon</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-sm text-white">{order.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">{order.product_name}</td>
                    <td className="px-6 py-4 text-sm text-white font-medium">${order.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">{order.coupon_code || '—'}</td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`text-xs font-medium px-2.5 py-1 rounded-full border-0 cursor-pointer ${
                          order.status === 'paid' ? 'bg-emerald-500/15 text-emerald-400' :
                          order.status === 'pending' ? 'bg-yellow-500/15 text-yellow-400' :
                          order.status === 'delivered' ? 'bg-blue-500/15 text-blue-400' :
                          'bg-red-500/15 text-red-400'
                        }`}
                      >
                        <option value="pending">pending</option>
                        <option value="paid">paid</option>
                        <option value="delivered">delivered</option>
                        <option value="failed">failed</option>
                      </select>
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
        </>
      )}
    </div>
  )
}
