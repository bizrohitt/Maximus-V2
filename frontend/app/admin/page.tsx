'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  FileText, Users, BarChart3, Eye, Sparkles, Settings,
  ArrowUpRight, TrendingUp, Globe, Activity,
} from 'lucide-react'
import {
  getDashboardStats, getTopPages, getTopReferrers, getAnalyticsEvents, getEventBreakdown,
} from '@/lib/admin-api'

export default function AdminOverview() {
  const [stats, setStats] = useState<{
    page_views: { today: number; week: number; month: number; total: number }
    events: { today: number; month: number }
    visitors: { today: number; week: number }
  } | null>(null)
  const [topPages, setTopPages] = useState<Array<{ url: string; count: number }>>([])
  const [topReferrers, setTopReferrers] = useState<Array<{ referrer: string; count: number }>>([])
  const [recentEvents, setRecentEvents] = useState<Array<{
    id: number; name: string; url: string; created_at: string
  }>>([])
  const [eventBreakdown, setEventBreakdown] = useState<Array<{ name: string; count: number }>>([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const [s, p, r, e, eb] = await Promise.allSettled([
          getDashboardStats(),
          getTopPages(7, 5),
          getTopReferrers(7, 5),
          getAnalyticsEvents(7, 10),
          getEventBreakdown(7),
        ])
        if (s.status === 'fulfilled') setStats(s.value)
        if (p.status === 'fulfilled') setTopPages(p.value.data)
        if (r.status === 'fulfilled') setTopReferrers(r.value.data)
        if (e.status === 'fulfilled') setRecentEvents(e.value.data)
        if (eb.status === 'fulfilled') setEventBreakdown(eb.value.data)
      } catch {
        setError('Could not connect to analytics API')
      }
    }
    load()
  }, [])

  const statCards = stats ? [
    { label: 'Page Views (Today)', value: stats.page_views.today.toLocaleString(), icon: Eye, color: '#3B82F6' },
    { label: 'Page Views (7d)', value: stats.page_views.week.toLocaleString(), icon: TrendingUp, color: '#3ECF8E' },
    { label: 'Visitors (Today)', value: stats.visitors.today.toLocaleString(), icon: Users, color: '#A165DB' },
    { label: 'Events (30d)', value: stats.events.month.toLocaleString(), icon: Activity, color: '#E67E22' },
  ] : [
    { label: 'Page Views (Today)', value: '—', icon: Eye, color: '#3B82F6' },
    { label: 'Page Views (7d)', value: '—', icon: TrendingUp, color: '#3ECF8E' },
    { label: 'Visitors (Today)', value: '—', icon: Users, color: '#A165DB' },
    { label: 'Events (7d)', value: '—', icon: Activity, color: '#E67E22' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Analytics Overview</h1>
        <p className="text-gray-400 text-sm">Real-time visitor and event data from your site.</p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-yellow-500/15 border border-yellow-500/20 text-yellow-400 text-sm flex items-center gap-2">
          <BarChart3 size={16} />
          {error}
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-[#1A1D24] p-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${color}15` }}>
              <Icon size={18} style={{ color }} />
            </div>
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-xs text-gray-500 mt-1">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Top Pages */}
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#1A1D24]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <h2 className="font-semibold text-white flex items-center gap-2">
              <Globe size={16} className="text-gray-500" />
              Top Pages (7d)
            </h2>
          </div>
          <div className="divide-y divide-white/5">
            {topPages.length > 0 ? topPages.map((page) => (
              <div key={page.url} className="flex items-center gap-4 px-6 py-3.5 hover:bg-white/5 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white truncate font-mono">{page.url}</div>
                </div>
                <div className="text-sm text-gray-400 tabular-nums">{page.count.toLocaleString()} views</div>
              </div>
            )) : (
              <div className="px-6 py-8 text-center text-gray-500 text-sm">
                {error ? 'No data yet' : 'Loading...'}
              </div>
            )}
          </div>
        </div>

        {/* Event Breakdown */}
        <div className="rounded-2xl border border-white/10 bg-[#1A1D24]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <h2 className="font-semibold text-white flex items-center gap-2">
              <Activity size={16} className="text-gray-500" />
              Events (7d)
            </h2>
          </div>
          <div className="divide-y divide-white/5">
            {eventBreakdown.length > 0 ? eventBreakdown.map((ev) => (
              <div key={ev.name} className="flex items-center justify-between px-6 py-3.5 hover:bg-white/5 transition-colors">
                <div className="text-sm text-white">{ev.name}</div>
                <div className="text-sm text-gray-400 tabular-nums">{ev.count}</div>
              </div>
            )) : (
              <div className="px-6 py-8 text-center text-gray-500 text-sm">
                {error ? 'No events yet' : 'Loading...'}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Referrers */}
        <div className="rounded-2xl border border-white/10 bg-[#1A1D24]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <h2 className="font-semibold text-white">Top Referrers (7d)</h2>
          </div>
          <div className="divide-y divide-white/5">
            {topReferrers.length > 0 ? topReferrers.map((ref) => (
              <div key={ref.referrer} className="flex items-center gap-4 px-6 py-3.5 hover:bg-white/5 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white truncate">{ref.referrer}</div>
                </div>
                <div className="text-sm text-gray-400 tabular-nums">{ref.count}</div>
              </div>
            )) : (
              <div className="px-6 py-8 text-center text-gray-500 text-sm">No referrer data yet</div>
            )}
          </div>
        </div>

        {/* Recent Events */}
        <div className="rounded-2xl border border-white/10 bg-[#1A1D24]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <h2 className="font-semibold text-white">Recent Events</h2>
          </div>
          <div className="divide-y divide-white/5">
            {recentEvents.length > 0 ? recentEvents.map((ev) => (
              <div key={ev.id} className="flex items-center gap-4 px-6 py-3.5 hover:bg-white/5 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white">{ev.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5 truncate">{ev.url}</div>
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(ev.created_at).toLocaleDateString()}
                </div>
              </div>
            )) : (
              <div className="px-6 py-8 text-center text-gray-500 text-sm">No events yet</div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl border border-white/10 bg-[#1A1D24] p-6">
        <h2 className="font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'AI Tools', href: '/admin/ai-tools', icon: Sparkles, color: '#A165DB' },
            { label: 'Blog Posts', href: '/admin/content/blog', icon: FileText, color: '#3B82F6' },
            { label: 'Analytics', href: '/admin/analytics', icon: BarChart3, color: '#3ECF8E' },
            { label: 'Settings', href: '/admin/settings', icon: Settings, color: '#E67E22' },
          ].map(({ label, href, icon: Icon, color }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all group"
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                <Icon size={16} style={{ color }} />
              </div>
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors flex-1">{label}</span>
              <ArrowUpRight size={14} className="text-gray-600 group-hover:text-gray-400" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
