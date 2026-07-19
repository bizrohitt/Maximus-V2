'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      onClick={copy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary border border-border hover:bg-gray-50 transition-colors cursor-pointer"
    >
      {copied ? <Check size={12} className="text-accent" /> : <Copy size={12} />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}
