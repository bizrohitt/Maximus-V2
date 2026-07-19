'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ContentPage() {
  const router = useRouter()
  useEffect(() => { router.replace('/admin/content/blog') }, [router])
  return <div className="text-gray-400 text-sm">Redirecting to Blog Posts...</div>
}
