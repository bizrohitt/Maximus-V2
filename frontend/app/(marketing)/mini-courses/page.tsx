import type { Metadata } from 'next'
import { MiniCoursesContent } from './MiniCoursesContent'

export const metadata: Metadata = {
  title: 'Mini Courses',
  description: 'Free mini courses on AI content creation, YouTube growth, SEO, and faceless branding — learn at your own pace.',
  keywords: ['free AI course', 'content creation course', 'YouTube growth', 'SEO course', 'faceless brand'],
  alternates: { canonical: '/mini-courses' },
  openGraph: {
    title: 'Free Mini Courses for Content Creators | Maximus',
    description: 'Free mini courses on AI content creation, YouTube growth, SEO, and faceless branding.',
    type: 'website',
  },
}

export default function MiniCoursesPage() {
  return <MiniCoursesContent />
}
