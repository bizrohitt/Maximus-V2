'use client'

import { useState, useEffect } from 'react'
import { AlertCircle, Filter } from 'lucide-react'
import { getAuditLogs } from '@/lib/admin-api'

interface LogEntry {
  id: string | number
  user_email: string
  action: string
  model_name: string
  object_id: string
  ip_address: string
  created_at: string
}

export default function ActivityPage() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const data = await getAuditLogs()
        setLogs(data.items || [])
      } catch {
        setError('Could not load activity logs from API')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = filter === 'all' ? logs : logs.filter((l) => l.action === filter)
  const actions = Array.from(new Set(logs.map((l) => l.action)))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Activity Logs</h1>
        <p className="text-gray-400 text-sm mt-1">Track all admin actions</p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-yellow-500/15 border border-yellow-500/20 text-yellow-400 text-sm flex items-center gap-2">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {actions.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={14} className="text-gray-500" />
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === 'all' ? 'bg-[var(--color-secondary)]/15 text-[var(--color-secondary)]' : 'text-gray-400 hover:text-white'}`}
          >
            All
          </button>
          {actions.map((a) => (
            <button
              key={a}
              onClick={() => setFilter(a)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === a ? 'bg-[var(--color-secondary)]/15 text-[var(--color-secondary)]' : 'text-gray-400 hover:text-white'}`}
            >
              {a}
            </button>
          ))}
        </div>
      )}

      <div className="rounded-2xl border border-white/10 bg-[#1A1D24] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">User</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Action</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Target</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">IP</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-500 text-sm">Loading...</td></tr>
            ) : filtered.length > 0 ? filtered.map((log) => (
              <tr key={log.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-sm text-white">{log.user_email}</td>
                <td className="px-6 py-4">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[var(--color-secondary)]/15 text-[var(--color-secondary)]">
                    {log.action}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">{log.model_name} #{log.object_id}</td>
                <td className="px-6 py-4 text-sm text-gray-500 font-mono">{log.ip_address}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{new Date(log.created_at).toLocaleString()}</td>
              </tr>
            )) : (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-500 text-sm">No logs found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
