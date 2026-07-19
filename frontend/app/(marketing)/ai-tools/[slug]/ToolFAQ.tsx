'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { ToolFAQ } from '@/lib/tools-data'

export function ToolFAQ({ faqs }: { faqs: ToolFAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i
        return (
          <div
            key={i}
            className="border border-border rounded-xl overflow-hidden bg-gray-50"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
            >
              <span className="text-sm font-medium text-text-primary pr-4">
                {faq.q}
              </span>
              <ChevronDown
                size={16}
                className={`text-text-muted flex-shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-4">
                <p className="text-sm text-text-secondary leading-relaxed">
                  {faq.a}
                </p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
