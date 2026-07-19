import type { Metadata } from 'next'
import { ContactContent } from './ContactContent'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Maximus team — questions, feedback, or support requests welcome.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Us | Maximus',
    description: 'Get in touch with the Maximus team — questions, feedback, or support requests welcome.',
    type: 'website',
  },
}

export default function ContactPage() {
  return <ContactContent />
}
