import type { Metadata } from 'next'
import { NewsletterContent } from './NewsletterContent'

export const metadata: Metadata = {
  title: 'Newsletter',
  description: 'Get weekly AI tool recommendations, creator tips, and exclusive resources — join the Maximus newsletter.',
  keywords: ['AI newsletter', 'creator newsletter', 'AI tools weekly', 'content creator tips'],
  alternates: { canonical: '/newsletter' },
  openGraph: {
    title: 'Weekly AI & Creator Newsletter | Maximus',
    description: 'Get weekly AI tool recommendations, creator tips, and exclusive resources.',
    type: 'website',
  },
}

export default function NewsletterPage() {
  return <NewsletterContent />
}
