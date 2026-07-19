'use client'

import { useState, useEffect } from 'react'
import { Monitor, Eye, Clock } from 'lucide-react'
import { getPopups, type PopupBanner } from '@/lib/admin-api'

export default function PopupsPage() {
  const [popups, setPopups] = useState<PopupBanner[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPopups().then((res) => { setPopups(res.items); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Popups & Banners</h1>
        <p className="text-gray-400 text-sm mt-1">Manage promotional popups and banners</p>
      </div>

      {loading ? (
        <div className="text-gray-400 text-sm">Loading popups...</div>
      ) : popups.length === 0 ? (
        <div className="text-gray-500 text-sm text-center py-12">No popups configured</div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {popups.map((popup) => (
            <div key={popup.id} className="rounded-2xl border border-white/10 bg-[#1A1D24] p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E67E22]/15 flex items-center justify-center">
                    <Monitor size={16} className="text-[#E67E22]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{popup.name}</div>
                    <div className="text-xs text-gray-500">{popup.title}</div>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  popup.is_active ? 'bg-emerald-500/15 text-emerald-400' : 'bg-gray-500/15 text-gray-400'
                }`}>
                  {popup.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <p className="text-xs text-gray-400 line-clamp-2 mb-3">{popup.content}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Eye size={12} />
                  <span>{popup.button_text}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  <span>After {popup.show_after_seconds}s</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
