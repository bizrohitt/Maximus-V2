import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Maximus Privacy Policy — how we collect, use, and protect your data.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return (
    <section className="bg-primary py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">Privacy Policy</h1>
        <p className="text-sm text-text-muted mb-10">Last updated: July 7, 2026</p>

        <div className="prose prose-gray max-w-none text-text-secondary text-[15px] leading-relaxed space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">1. Information We Collect</h2>
            <p>We collect information you provide directly, including:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Account data</strong> — name, email address, and password when you create an account.</li>
              <li><strong>Payment data</strong> — billing information processed securely through our payment provider.</li>
              <li><strong>User content</strong> — prompts, uploads, and generated content within the Platform.</li>
              <li><strong>Communications</strong> — messages you send us via email or the contact form.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">2. How We Use Your Information</h2>
            <p>We use collected information to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Provide, maintain, and improve the Platform.</li>
              <li>Process transactions and send billing-related communications.</li>
              <li>Send product updates and marketing communications (opt-out available).</li>
              <li>Detect and prevent fraud, abuse, and security incidents.</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">3. AI &amp; Data Processing</h2>
            <p>
              Content you submit to AI tools may be processed by third-party AI providers. We do not use your private content to train models. Aggregated, anonymised usage data may be used to improve service quality.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">4. Data Sharing</h2>
            <p>We do not sell your personal information. We may share data with:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Service providers who assist in operating the Platform (hosting, payment processing, analytics).</li>
              <li>Law enforcement when required by valid legal process.</li>
              <li>In connection with a merger, acquisition, or sale of assets, with appropriate notice.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">5. Data Security</h2>
            <p>
              We implement industry-standard security measures including encryption in transit (TLS) and at rest, access controls, and regular security audits. No system is 100% secure; we encourage strong passwords and 2FA.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">6. Your Rights</h2>
            <p>Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Access, correct, or delete your personal data.</li>
              <li>Export your data in a portable format.</li>
              <li>Opt out of marketing communications.</li>
              <li>Restrict or object to certain processing activities.</li>
            </ul>
            <p className="mt-2">
              To exercise these rights, email us at <a href="mailto:privacy@maximus.dev" className="text-secondary hover:underline">privacy@maximus.dev</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">7. Data Retention</h2>
            <p>
              We retain your data for as long as your account is active or as needed to provide the Platform. After account deletion, we remove personal data within 30 days, except where retention is required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">8. Cookies</h2>
            <p>
              We use essential cookies for authentication and session management. Analytics cookies (e.g., for usage statistics) are used only with your consent. You can manage cookie preferences in your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. Material changes will be notified via the Platform or email. Your continued use after changes take effect constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">10. Contact</h2>
            <p>
              For privacy-related enquiries: <a href="mailto:privacy@maximus.dev" className="text-secondary hover:underline">privacy@maximus.dev</a> or <a href="/contact" className="text-secondary hover:underline">contact us</a>.
            </p>
          </section>
        </div>
      </div>
    </section>
  )
}
