'use client'

import { useState, useEffect } from 'react'
import { Database, Plus, Download, Loader2 } from 'lucide-react'
import { getBackups, createBackup, type BackupLog } from '@/lib/admin-api'

export default function BackupsPage() {
  const [backups, setBackups] = useState<BackupLog[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    getBackups().then((res) => { setBackups(res.items); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const handleCreate = async () => {
    setCreating(true)
    try {
      const result = await createBackup()
      setBackups(prev => [{ id: result.id, status: result.status, file_path: result.file_path, size_mb: 0, created_at: new Date().toISOString() }, ...prev])
    } catch { /* noop */ }
    setCreating(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Backups</h1>
          <p className="text-gray-400 text-sm mt-1">Database backup management</p>
        </div>
        <button onClick={handleCreate} disabled={creating} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#A165DB] text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity">
          {creating ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
          {creating ? 'Creating...' : 'Create Backup'}
        </button>
      </div>

      {loading ? (
        <div className="text-gray-400 text-sm">Loading backups...</div>
      ) : backups.length === 0 ? (
        <div className="text-gray-500 text-sm text-center py-12">No backups yet</div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-[#1A1D24] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">File</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Size</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {backups.map((backup) => (
                <tr key={backup.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Database size={14} className="text-gray-500" />
                      <span className="text-sm text-white font-mono">{backup.file_path.split('/').pop()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">{backup.size_mb.toFixed(1)} MB</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      backup.status === 'success' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'
                    }`}>{backup.status}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">{new Date(backup.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
