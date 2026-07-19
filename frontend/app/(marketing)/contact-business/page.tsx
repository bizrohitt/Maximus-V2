import type { Metadata } from 'next'
import { ContactBusinessContent } from './ContactBusinessContent'

export const metadata: Metadata = {
  title: 'Business Inquiries',
  description: 'Partnership, sponsorship, and business development inquiries — let\'s build something together.',
  alternates: { canonical: '/contact-business' },
  openGraph: {
    title: 'Business Inquiries | Maximus',
    description: 'Partnership, sponsorship, and business development inquiries.',
    type: 'website',
  },
}

export default function ContactBusinessPage() {
  return <ContactBusinessContent />
}
