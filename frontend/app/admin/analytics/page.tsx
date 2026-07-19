'use client'

import { useState, useEffect } from 'react'
import { BarChart3, Eye, Users, Globe, ArrowUpRight, TrendingUp } from 'lucide-react'
import { getDashboardStats, getTopPages, getTopReferrers, getEventBreakdown } from '@/lib/admin-api'

export default function AnalyticsPage() {
  const [stats, setStats] = useState<{ page_views: { today: number; week: number; month: number; total: number }; events: { today: number; month: number }; visitors: { today: number; week: number } } | null>(null)
  const [topPages, setTopPages] = useState<Array<{ url: string; count: number }>>([])
  const [topReferrers, setTopReferrers] = useState<Array<{ referrer: string; count: number }>>([])
  const [events, setEvents] = useState<Array<{ name: string; count: number }>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      getDashboardStats().catch(() => ({ page_views: { today: 0, week: 0, month: 0, total: 0 }, events: { today: 0, month: 0 }, visitors: { today: 0, week: 0 } })),
      getTopPages(30, 10).catch(() => ({ data: [] })),
      getTopReferrers(30, 10).catch(() => ({ data: [] })),
      getEventBreakdown(30).catch(() => ({ data: [] })),
    ]).then(([s, p, r, e]) => {
      setStats(s)
      setTopPages(p.data)
      setTopReferrers(r.data)
      setEvents(e.data)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <div className="text-gray-400 text-sm">Loading analytics...</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-gray-400 text-sm mt-1">Site traffic and user engagement (last 30 days)</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: 'Page Views', value: stats?.page_views.month ?? 0, icon: Eye, color: '#3B82F6' },
          { label: 'Unique Visitors', value: stats?.visitors.week ?? 0, icon: Users, color: '#3ECF8E' },
          { label: 'Events', value: stats?.events.month ?? 0, icon: TrendingUp, color: '#A165DB' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-[#1A1D24] p-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${color}15` }}>
              <Icon size={18} style={{ color }} />
            </div>
            <div className="text-2xl font-bold text-white">{value.toLocaleString()}</div>
            <div className="text-xs text-gray-500 mt-1">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-white/10 bg-[#1A1D24]">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="font-semibold text-white">Top Pages</h2>
          </div>
          <div className="divide-y divide-white/5">
            {topPages.length === 0 && (
              <div className="px-6 py-8 text-sm text-gray-500 text-center">No page data yet</div>
            )}
            {topPages.map(({ url, count }) => (
              <div key={url} className="flex items-center gap-4 px-6 py-3 hover:bg-white/5 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white font-mono truncate">{url}</div>
                </div>
                <div className="text-sm text-gray-400">{count.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#1A1D24]">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="font-semibold text-white">Top Referrers</h2>
          </div>
          <div className="p-6 space-y-4">
            {topReferrers.length === 0 && (
              <div className="text-sm text-gray-500 text-center">No referrer data yet</div>
            )}
            {topReferrers.map(({ referrer, count }) => {
              const maxCount = topReferrers[0]?.count || 1
              const pct = Math.round((count / maxCount) * 100)
              return (
                <div key={referrer}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-white">{referrer || 'Direct'}</span>
                    <span className="text-sm text-gray-400">{count.toLocaleString()}</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--color-secondary)] rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#1A1D24]">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="font-semibold text-white">Event Breakdown</h2>
          </div>
          <div className="p-6 space-y-4">
            {events.length === 0 && (
              <div className="text-sm text-gray-500 text-center">No events yet</div>
            )}
            {events.map(({ name, count }) => {
              const maxCount = events[0]?.count || 1
              const pct = Math.round((count / maxCount) * 100)
              return (
                <div key={name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-white">{name}</span>
                    <span className="text-sm text-gray-400">{count.toLocaleString()}</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#1A1D24]">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="font-semibold text-white">Today</h2>
          </div>
          <div className="p-6 grid grid-cols-2 gap-4">
            <div className="text-center p-4 rounded-xl bg-white/5">
              <div className="text-2xl font-bold text-white">{stats?.page_views.today ?? 0}</div>
              <div className="text-xs text-gray-500 mt-1">Page Views</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/5">
              <div className="text-2xl font-bold text-white">{stats?.visitors.today ?? 0}</div>
              <div className="text-xs text-gray-500 mt-1">Visitors</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/5">
              <div className="text-2xl font-bold text-white">{stats?.events.today ?? 0}</div>
              <div className="text-xs text-gray-500 mt-1">Events</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/5">
              <div className="text-2xl font-bold text-white">{stats?.page_views.total ?? 0}</div>
              <div className="text-xs text-gray-500 mt-1">All-time Views</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
