'use client'

import { useState, useEffect } from 'react'
import { FolderOpen, Download, Trash2 } from 'lucide-react'
import { getResources, deleteResource, type Resource } from '@/lib/admin-api'

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    getResources(page).then((res) => {
      setResources(res.items)
      setTotalPages(res.total_pages)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [page])

  const handleDelete = async (id: string | number) => {
    if (!confirm('Deactivate this resource?')) return
    await deleteResource(id)
    setResources(prev => prev.map(r => r.id === id ? { ...r, is_active: false } : r))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Resources</h1>
        <p className="text-gray-400 text-sm mt-1">Manage downloadable resources</p>
      </div>

      {loading ? (
        <div className="text-gray-400 text-sm">Loading...</div>
      ) : resources.length === 0 ? (
        <div className="text-gray-500 text-sm text-center py-12">No resources yet</div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-[#1A1D24] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Resource</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Category</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Downloads</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {resources.map((r) => (
                <tr key={r.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-500/15 flex items-center justify-center">
                        <FolderOpen size={16} className="text-blue-400" />
                      </div>
                      <div>
                        <div className="text-sm text-white font-medium">{r.title}</div>
                        <div className="text-xs text-gray-500 truncate max-w-[200px]">{r.description || 'No description'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">{r.category || '—'}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{r.download_count.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${r.is_active ? 'bg-emerald-500/15 text-emerald-400' : 'bg-gray-500/15 text-gray-400'}`}>
                      {r.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleDelete(r.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10"><Trash2 size={14} /></button>
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
