'use client'

import { useState, useEffect } from 'react'
import { Webhook, Plus, Trash2, X, Loader2 } from 'lucide-react'
import { getWebhooks, createWebhook, deleteWebhook, type WebhookEndpoint } from '@/lib/admin-api'

export default function WebhooksPage() {
  const [webhooks, setWebhooks] = useState<WebhookEndpoint[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [url, setUrl] = useState('')
  const [events, setEvents] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getWebhooks().then((res) => { setWebhooks(res.items); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const handleCreate = async () => {
    if (!url.trim()) return
    setSaving(true)
    try {
      const eventList = events.split(',').map(e => e.trim()).filter(Boolean)
      const result = await createWebhook({ url, events: eventList })
      setWebhooks(prev => [{ id: result.id, url, events: eventList, is_active: true, created_at: new Date().toISOString() }, ...prev])
      setUrl('')
      setEvents('')
      setShowCreate(false)
    } catch { /* noop */ }
    setSaving(false)
  }

  const handleDelete = async (id: string | number) => {
    if (!confirm('Delete this webhook?')) return
    await deleteWebhook(id)
    setWebhooks(prev => prev.filter(w => w.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Webhooks</h1>
          <p className="text-gray-400 text-sm mt-1">Manage webhook endpoints</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#A165DB] text-white text-sm font-semibold hover:opacity-90">
          <Plus size={16} /> Add Webhook
        </button>
      </div>

      {showCreate && (
        <div className="rounded-2xl border border-white/10 bg-[#1A1D24] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">New Webhook</h3>
            <button onClick={() => setShowCreate(false)} className="text-gray-400 hover:text-white"><X size={16} /></button>
          </div>
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com/webhook" className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#0F1117] text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#A165DB]/50" />
          <input value={events} onChange={(e) => setEvents(e.target.value)} placeholder="Events (comma separated): user.created, plugin.installed" className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#0F1117] text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#A165DB]/50" />
          <button onClick={handleCreate} disabled={saving || !url.trim()} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#A165DB] text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50">
            {saving ? <Loader2 size={14} className="animate-spin" /> : null}
            {saving ? 'Creating...' : 'Create'}
          </button>
        </div>
      )}

      {loading ? (
        <div className="text-gray-400 text-sm">Loading...</div>
      ) : webhooks.length === 0 ? (
        <div className="text-gray-500 text-sm text-center py-12">No webhooks configured</div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-[#1A1D24] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">URL</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Events</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {webhooks.map((w) => (
                <tr key={w.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-sm text-white font-mono truncate max-w-[250px]">{w.url}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {w.events.map((ev) => (
                        <span key={ev} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/5 text-gray-400">{ev}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${w.is_active ? 'bg-emerald-500/15 text-emerald-400' : 'bg-gray-500/15 text-gray-400'}`}>
                      {w.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleDelete(w.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10"><Trash2 size={14} /></button>
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
