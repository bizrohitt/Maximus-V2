import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import '../styles/globals.css'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { AnalyticsInit } from '@/components/analytics/AnalyticsInit'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Maximus — Best Free AI Tools 2026 | No Watermarks',
    template: '%s — Maximus',
  },
  description:
    'Find the best free AI tools for writing and productivity — plus browser utilities, PDF guides, and a free AI chat assistant. No sign-up required.',
  keywords: [
    'free AI tools', 'AI writing tools', 'AI productivity', 'AI chat assistant',
    'content creation AI', 'AI tools 2026', 'no watermark AI', 'AI blog writer',
    'AI headline generator', 'AI text humanizer', 'AI email writer', 'AI tools online',
  ],
  metadataBase: new URL('https://maximus.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'Maximus',
    title: 'Maximus — Best Free AI Tools 2026 | No Watermarks',
    description:
      'Find the best free AI tools for writing and productivity — no sign-up required.',
    url: 'https://maximus.io',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maximus — Best Free AI Tools 2026 | No Watermarks',
    description:
      'Find the best free AI tools for writing and productivity — no sign-up required.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebSite',
                  name: 'Maximus',
                  url: 'https://maximus.io',
                  description:
                    'Best free AI tools for writing and productivity — no sign-up required.',
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: 'https://maximus.io/search?q={search_term_string}',
                    'query-input': 'required name=search_term_string',
                  },
                },
                {
                  '@type': 'Organization',
                  name: 'Maximus',
                  url: 'https://maximus.io',
                  logo: 'https://maximus.io/logo.png',
                  sameAs: [],
                  description:
                    'Free AI tools for writing, productivity, and content creation.',
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-primary text-text-primary">
        <ThemeProvider>
          <AnalyticsInit />
          <SiteLayout>{children}</SiteLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
