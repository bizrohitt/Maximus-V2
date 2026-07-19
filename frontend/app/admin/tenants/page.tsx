'use client'

import { useState, useEffect } from 'react'
import { Building2, Plus, Trash2, X, Loader2 } from 'lucide-react'
import { getTenants, createTenant, deleteTenant, type Tenant } from '@/lib/admin-api'

export default function TenantsPage() {
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [form, setForm] = useState({ name: '', slug: '', domain: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getTenants().then((res) => { setTenants(res.items); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const handleCreate = async () => {
    if (!form.name.trim() || !form.slug.trim() || !form.domain.trim()) return
    setSaving(true)
    try {
      const result = await createTenant(form)
      setTenants(prev => [{ ...form, id: result.id, is_active: true, branding: {}, created_at: new Date().toISOString() }, ...prev])
      setForm({ name: '', slug: '', domain: '' })
      setShowCreate(false)
    } catch { /* noop */ }
    setSaving(false)
  }

  const handleDelete = async (id: string | number) => {
    if (!confirm('Deactivate this tenant?')) return
    await deleteTenant(id)
    setTenants(prev => prev.map(t => t.id === id ? { ...t, is_active: false } : t))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Tenants</h1>
          <p className="text-gray-400 text-sm mt-1">Multi-tenant management</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#A165DB] text-white text-sm font-semibold hover:opacity-90">
          <Plus size={16} /> Add Tenant
        </button>
      </div>

      {showCreate && (
        <div className="rounded-2xl border border-white/10 bg-[#1A1D24] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">New Tenant</h3>
            <button onClick={() => setShowCreate(false)} className="text-gray-400 hover:text-white"><X size={16} /></button>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Tenant name" className="px-4 py-2.5 rounded-xl border border-white/10 bg-[#0F1117] text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#A165DB]/50" />
            <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="slug" className="px-4 py-2.5 rounded-xl border border-white/10 bg-[#0F1117] text-white text-sm font-mono placeholder:text-gray-600 focus:outline-none focus:border-[#A165DB]/50" />
            <input value={form.domain} onChange={(e) => setForm({ ...form, domain: e.target.value })} placeholder="example.com" className="px-4 py-2.5 rounded-xl border border-white/10 bg-[#0F1117] text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#A165DB]/50" />
          </div>
          <button onClick={handleCreate} disabled={saving || !form.name.trim()} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#A165DB] text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50">
            {saving ? <Loader2 size={14} className="animate-spin" /> : null}
            {saving ? 'Creating...' : 'Create'}
          </button>
        </div>
      )}

      {loading ? (
        <div className="text-gray-400 text-sm">Loading...</div>
      ) : tenants.length === 0 ? (
        <div className="text-gray-500 text-sm text-center py-12">No tenants configured</div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-[#1A1D24] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Tenant</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Domain</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {tenants.map((t) => (
                <tr key={t.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#3ECF8E]/15 flex items-center justify-center">
                        <Building2 size={16} className="text-[#3ECF8E]" />
                      </div>
                      <div>
                        <div className="text-sm text-white font-medium">{t.name}</div>
                        <div className="text-xs text-gray-500">{t.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400 font-mono">{t.domain}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${t.is_active ? 'bg-emerald-500/15 text-emerald-400' : 'bg-gray-500/15 text-gray-400'}`}>
                      {t.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleDelete(t.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10"><Trash2 size={14} /></button>
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
