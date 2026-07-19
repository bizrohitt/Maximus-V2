'use client'

import { useState, useEffect } from 'react'
import { Settings, Save, Loader2 } from 'lucide-react'
import { getSiteSettings, updateSiteSettings, type SiteSettingsData } from '@/lib/admin-api'

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettingsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    getSiteSettings().then((s) => { setSettings(s); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    if (!settings) return
    setSaving(true)
    setSaved(false)
    try {
      await updateSiteSettings(settings)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch { /* noop */ }
    setSaving(false)
  }

  if (loading) return <div className="text-gray-400 text-sm">Loading settings...</div>
  if (!settings) return <div className="text-gray-500 text-sm">Failed to load settings</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Site Settings</h1>
          <p className="text-gray-400 text-sm mt-1">Configure your site branding and preferences</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#A165DB] text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-white/10 bg-[#1A1D24] p-6 space-y-4">
          <h2 className="font-semibold text-white">Branding</h2>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Site Name</label>
            <input value={settings.site_name} onChange={(e) => setSettings({ ...settings, site_name: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#0F1117] text-white text-sm focus:outline-none focus:border-[#A165DB]/50" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Footer Text</label>
            <input value={settings.footer_text} onChange={(e) => setSettings({ ...settings, footer_text: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#0F1117] text-white text-sm focus:outline-none focus:border-[#A165DB]/50" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Primary Color</label>
            <div className="flex items-center gap-3">
              <input type="color" value={settings.primary_color} onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })} className="w-10 h-10 rounded-lg border-0 cursor-pointer" />
              <input value={settings.primary_color} onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })} className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 bg-[#0F1117] text-white text-sm font-mono focus:outline-none focus:border-[#A165DB]/50" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Accent Color</label>
            <div className="flex items-center gap-3">
              <input type="color" value={settings.accent_color} onChange={(e) => setSettings({ ...settings, accent_color: e.target.value })} className="w-10 h-10 rounded-lg border-0 cursor-pointer" />
              <input value={settings.accent_color} onChange={(e) => setSettings({ ...settings, accent_color: e.target.value })} className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 bg-[#0F1117] text-white text-sm font-mono focus:outline-none focus:border-[#A165DB]/50" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#1A1D24] p-6 space-y-4">
          <h2 className="font-semibold text-white">Email</h2>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">From Email</label>
            <input value={settings.email_from} onChange={(e) => setSettings({ ...settings, email_from: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#0F1117] text-white text-sm focus:outline-none focus:border-[#A165DB]/50" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Social Links (JSON)</label>
            <textarea value={JSON.stringify(settings.social_links, null, 2)} onChange={(e) => { try { setSettings({ ...settings, social_links: JSON.parse(e.target.value) }) } catch {} }} rows={4} className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#0F1117] text-white text-sm font-mono focus:outline-none focus:border-[#A165DB]/50" />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSettings({ ...settings, enable_ads: !settings.enable_ads })}
              className={`w-11 h-6 rounded-full transition-colors ${settings.enable_ads ? 'bg-[#3ECF8E]' : 'bg-white/10'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${settings.enable_ads ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
            </button>
            <span className="text-sm text-gray-300">Enable Advertisements</span>
          </div>
        </div>
      </div>
    </div>
  )
}
