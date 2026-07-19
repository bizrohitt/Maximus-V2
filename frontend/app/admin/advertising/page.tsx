'use client'

import { useState, useEffect } from 'react'
import { Monitor, AlertCircle } from 'lucide-react'
import { getAdBanners, getAdPopups } from '@/lib/admin-api'

export default function AdvertisingPage() {
  const [banners, setBanners] = useState<Array<{ id: number; name: string; placement: string; is_active: boolean; priority: number }>>([])
  const [popups, setPopups] = useState<Array<{ id: number; name: string; title: string; is_active: boolean; show_after_seconds: number }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const [b, p] = await Promise.allSettled([getAdBanners(), getAdPopups()])
        if (b.status === 'fulfilled') setBanners(b.value)
        if (p.status === 'fulfilled') setPopups(p.value)
      } catch {
        setError('Could not load ads from API')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Advertising</h1>
        <p className="text-gray-400 text-sm mt-1">Manage ad banners and popups</p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-yellow-500/15 border border-yellow-500/20 text-yellow-400 text-sm flex items-center gap-2">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {/* Banners */}
      <div className="rounded-2xl border border-white/10 bg-[#1A1D24] overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="font-semibold text-white">Ad Banners ({banners.length})</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Name</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Placement</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Priority</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500 text-sm">Loading...</td></tr>
            ) : banners.length > 0 ? banners.map((b) => (
              <tr key={b.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-sm text-white">{b.name}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{b.placement}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${b.is_active ? 'bg-emerald-500/15 text-emerald-400' : 'bg-gray-500/15 text-gray-400'}`}>
                    {b.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">{b.priority}</td>
              </tr>
            )) : (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500 text-sm">No banners found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Popups */}
      <div className="rounded-2xl border border-white/10 bg-[#1A1D24] overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="font-semibold text-white">Popups ({popups.length})</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Name</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Title</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Show After</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500 text-sm">Loading...</td></tr>
            ) : popups.length > 0 ? popups.map((p) => (
              <tr key={p.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-sm text-white">{p.name}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{p.title}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${p.is_active ? 'bg-emerald-500/15 text-emerald-400' : 'bg-gray-500/15 text-gray-400'}`}>
                    {p.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">{p.show_after_seconds}s</td>
              </tr>
            )) : (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500 text-sm">No popups found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
