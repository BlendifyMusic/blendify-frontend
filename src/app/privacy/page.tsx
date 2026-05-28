import Link from 'next/link';
import { Logo } from '@/components/Logo';

export const metadata = {
  title: 'Privacy Policy — Blendify',
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen px-6 py-20 max-w-3xl mx-auto">
      <Link href="/" className="flex items-center gap-3 text-white/40 hover:text-white/60 text-sm mb-8 inline-flex">
        <Logo size={32} className="rounded-lg" />
        ← Back to Blendify
      </Link>

      <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-white/40 mb-10">Last updated: May 23, 2026</p>

      <div className="space-y-8 text-white/70 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h2>
          <p>
            When you use Blendify, we collect the following information through the platforms you connect:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Your public profile information (name, email) from Google/YouTube Music</li>
            <li>Your music listening history and library from Last.fm and/or YouTube Music</li>
            <li>Blend session data (compatibility scores, shared artists)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
          <p>We use your data solely to:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Generate music blend comparisons between you and your friends</li>
            <li>Calculate compatibility scores</li>
            <li>Create shared playlists based on mutual music taste</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">3. Data Sharing</h2>
          <p>
            We do not sell, trade, or share your personal information with third parties.
            Your music data is only visible to users you explicitly create a blend with.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">4. Data Storage</h2>
          <p>
            Your data is stored securely using Firebase. Blend session data is retained
            for the duration of the blend and may be deleted upon request.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">5. Third-Party Services</h2>
          <p>Blendify integrates with the following third-party services:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Google OAuth (authentication and YouTube Music access)</li>
            <li>Last.fm API (music listening data)</li>
            <li>Firebase (data storage and authentication)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">6. Your Rights</h2>
          <p>You may at any time:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Revoke Blendify&apos;s access through your Google Account settings</li>
            <li>Request deletion of your data by contacting us</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">7. Contact</h2>
          <p>
            For questions about this privacy policy, contact us at{' '}
            <a href="mailto:privacy@useblendify.com" className="text-[#1DB954] hover:underline">
              privacy@useblendify.com
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
