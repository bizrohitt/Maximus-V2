'use client'

import { useState, useEffect } from 'react'
import { Sparkles, Power, AlertCircle } from 'lucide-react'
import { getTools } from '@/lib/admin-api'

interface Tool {
  id: number
  name: string
  slug: string
  description: string
  icon: string
  is_free: boolean
  usage_count: number
}

export default function AIToolsPage() {
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const data = await getTools()
        setTools(data)
      } catch {
        setError('Could not load tools from API')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const totalUsage = tools.reduce((sum, t) => sum + t.usage_count, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">AI Tools Manager</h1>
        <p className="text-gray-400 text-sm mt-1">Manage AI tools and monitor usage</p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-yellow-500/15 border border-yellow-500/20 text-yellow-400 text-sm flex items-center gap-2">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-white/10 bg-[#1A1D24] p-5">
          <div className="text-2xl font-bold text-white">{tools.length}</div>
          <div className="text-xs text-gray-500 mt-1">Total Tools</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#1A1D24] p-5">
          <div className="text-2xl font-bold text-white">{totalUsage.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-1">Total Usage</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#1A1D24] p-5">
          <div className="text-2xl font-bold text-white">{tools.filter(t => t.is_free).length}</div>
          <div className="text-xs text-gray-500 mt-1">Free Tools</div>
        </div>
      </div>

      {/* Tools Table */}
      <div className="rounded-2xl border border-white/10 bg-[#1A1D24] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Tool</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Slug</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Type</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Usage</th>
              <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-500 text-sm">Loading...</td></tr>
            ) : tools.length > 0 ? tools.map((tool) => (
              <tr key={tool.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[var(--color-secondary)]/15 flex items-center justify-center">
                      <Sparkles size={16} className="text-[var(--color-secondary)]" />
                    </div>
                    <div>
                      <div className="text-sm text-white font-medium">{tool.name}</div>
                      <div className="text-xs text-gray-500 truncate max-w-xs">{tool.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400 font-mono">{tool.slug}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${tool.is_free ? 'bg-emerald-500/15 text-emerald-400' : 'bg-blue-500/15 text-blue-400'}`}>
                    {tool.is_free ? 'Free' : 'Paid'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">{tool.usage_count.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <a
                      href={`/ai-tools/${tool.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors text-xs"
                    >
                      View
                    </a>
                  </div>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-500 text-sm">No tools found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
