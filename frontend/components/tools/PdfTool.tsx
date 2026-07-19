'use client'

import { useState, useRef } from 'react'
import { Upload, FileText, Loader2, Check, X } from 'lucide-react'
import { CopyButton } from './CopyButton'

export function PdfTool({ generate }: { generate: (prompt: string) => Promise<string> }) {
  const [file, setFile] = useState<File | null>(null)
  const [question, setQuestion] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f && f.type === 'application/pdf') setFile(f)
  }

  const analyze = async () => {
    if (!file || !question.trim()) return
    setLoading(true)
    setResult('')
    // ponytail: passes filename as context, real PDF parsing requires server-side
    const reply = await generate(`[PDF: ${file.name}] ${question}`)
    setResult(reply)
    setLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-primary rounded-2xl border border-border p-5 md:p-8">
        {!file ? (
          <div
            onClick={() => inputRef.current?.click()}
            className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-secondary/40 transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-3">
              <Upload size={20} className="text-secondary" />
            </div>
            <p className="text-sm font-medium text-text-primary mb-1">Upload a PDF</p>
            <p className="text-xs text-text-muted">Drag and drop or click to browse</p>
            <input ref={inputRef} type="file" accept=".pdf" onChange={handleFile} className="hidden" />
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-border mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <FileText size={18} className="text-secondary" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">{file.name}</p>
                <p className="text-xs text-text-muted">{(file.size / 1024).toFixed(0)} KB</p>
              </div>
            </div>
            <button onClick={() => { setFile(null); setResult('') }} className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
              <X size={16} className="text-text-muted" />
            </button>
          </div>
        )}

        {file && (
          <>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question about this PDF..."
              rows={3}
              className="w-full border border-border rounded-xl px-4 py-3 text-sm text-text-primary bg-gray-50 resize-none focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all mb-4"
            />
            <button
              onClick={analyze}
              disabled={loading || !question.trim()}
              className="w-full py-3 rounded-xl bg-secondary text-white text-sm font-semibold hover:bg-secondary-hover transition-colors disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? <><Loader2 size={16} className="animate-spin" /> Analyzing...</> : <><FileText size={15} /> Analyze PDF</>}
            </button>
          </>
        )}

        {result && (
          <div className="mt-4 rounded-xl border border-border bg-gray-50 p-4 md:p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Check size={14} className="text-accent" />
                <p className="text-xs font-medium uppercase tracking-wide text-text-muted">Analysis</p>
              </div>
              <CopyButton text={result} />
            </div>
            <p className="text-sm text-text-primary whitespace-pre-wrap leading-relaxed">{result}</p>
          </div>
        )}
      </div>
    </div>
  )
}
