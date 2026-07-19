import type { Metadata } from 'next'
import { DollarSign, Users, TrendingUp, Gift } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Affiliate Program',
  description: 'Earn recurring commissions by referring creators to Maximus. Join our affiliate program today.',
  alternates: { canonical: '/affiliate' },
}

const benefits = [
  {
    icon: DollarSign,
    title: '30% Recurring Commission',
    description: 'Earn 30% of every monthly payment for the lifetime of the referral.',
  },
  {
    icon: Users,
    title: 'Dedicated Dashboard',
    description: 'Track clicks, sign-ups, and earnings in real time from your dashboard.',
  },
  {
    icon: TrendingUp,
    title: 'No Earning Cap',
    description: 'Refer as many creators as you like — there is no limit on your earnings.',
  },
  {
    icon: Gift,
    title: 'Exclusive Perks',
    description: 'Get early access to new features and a free Maximus Pro account.',
  },
]

const faqs = [
  {
    q: 'How do I get paid?',
    a: 'We pay affiliates monthly via Stripe Connect. You need a valid Stripe account to receive payouts.',
  },
  {
    q: 'Is there a minimum payout?',
    a: 'The minimum payout is $50. Earnings below this threshold roll over to the next month.',
  },
  {
    q: 'How long does the cookie last?',
    a: 'Referral cookies last 60 days. If a referred user signs up within that window, you get credit.',
  },
  {
    q: 'Can I promote on any channel?',
    a: 'Yes — blogs, YouTube, social media, newsletters, and paid ads are all allowed, provided you follow our brand guidelines.',
  },
]

export default function AffiliatePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 md:mb-6">
            Earn with the Maximus Affiliate Program
          </h1>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-8">
            Love Maximus? Share it with other creators and earn recurring revenue for every referral.
          </p>
          <a
            href="mailto:affiliates@maximus.dev?subject=Affiliate%20Application"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-secondary text-white font-semibold text-sm hover:bg-secondary-hover transition-colors"
          >
            Apply Now
          </a>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary text-center mb-12">Why Join?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-primary rounded-2xl p-6 border border-border">
                <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-secondary" />
                </div>
                <h3 className="font-semibold text-text-primary mb-2">{title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '1', title: 'Apply', text: 'Send us your application. We review within 48 hours.' },
              { step: '2', title: 'Share', text: 'Get your unique referral link and share it with your audience.' },
              { step: '3', title: 'Earn', text: 'Earn 30% recurring commission for every paying referral.' },
            ].map(({ step, title, text }) => (
              <div key={step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-secondary text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {step}
                </div>
                <h3 className="font-semibold text-text-primary mb-2">{title}</h3>
                <p className="text-sm text-text-secondary">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="bg-primary rounded-2xl p-6 border border-border">
                <h3 className="font-semibold text-text-primary mb-2">{q}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">Ready to Start Earning?</h2>
          <p className="text-text-secondary mb-8">Join the Maximus Affiliate Program today and turn your audience into recurring revenue.</p>
          <a
            href="mailto:affiliates@maximus.dev?subject=Affiliate%20Application"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-secondary text-white font-semibold text-sm hover:bg-secondary-hover transition-colors"
          >
            Apply Now
          </a>
        </div>
      </section>
    </>
  )
}
