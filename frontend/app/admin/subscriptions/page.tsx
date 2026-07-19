'use client'

import { useState, useEffect } from 'react'
import { CreditCard, Users, Crown } from 'lucide-react'
import { getSubscriptionPlans, getSubscriptions, type SubscriptionPlan, type Subscription } from '@/lib/admin-api'

export default function SubscriptionsPage() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([])
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      getSubscriptionPlans().catch(() => ({ items: [] })),
      getSubscriptions().catch(() => ({ items: [] })),
    ]).then(([p, s]) => {
      setPlans(p.items)
      setSubscriptions(s.items)
      setLoading(false)
    })
  }, [])

  if (loading) return <div className="text-gray-400 text-sm">Loading subscriptions...</div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Subscriptions</h1>
        <p className="text-gray-400 text-sm mt-1">Plans and subscriber management</p>
      </div>

      {plans.length > 0 && (
        <>
          <h2 className="text-lg font-semibold text-white">Plans</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {plans.map((p) => (
              <div key={p.id} className="rounded-2xl border border-white/10 bg-[#1A1D24] p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#A165DB]/15 flex items-center justify-center">
                    <Crown size={18} className="text-[#A165DB]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{p.name}</div>
                    <div className="text-xs text-gray-500 capitalize">{p.tier}</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-2">${p.price.toFixed(2)}<span className="text-xs text-gray-500 font-normal">/mo</span></div>
                <div className="flex flex-wrap gap-1">
                  {p.features.slice(0, 3).map((f, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400">{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {plans.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-[#1A1D24] p-8 text-center">
          <CreditCard size={32} className="text-gray-600 mx-auto mb-3" />
          <p className="text-sm text-gray-500">No subscription plans configured yet</p>
          <p className="text-xs text-gray-600 mt-1">Create plans in Django admin to get started</p>
        </div>
      )}

      {subscriptions.length > 0 && (
        <>
          <h2 className="text-lg font-semibold text-white">Active Subscriptions</h2>
          <div className="rounded-2xl border border-white/10 bg-[#1A1D24] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">User</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Plan</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Since</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {subscriptions.map((s) => (
                  <tr key={s.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-sm text-white">{s.user_email}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">{s.plan_name}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        s.status === 'active' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-gray-500/15 text-gray-400'
                      }`}>{s.status}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">{new Date(s.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
