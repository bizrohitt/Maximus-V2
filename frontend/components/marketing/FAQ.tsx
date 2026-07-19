'use client'

import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import Link from 'next/link'

const faqs = [
  'What is Maximus?',
  'Is it really free?',
  'Do I need to create an account?',
  'What AI models do you use?',
  'Can I use Maximus for commercial projects?',
  'How do I get support?',
]

const faqAnswers: Record<string, string> = {
  'What is Maximus?': 'Maximus is an all-in-one platform that gives you access to AI tools for writing, SEO optimization, and productivity — all in a single dashboard.',
  'Is it really free?': 'Yes. Our core tools are free forever with no credit card required. We may offer premium features in the future, but the free tier will always remain available.',
  'Do I need to create an account?': 'No account is needed to explore the platform. You can start using the free tools immediately. Signing up lets you save your work and access your dashboard.',
  'What AI models do you use?': 'We integrate with leading AI providers including OpenAI, Stability AI, and others. We continuously update our models to give you the best results.',
  'Can I use Maximus for commercial projects?': 'Absolutely. All content you generate is yours to use commercially. There are no usage restrictions on the free plan.',
  'How do I get support?': 'You can reach us through the Contact page. We respond to all inquiries within 24 hours on business days.',
}

function FaqItem({ q }: { q: string }) {
  const [open, setOpen] = useState(false)
  const a = faqAnswers[q]

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-5 text-left cursor-pointer group"
      >
        <span className="text-base font-medium text-gray-900 group-hover:text-secondary transition-colors pr-4">
          {q}
        </span>
        <ChevronDown size={20} className={`flex-shrink-0 text-gray-400 group-hover:text-secondary transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="pb-5 text-sm text-gray-500 leading-relaxed">
          {a}
        </p>
      </div>
    </div>
  )
}

export function FAQ() {
  return (
    <section className="py-16 md:py-24 bg-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Left Column */}
          <div className="md:sticky md:top-32">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 text-xs font-medium mb-6">
              <HelpCircle size={14} />
              Got Questions?
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-5">
              Everything You Need{' '}
              <span className="text-secondary">to Know</span>
            </h2>

            <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-md">
              We know switching to new tools can raise a lot of questions. Here are the ones we hear most — answered clearly so you can get started with confidence.
            </p>

            <div className="p-5 rounded-2xl border border-gray-200 bg-gray-50/50">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full border-2 border-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <HelpCircle size={16} className="text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Still have a question?{' '}
                    <Link href="/contact" className="font-semibold text-secondary hover:underline">
                      Reach out to us
                    </Link>{' '}
                    — we&apos;re happy to help, no commitment needed.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            {faqs.map((q) => (
              <FaqItem key={q} q={q} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
