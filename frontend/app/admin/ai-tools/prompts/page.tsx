'use client'

import { useState, useEffect } from 'react'
import { FileText, Plus, Trash2, Edit3, X, Loader2 } from 'lucide-react'
import { getPromptTemplates, createPromptTemplate, deletePromptTemplate, updatePromptTemplate, type PromptTemplate } from '@/lib/admin-api'

export default function PromptsPage() {
  const [templates, setTemplates] = useState<PromptTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [editingId, setEditingId] = useState<string | number | null>(null)
  const [name, setName] = useState('')
  const [prompt, setPrompt] = useState('')
  const [category, setCategory] = useState('general')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getPromptTemplates().then((res) => { setTemplates(res.items); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const handleCreate = async () => {
    if (!name.trim() || !prompt.trim()) return
    setSaving(true)
    try {
      if (editingId) {
        await updatePromptTemplate(editingId, { name, prompt, category })
        setTemplates(prev => prev.map(t => t.id === editingId ? { ...t, name, prompt, category } : t))
      } else {
        const result = await createPromptTemplate({ name, prompt, category })
        setTemplates(prev => [{ id: result.id, name, prompt, category, is_active: true, created_at: new Date().toISOString() }, ...prev])
      }
      resetForm()
    } catch { /* noop */ }
    setSaving(false)
  }

  const handleDelete = async (id: string | number) => {
    if (!confirm('Delete this template?')) return
    await deletePromptTemplate(id)
    setTemplates(prev => prev.filter(t => t.id !== id))
  }

  const handleEdit = (t: PromptTemplate) => {
    setEditingId(t.id)
    setName(t.name)
    setPrompt(t.prompt)
    setCategory(t.category)
    setShowCreate(true)
  }

  const resetForm = () => {
    setName('')
    setPrompt('')
    setCategory('general')
    setEditingId(null)
    setShowCreate(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Prompt Templates</h1>
          <p className="text-gray-400 text-sm mt-1">{templates.length} reusable prompts</p>
        </div>
        <button onClick={() => { resetForm(); setShowCreate(true) }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#A165DB] text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          <Plus size={16} /> New Template
        </button>
      </div>

      {showCreate && (
        <div className="rounded-2xl border border-white/10 bg-[#1A1D24] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">{editingId ? 'Edit Template' : 'Create Template'}</h3>
            <button onClick={resetForm} className="text-gray-400 hover:text-white"><X size={16} /></button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Template name" className="px-4 py-2.5 rounded-xl border border-white/10 bg-[#0F1117] text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#A165DB]/50" />
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-4 py-2.5 rounded-xl border border-white/10 bg-[#0F1117] text-white text-sm focus:outline-none focus:border-[#A165DB]/50">
              <option value="general">General</option>
              <option value="seo">SEO</option>
              <option value="content">Content</option>
              <option value="email">Email</option>
              <option value="social">Social Media</option>
              <option value="code">Code</option>
            </select>
          </div>
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Write your prompt here. Use {{input}} as placeholder for user input." rows={6} className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#0F1117] text-white text-sm font-mono placeholder:text-gray-600 focus:outline-none focus:border-[#A165DB]/50" />
          <button onClick={handleCreate} disabled={saving || !name.trim() || !prompt.trim()} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#A165DB] text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50">
            {saving ? <Loader2 size={14} className="animate-spin" /> : null}
            {saving ? 'Saving...' : editingId ? 'Update' : 'Create'}
          </button>
        </div>
      )}

      {loading ? (
        <div className="text-gray-400 text-sm">Loading templates...</div>
      ) : templates.length === 0 ? (
        <div className="text-gray-500 text-sm text-center py-12">No templates yet</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((t) => (
            <div key={t.id} className="rounded-2xl border border-white/10 bg-[#1A1D24] p-5 flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#3B82F6]/15 flex items-center justify-center flex-shrink-0">
                  <FileText size={16} className="text-[#3B82F6]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white truncate">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.category}</div>
                </div>
              </div>
              <p className="text-xs text-gray-400 line-clamp-3 mb-4 flex-1 font-mono">{t.prompt}</p>
              <div className="flex items-center gap-2">
                <button onClick={() => handleEdit(t)} className="flex-1 py-1.5 rounded-lg border border-white/10 text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-center gap-1">
                  <Edit3 size={12} /> Edit
                </button>
                <button onClick={() => handleDelete(t.id)} className="flex-1 py-1.5 rounded-lg border border-white/10 text-xs text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors flex items-center justify-center gap-1">
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
