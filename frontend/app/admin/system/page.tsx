'use client'

import { useState, useEffect } from 'react'
import { Shield, Key, Database, Activity } from 'lucide-react'
import { getAuditLogs, getApiKeys, getBackups, type AuditLogEntry, type ApiKey, type BackupLog } from '@/lib/admin-api'

export default function SystemPage() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([])
  const [keys, setKeys] = useState<ApiKey[]>([])
  const [backups, setBackups] = useState<BackupLog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      getAuditLogs().catch(() => ({ items: [] })),
      getApiKeys().catch(() => ({ items: [] })),
      getBackups().catch(() => ({ items: [] })),
    ]).then(([l, k, b]) => {
      setLogs(l.items)
      setKeys(k.items)
      setBackups(b.items)
      setLoading(false)
    })
  }, [])

  if (loading) return <div className="text-gray-400 text-sm">Loading system data...</div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">System</h1>
        <p className="text-gray-400 text-sm mt-1">Overview of system health and activity</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Activity Logs', value: logs.length, icon: Activity, color: '#3B82F6' },
          { label: 'API Keys', value: keys.length, icon: Key, color: '#A165DB' },
          { label: 'Backups', value: backups.length, icon: Database, color: '#3ECF8E' },
          { label: 'Status', value: 'Online', icon: Shield, color: '#E67E22', isText: true },
        ].map(({ label, value, icon: Icon, color, isText }) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-[#1A1D24] p-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${color}15` }}>
              <Icon size={18} style={{ color }} />
            </div>
            <div className={`text-2xl font-bold text-white ${isText ? 'text-lg' : ''}`}>{isText ? value : (value as number).toLocaleString()}</div>
            <div className="text-xs text-gray-500 mt-1">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-white/10 bg-[#1A1D24]">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="font-semibold text-white">Recent Activity</h2>
          </div>
          <div className="divide-y divide-white/5 max-h-80 overflow-y-auto">
            {logs.length === 0 && <div className="px-6 py-8 text-sm text-gray-500 text-center">No activity logs</div>}
            {logs.slice(0, 10).map((log) => (
              <div key={log.id} className="px-6 py-3 hover:bg-white/5 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-white">{log.user_email}</div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    log.action === 'create' ? 'bg-emerald-500/15 text-emerald-400' :
                    log.action === 'delete' ? 'bg-red-500/15 text-red-400' :
                    'bg-blue-500/15 text-blue-400'
                  }`}>{log.action}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">{log.model_name} &middot; {new Date(log.created_at).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#1A1D24]">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="font-semibold text-white">Recent Backups</h2>
          </div>
          <div className="divide-y divide-white/5">
            {backups.length === 0 && <div className="px-6 py-8 text-sm text-gray-500 text-center">No backups yet</div>}
            {backups.slice(0, 5).map((backup) => (
              <div key={backup.id} className="px-6 py-3 hover:bg-white/5 transition-colors flex items-center justify-between">
                <div>
                  <div className="text-sm text-white font-mono">{backup.file_path.split('/').pop()}</div>
                  <div className="text-xs text-gray-500 mt-1">{backup.size_mb.toFixed(1)} MB &middot; {new Date(backup.created_at).toLocaleDateString()}</div>
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  backup.status === 'success' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'
                }`}>{backup.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
