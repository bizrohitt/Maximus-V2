'use client'

import { useState, useEffect } from 'react'
import { Puzzle, Download, Star, Settings } from 'lucide-react'
import { getPlugins, type PluginEntry } from '@/lib/admin-api'

export default function PluginsPage() {
  const [plugins, setPlugins] = useState<PluginEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    getPlugins(page).then((res) => {
      setPlugins(res.items)
      setTotalPages(res.total_pages)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [page])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Plugins</h1>
        <p className="text-gray-400 text-sm mt-1">Extension marketplace and management</p>
      </div>

      {loading ? (
        <div className="text-gray-400 text-sm">Loading...</div>
      ) : plugins.length === 0 ? (
        <div className="text-gray-500 text-sm text-center py-12">No plugins installed</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {plugins.map((p) => (
            <div key={p.id} className="rounded-2xl border border-white/10 bg-[#1A1D24] p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#E67E22]/15 flex items-center justify-center">
                  <Puzzle size={18} className="text-[#E67E22]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white truncate">{p.name}</div>
                  <div className="text-xs text-gray-500">v{p.version} by {p.author}</div>
                </div>
              </div>
              <p className="text-xs text-gray-400 line-clamp-2 mb-4">{p.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><Download size={12} /> {p.download_count.toLocaleString()}</span>
                  <span>${p.price.toFixed(2)}</span>
                </div>
                <span className={`font-medium px-2 py-0.5 rounded-full ${p.is_active ? 'bg-emerald-500/15 text-emerald-400' : 'bg-gray-500/15 text-gray-400'}`}>
                  {p.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
