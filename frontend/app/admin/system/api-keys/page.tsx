'use client'

import { useState, useEffect } from 'react'
import { Key, Plus, Trash2, Copy, Check } from 'lucide-react'
import { getApiKeys, createApiKey, deleteApiKey, type ApiKey } from '@/lib/admin-api'

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [newName, setNewName] = useState('')
  const [creating, setCreating] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    getApiKeys().then((res) => { setKeys(res.items); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const handleCreate = async () => {
    if (!newName.trim()) return
    setCreating(true)
    try {
      const result = await createApiKey(newName.trim())
      setKeys(prev => [{ id: result.id, name: result.name || newName, key_preview: result.key?.slice(0, 8) + '...' + result.key?.slice(-4), last_used: null, created_at: new Date().toISOString() }, ...prev])
      setNewName('')
      setShowCreate(false)
    } catch { /* noop */ }
    setCreating(false)
  }

  const handleDelete = async (id: string | number) => {
    if (!confirm('Revoke this API key?')) return
    await deleteApiKey(id)
    setKeys(prev => prev.filter(k => k.id !== id))
  }

  const handleCopy = (key: string, id: string | number) => {
    navigator.clipboard.writeText(key)
    setCopied(String(id))
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">API Keys</h1>
          <p className="text-gray-400 text-sm mt-1">Manage API access keys</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#A165DB] text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          <Plus size={16} /> Generate Key
        </button>
      </div>

      {showCreate && (
        <div className="rounded-2xl border border-white/10 bg-[#1A1D24] p-6">
          <h3 className="font-semibold text-white mb-4">Generate API Key</h3>
          <div className="flex gap-4">
            <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Key name (e.g. Production)" className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 bg-[#0F1117] text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#A165DB]/50" />
            <button onClick={handleCreate} disabled={creating || !newName.trim()} className="px-6 py-2.5 rounded-xl bg-[#A165DB] text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50">
              {creating ? 'Generating...' : 'Generate'}
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-gray-400 text-sm">Loading API keys...</div>
      ) : keys.length === 0 ? (
        <div className="text-gray-500 text-sm text-center py-12">No API keys</div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-[#1A1D24] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Name</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Key</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Last Used</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Created</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {keys.map((key) => (
                <tr key={key.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-sm text-white font-medium">{key.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-400 font-mono">{key.key_preview}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{key.last_used ? new Date(key.last_used).toLocaleDateString() : 'Never'}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{new Date(key.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleDelete(key.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors" title="Revoke">
                        <Trash2 size={14} />
                      </button>
                    </div>
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
