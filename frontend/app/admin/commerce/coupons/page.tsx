'use client'

import { useState, useEffect } from 'react'
import { Tag, Plus, Trash2, X } from 'lucide-react'
import { getCoupons, createCoupon, deleteCoupon, type Coupon } from '@/lib/admin-api'

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [newCode, setNewCode] = useState('')
  const [newDiscount, setNewDiscount] = useState(10)
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    getCoupons().then((res) => { setCoupons(res.items); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const handleCreate = async () => {
    if (!newCode.trim()) return
    setCreating(true)
    try {
      const result = await createCoupon({ code: newCode.trim(), discount_percent: newDiscount })
      setCoupons(prev => [{ id: result.id, code: result.code, discount_percent: newDiscount, is_active: true, max_uses: 100, used_count: 0, expires_at: null, created_at: new Date().toISOString() }, ...prev])
      setNewCode('')
      setNewDiscount(10)
      setShowCreate(false)
    } catch { /* noop */ }
    setCreating(false)
  }

  const handleDelete = async (id: string | number) => {
    if (!confirm('Delete this coupon?')) return
    await deleteCoupon(id)
    setCoupons(prev => prev.filter(c => c.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Coupons</h1>
          <p className="text-gray-400 text-sm mt-1">{coupons.length} discount codes</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#A165DB] text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          <Plus size={16} /> New Coupon
        </button>
      </div>

      {showCreate && (
        <div className="rounded-2xl border border-white/10 bg-[#1A1D24] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Create Coupon</h3>
            <button onClick={() => setShowCreate(false)} className="text-gray-400 hover:text-white"><X size={16} /></button>
          </div>
          <div className="flex gap-4">
            <input value={newCode} onChange={(e) => setNewCode(e.target.value)} placeholder="CODE" className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 bg-[#0F1117] text-white text-sm font-mono placeholder:text-gray-600 focus:outline-none focus:border-[#A165DB]/50" />
            <input type="number" value={newDiscount} onChange={(e) => setNewDiscount(Number(e.target.value))} min={1} max={100} className="w-24 px-4 py-2.5 rounded-xl border border-white/10 bg-[#0F1117] text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#A165DB]/50" />
            <button onClick={handleCreate} disabled={creating || !newCode.trim()} className="px-6 py-2.5 rounded-xl bg-[#A165DB] text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50">
              {creating ? 'Creating...' : 'Create'}
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-gray-400 text-sm">Loading coupons...</div>
      ) : coupons.length === 0 ? (
        <div className="text-gray-500 text-sm text-center py-12">No coupons yet</div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-[#1A1D24] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Code</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Discount</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Uses</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-sm text-white font-mono">{coupon.code}</td>
                  <td className="px-6 py-4 text-sm text-white">{coupon.discount_percent}%</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{coupon.used_count}/{coupon.max_uses}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      coupon.is_active ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'
                    }`}>
                      {coupon.is_active ? 'Active' : 'Disabled'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleDelete(coupon.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors" title="Delete">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
