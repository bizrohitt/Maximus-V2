'use client'

import { useState, useEffect } from 'react'
import { Sparkles, TrendingUp, Bot, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { getTools, getToolUsage, getEventBreakdown } from '@/lib/admin-api'

const barColors = [
  'bg-[var(--color-secondary)]', 'bg-emerald-500', 'bg-blue-500',
  'bg-orange-500', 'bg-pink-500', 'bg-cyan-500', 'bg-purple-500',
]

export default function AIAnalyticsPage() {
  const [tools, setTools] = useState<Array<{ id: number; name: string; usage_count: number }>>([])
  const [usage, setUsage] = useState<Array<{ id: number; tool: number; input_data: string; output_data: string; created_at: string }>>([])
  const [events, setEvents] = useState<Array<{ name: string; count: number }>>([])
  const [timeRange, setTimeRange] = useState('7d')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const days = timeRange === '24h' ? 1 : timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90
    Promise.all([
      getTools().catch(() => []),
      getToolUsage().catch(() => []),
      getEventBreakdown(days).catch(() => ({ data: [] })),
    ]).then(([t, u, e]) => {
      setTools(t)
      setUsage(u)
      setEvents(e.data)
      setLoading(false)
    })
  }, [timeRange])

  const sortedTools = [...tools].sort((a, b) => b.usage_count - a.usage_count)
  const maxUsage = sortedTools[0]?.usage_count || 1
  const today = new Date().toISOString().slice(0, 10)
  const todaysUsage = usage.filter(u => u.created_at.startsWith(today))

  if (loading) {
    return <div className="text-gray-400 text-sm">Loading AI analytics...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">AI Analytics</h1>
          <p className="text-gray-400 text-sm mt-1">Monitor AI tool usage and performance</p>
        </div>
        <div className="flex items-center gap-1 p-1 rounded-xl border border-white/10 bg-[#1A1D24]">
          {['24h', '7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                timeRange === range
                  ? 'bg-[var(--color-secondary)] text-white'
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Tools', value: tools.length, icon: Bot, color: 'text-[var(--color-secondary)]', bg: 'bg-[var(--color-secondary)]/15' },
          { label: 'Total Usage', value: usage.length.toLocaleString(), icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/15' },
          { label: 'Today', value: todaysUsage.length.toLocaleString(), icon: Sparkles, color: 'text-blue-400', bg: 'bg-blue-500/15' },
          { label: 'Top Event', value: events[0]?.name || 'None', icon: BarChart3, color: 'text-orange-400', bg: 'bg-orange-500/15', isText: true },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-white/10 bg-[#1A1D24] p-5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: stat.bg.replace('bg-', '').includes('/') ? undefined : undefined }}>
              <stat.icon size={16} className={stat.color} />
            </div>
            <div className={`text-2xl font-bold text-white ${stat.isText ? 'text-lg' : ''}`}>{typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}</div>
            <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#1A1D24] p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-[var(--color-secondary)]/15 flex items-center justify-center">
            <BarChart3 size={16} className="text-[var(--color-secondary)]" />
          </div>
          <h2 className="font-semibold text-white">Usage by Tool</h2>
        </div>
        <div className="space-y-4">
          {sortedTools.length === 0 && (
            <div className="text-sm text-gray-500 text-center py-4">No tools found</div>
          )}
          {sortedTools.map((tool, i) => (
            <div key={tool.id} className="flex items-center gap-4">
              <div className="w-40 text-sm text-gray-400 truncate">{tool.name}</div>
              <div className="flex-1 h-7 bg-[#0F1117] rounded-lg overflow-hidden">
                <div
                  className={`h-full ${barColors[i % barColors.length]} rounded-lg flex items-center justify-end px-3 transition-all duration-500`}
                  style={{ width: `${Math.max((tool.usage_count / maxUsage) * 100, 5)}%` }}
                >
                  <span className="text-[11px] font-medium text-white">{tool.usage_count.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#1A1D24] overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="font-semibold text-white">Recent Generations</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Tool</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Input</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {usage.slice(0, 10).map((u) => {
              const tool = tools.find(t => t.id === u.tool)
              return (
                <tr key={u.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[var(--color-secondary)]/20 flex items-center justify-center">
                        <Bot size={12} className="text-[var(--color-secondary)]" />
                      </div>
                      <span className="text-sm text-white font-medium">{tool?.name || `Tool #${u.tool}`}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400 max-w-[320px] truncate">{u.input_data}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{new Date(u.created_at).toLocaleDateString()}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
