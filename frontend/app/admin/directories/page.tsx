'use client'

import { useState, useEffect } from 'react'
import { Globe, Plus, Trash2, Star, ExternalLink, X, Loader2, Search } from 'lucide-react'
import { getDirectories, createDirectory, deleteDirectory, type DirectoryEntry } from '@/lib/admin-api'

export default function DirectoriesPage() {
  const [entries, setEntries] = useState<DirectoryEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showCreate, setShowCreate] = useState(false)
  const [form, setForm] = useState({ title: '', slug: '', description: '', website_url: '', category: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setLoading(true)
    getDirectories(page, search).then((res) => {
      setEntries(res.items)
      setTotalPages(res.total_pages)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [page, search])

  const handleCreate = async () => {
    if (!form.title.trim() || !form.slug.trim()) return
    setSaving(true)
    try {
      const result = await createDirectory(form)
      setEntries(prev => [{ ...form, id: result.id, is_featured: false, click_count: 0, created_at: new Date().toISOString() }, ...prev])
      setForm({ title: '', slug: '', description: '', website_url: '', category: '' })
      setShowCreate(false)
    } catch { /* noop */ }
    setSaving(false)
  }

  const handleDelete = async (id: string | number) => {
    if (!confirm('Delete this entry?')) return
    await deleteDirectory(id)
    setEntries(prev => prev.filter(e => e.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Directories</h1>
          <p className="text-gray-400 text-sm mt-1">Manage directory listings</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#A165DB] text-white text-sm font-semibold hover:opacity-90">
          <Plus size={16} /> Add Entry
        </button>
      </div>

      {showCreate && (
        <div className="rounded-2xl border border-white/10 bg-[#1A1D24] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">New Directory Entry</h3>
            <button onClick={() => setShowCreate(false)} className="text-gray-400 hover:text-white"><X size={16} /></button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" className="px-4 py-2.5 rounded-xl border border-white/10 bg-[#0F1117] text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#A165DB]/50" />
            <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="slug" className="px-4 py-2.5 rounded-xl border border-white/10 bg-[#0F1117] text-white text-sm font-mono placeholder:text-gray-600 focus:outline-none focus:border-[#A165DB]/50" />
            <input value={form.website_url} onChange={(e) => setForm({ ...form, website_url: e.target.value })} placeholder="https://..." className="px-4 py-2.5 rounded-xl border border-white/10 bg-[#0F1117] text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#A165DB]/50" />
            <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Category" className="px-4 py-2.5 rounded-xl border border-white/10 bg-[#0F1117] text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#A165DB]/50" />
          </div>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" rows={3} className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#0F1117] text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#A165DB]/50" />
          <button onClick={handleCreate} disabled={saving || !form.title.trim()} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#A165DB] text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50">
            {saving ? <Loader2 size={14} className="animate-spin" /> : null}
            {saving ? 'Creating...' : 'Create'}
          </button>
        </div>
      )}

      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }} placeholder="Search entries..." className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-white/10 bg-[#1A1D24] text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#A165DB]/50" />
      </div>

      {loading ? (
        <div className="text-gray-400 text-sm">Loading...</div>
      ) : entries.length === 0 ? (
        <div className="text-gray-500 text-sm text-center py-12">No directory entries</div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-[#1A1D24] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Title</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Category</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Clicks</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Featured</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {entries.map((e) => (
                <tr key={e.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm text-white font-medium">{e.title}</div>
                    <div className="text-xs text-gray-500 truncate max-w-[200px]">{e.website_url}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">{e.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{e.click_count.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    {e.is_featured && <Star size={14} className="text-yellow-400 fill-yellow-400" />}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <a href={e.website_url} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"><ExternalLink size={14} /></a>
                      <button onClick={() => handleDelete(e.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10"><Trash2 size={14} /></button>
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
