import Link from 'next/link';
import { Logo } from '@/components/Logo';

export const metadata = {
  title: 'Terms of Service — Blendify',
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen px-6 py-20 max-w-3xl mx-auto">
      <Link href="/" className="flex items-center gap-3 text-white/40 hover:text-white/60 text-sm mb-8 inline-flex">
        <Logo size={32} className="rounded-lg" />
        ← Back to Blendify
      </Link>

      <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
      <p className="text-white/40 mb-10">Last updated: May 23, 2026</p>

      <div className="space-y-8 text-white/70 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Blendify, you agree to be bound by these Terms of Service.
            If you do not agree to these terms, please do not use the service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">2. Description of Service</h2>
          <p>
            Blendify is a music blend platform that compares listening histories across
            Last.fm and YouTube Music to generate compatibility scores, shared artist
            insights, and collaborative playlists.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">3. User Accounts</h2>
          <p>
            You authenticate through third-party platforms (Google, Last.fm). You are
            responsible for maintaining the security of your connected accounts.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">4. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Use the service for any unlawful purpose</li>
            <li>Attempt to gain unauthorized access to the service or its systems</li>
            <li>Abuse, harass, or harm other users through the platform</li>
            <li>Reverse-engineer or scrape data from the service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">5. Intellectual Property</h2>
          <p>
            All content, design, and branding of Blendify are owned by Blendify.
            Music data and metadata belong to their respective rights holders.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">6. Limitation of Liability</h2>
          <p>
            Blendify is provided &quot;as is&quot; without warranties of any kind. We are not
            liable for any damages arising from your use of the service, including but
            not limited to data loss or service interruptions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">7. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your access to Blendify at any
            time for violation of these terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">8. Changes to Terms</h2>
          <p>
            We may update these terms from time to time. Continued use of the service
            after changes constitutes acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">9. Contact</h2>
          <p>
            For questions about these terms, contact us at{' '}
            <a href="mailto:support@useblendify.com" className="text-purple-400 hover:underline">
              support@useblendify.com
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
