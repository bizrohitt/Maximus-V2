import type { Metadata } from 'next'
import { ResourcesContent } from './ResourcesContent'

export const metadata: Metadata = {
  title: 'Resources I Use',
  description: 'The AI tools, design software, and productivity apps I personally use and recommend for content creators.',
  keywords: ['best AI tools', 'creator tools', 'productivity apps', 'recommended software'],
  alternates: { canonical: '/resources' },
  openGraph: {
    title: 'Resources & Tools I Use | Maximus',
    description: 'The AI tools, design software, and productivity apps I personally use and recommend.',
    type: 'website',
  },
}

export default function ResourcesPage() {
  return <ResourcesContent />
}
