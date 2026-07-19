import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description: 'Maximus Affiliate Disclosure — how we earn commissions and our commitment to honest recommendations.',
  alternates: { canonical: '/affiliate-disclosure' },
}

export default function AffiliateDisclosurePage() {
  return (
    <section className="bg-primary py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">Affiliate Disclosure</h1>
        <p className="text-sm text-text-muted mb-10">Last updated: July 7, 2026</p>

        <div className="prose prose-gray max-w-none text-text-secondary text-[15px] leading-relaxed space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">What Are Affiliate Links?</h2>
            <p>
              Some of the links on Maximus are affiliate links. This means if you click on a link and purchase a product or service, we may receive a commission from the provider at no extra cost to you. Affiliate links help us keep Maximus free and fund the creation of content, tools, and resources for our community.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">Our Commitment to You</h2>
            <p>
              We only recommend products and services that we have personally used, thoroughly tested, or genuinely believe provide value to our audience. Our editorial opinions are our own and are not influenced by compensation. Every tool listed on Maximus goes through our evaluation process before being featured.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">How Affiliate Revenue Supports Maximus</h2>
            <p>
              Revenue generated through affiliate partnerships allows us to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Keep all Maximus AI tools free to use</li>
              <li>Maintain and improve existing features</li>
              <li>Develop new tools and resources</li>
              <li>Cover hosting, API, and infrastructure costs</li>
              <li>Continue producing honest, independent content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">No Additional Cost to You</h2>
            <p>
              Using affiliate links never increases the price you pay. In many cases, our partnerships allow us to negotiate exclusive discounts that are only available through Maximus. You may actually pay less by using our links.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">FTC Compliance</h2>
            <p>
              In accordance with the Federal Trade Commission (FTC) guidelines, we disclose that we receive compensation for referral traffic and purchases made through affiliate links on this website. This disclosure is provided in accordance with 16 CFR Part 255 of the FTC&apos;s Guides Concerning the Use of Endorsements and Testimonials in Advertising.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">Third-Party Links</h2>
            <p>
              Maximus may also contain links to third-party websites that are not affiliate partners. We are not responsible for the content, privacy practices, or terms of those external sites. We encourage you to review their policies independently.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">Questions?</h2>
            <p>
              If you have any questions about this disclosure or our affiliate relationships, please <a href="/contact" className="text-secondary hover:underline">contact us</a>.
            </p>
          </section>
        </div>
      </div>
    </section>
  )
}
