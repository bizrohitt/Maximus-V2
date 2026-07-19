'use client'

import { useState } from 'react'
import { Sparkles, Loader2, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button/Button'
import type { Tool } from '@/lib/tools-data'
import { ChatTool } from '@/components/tools/ChatTool'
import { PdfTool } from '@/components/tools/PdfTool'
import { KeywordTool } from '@/components/tools/KeywordTool'
import { UrlTool } from '@/components/tools/UrlTool'
import { CopyButton } from '@/components/tools/CopyButton'

async function apiGenerate(prompt: string, toolSlug: string): Promise<string> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'}/api/v1/generate/`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, tool: toolSlug }),
    }
  )
  const data = await res.json()
  return data.success ? data.content : `Error: ${data.error ?? 'Something went wrong'}`
}

export function ToolClient({ tool }: { tool: Tool }) {
  if (tool.slug === 'ai-assistant') return <ChatTool generate={(p) => apiGenerate(p, tool.slug)} />
  if (tool.slug === 'ai-pdf-reader') return <PdfTool generate={(p) => apiGenerate(p, tool.slug)} />
  if (tool.slug === 'keyword-research') return <KeywordTool />
  if (tool.slug === 'seo-audit') return <UrlTool endpoint="seo-audit" />
  if (tool.slug === 'website-speed') return <UrlTool endpoint="website-speed" />
  return <StandardTool tool={tool} />
}

function StandardTool({ tool }: { tool: Tool }) {
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const generate = async () => {
    if (!prompt.trim()) return
    setLoading(true)
    setResult('')
    setShowResult(true)
    const text = await apiGenerate(prompt, tool.slug)
    setResult(text)
    setLoading(false)
  }

  const items = parseListItems(result)

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-primary rounded-2xl border border-border p-5 md:p-8">
        <label className="block text-sm font-medium text-text-primary mb-2">
          What do you want to create?
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={tool.placeholder}
          rows={4}
          className="w-full border border-border rounded-xl px-4 py-3 text-sm text-text-primary bg-gray-50 resize-none focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all mb-4"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) generate()
          }}
        />
        <div className="flex items-center gap-3">
          <Button onClick={generate} disabled={loading || !prompt.trim()} loading={loading}>
            <Sparkles size={14} />
            Generate
          </Button>
          <span className="text-xs text-text-muted hidden sm:inline">Ctrl+Enter</span>
        </div>

        {showResult && !loading && result && (
          <div className="mt-6">
            {items.length > 1 ? (
              <div className="space-y-2">
                {items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-border bg-gray-50 hover:bg-primary transition-colors">
                    <span className="text-sm text-text-primary pr-3">{item}</span>
                    <CopyButton text={item} />
                  </div>
                ))}
              </div>
            ) : tool.slug === 'content-outline-builder' ? (
              <div className="rounded-xl border border-border bg-gray-50 p-4 md:p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-accent" />
                    <p className="text-xs font-medium uppercase tracking-wide text-text-muted">Outline</p>
                  </div>
                  <CopyButton text={result} />
                </div>
                <div className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: renderOutline(result) }} />
              </div>
            ) : (
              <div className="rounded-xl border border-border bg-gray-50 p-4 md:p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-accent" />
                    <p className="text-xs font-medium uppercase tracking-wide text-text-muted">Result</p>
                  </div>
                  <CopyButton text={result} />
                </div>
                <p className="text-sm text-text-primary whitespace-pre-wrap leading-relaxed">{result}</p>
              </div>
            )}
          </div>
        )}

        {showResult && loading && (
          <div className="mt-6 rounded-xl border border-border bg-gray-50 p-4 md:p-5">
            <div className="flex items-center gap-2 mb-3">
              <Loader2 size={14} className="animate-spin text-yellow-500" />
              <p className="text-xs font-medium uppercase tracking-wide text-text-muted">Generating...</p>
            </div>
            <p className="text-sm text-text-muted">AI is working on your request...</p>
          </div>
        )}
      </div>

      <div className="mt-5">
        <p className="text-xs text-text-muted mb-2">Try one of these:</p>
        <div className="flex flex-wrap gap-2">
          {tool.useCases.map((uc) => (
            <button
              key={uc}
              onClick={() => { setPrompt(uc); setShowResult(false); setResult('') }}
              className="px-3 py-1.5 rounded-full border border-border bg-primary text-xs text-text-secondary hover:border-secondary/40 hover:text-secondary transition-colors cursor-pointer"
            >
              {uc}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function parseListItems(text: string): string[] {
  return text.split('\n').filter((l) => l.trim().startsWith('- ')).map((l) => l.replace(/^-\s*/, '').trim())
}

function renderOutline(text: string): string {
  return text
    .split('\n')
    .map((l) => {
      if (l.startsWith('## ')) return `<h4 class="font-semibold text-text-primary mt-4 mb-1 text-sm">${l.replace('## ', '')}</h4>`
      if (l.startsWith('# ')) return `<h3 class="font-bold text-text-primary mt-5 mb-2">${l.replace('# ', '')}</h3>`
      if (l.trim().startsWith('- ')) return `<li class="text-text-secondary ml-4 text-sm">${l.replace(/^-\s*/, '')}</li>`
      if (l.trim()) return `<p class="text-sm text-text-secondary mt-1">${l}</p>`
      return ''
    })
    .join('\n')
}
