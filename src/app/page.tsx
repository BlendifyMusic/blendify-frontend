import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { HomeHero } from '@/components/HomeHero';

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-32 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-purple-600/20 blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-32 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-pink-600/20 blur-[120px] animate-pulse-glow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full bg-orange-500/10 blur-[150px] animate-pulse-glow" />
      </div>

      {/* Navigation */}
      <nav className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2 sm:gap-3">
          <Logo size={32} className="rounded-xl sm:hidden" />
          <Logo size={36} className="rounded-xl hidden sm:block" />
          <span className="text-base sm:text-lg font-semibold text-white/90">Blendify</span>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-sm text-white/50">
          <a href="#how-it-works" className="hover:text-white/80 transition-colors">How It Works</a>
          <a href="#features" className="hover:text-white/80 transition-colors">Features</a>
          <a href="#data-usage" className="hover:text-white/80 transition-colors">Data &amp; Privacy</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-10 sm:py-16">
        <div className="flex flex-col items-center max-w-2xl">
          <div className="mb-6 sm:mb-8">
            <Logo size={64} className="rounded-2xl sm:hidden" />
            <Logo size={80} className="rounded-2xl hidden sm:block" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-4 sm:mb-6">
            Blend your music
            <br />
            <span className="text-gradient">across platforms</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-md mb-3 sm:mb-4 leading-relaxed">
            Blendify is a free music comparison app that lets you and your friends connect your Last.fm or YouTube Music accounts to discover your shared music taste.
          </p>

          <p className="text-sm sm:text-base text-white/50 max-w-md mb-8 sm:mb-10 leading-relaxed">
            See which artists you both love, get a compatibility score, and generate a shared playlist — all across different music platforms.
          </p>

          <HomeHero />

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-10 sm:mt-16">
            {['Cross-Platform', 'Compatibility Score', 'Shared Playlist', 'Shareable Stories'].map(
              (feature) => (
                <span
                  key={feature}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10 text-xs sm:text-sm text-white/40 backdrop-blur-sm"
                >
                  {feature}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-4 sm:px-6 py-12 sm:py-20 max-w-4xl mx-auto w-full">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">How Blendify Works</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {[
            { step: '1', title: 'Connect', desc: 'Sign in with your Last.fm or YouTube Music account.' },
            { step: '2', title: 'Share', desc: 'Get a unique blend link and send it to a friend.' },
            { step: '3', title: 'Match', desc: 'Your friend connects their music account via the link.' },
            { step: '4', title: 'Discover', desc: 'See your shared artists, compatibility score, and a blended playlist.' },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-4 sm:px-6 py-12 sm:py-20 max-w-4xl mx-auto w-full">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3 sm:mb-4">Features</h2>
        <p className="text-white/50 text-center text-sm sm:text-base mb-8 sm:mb-12 max-w-lg mx-auto">
          Blendify brings people together through music — no matter which platform they use.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {[
            { title: 'Cross-Platform Blending', desc: 'Compare music taste between Last.fm and YouTube Music users. You don\'t need to be on the same platform.' },
            { title: 'Compatibility Score', desc: 'Get a percentage-based score showing how similar your music taste is with your friend.' },
            { title: 'Shared Artist Discovery', desc: 'See exactly which artists you both listen to, ranked by how much you both love them.' },
            { title: 'Blended Playlist', desc: 'Automatically generate a playlist of songs you both enjoy, ready to listen together.' },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 p-4 sm:p-6 backdrop-blur-sm">
              <h3 className="text-base sm:text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Data Usage & Privacy */}
      <section id="data-usage" className="px-4 sm:px-6 py-12 sm:py-20 max-w-4xl mx-auto w-full">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3 sm:mb-4">Your Data &amp; Privacy</h2>
        <p className="text-white/50 text-center text-sm sm:text-base mb-8 sm:mb-12 max-w-lg mx-auto">
          Blendify is built with your privacy in mind. Here&apos;s exactly what we access and why.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="rounded-2xl border border-white/10 p-4 sm:p-6 backdrop-blur-sm">
            <h3 className="text-base sm:text-lg font-semibold mb-3">What We Access</h3>
            <ul className="text-white/50 text-sm space-y-2 leading-relaxed">
              <li>• Your public profile (name and email) for authentication</li>
              <li>• Your YouTube Music library and listening history to compare music taste</li>
              <li>• Your Last.fm listening data (public scrobbles) if you choose Last.fm</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 p-4 sm:p-6 backdrop-blur-sm">
            <h3 className="text-base sm:text-lg font-semibold mb-3">What We Never Do</h3>
            <ul className="text-white/50 text-sm space-y-2 leading-relaxed">
              <li>• We never post, upload, or modify anything on your accounts</li>
              <li>• We never sell or share your data with third parties</li>
              <li>• We never store your passwords — authentication is handled by Google and Last.fm</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 p-4 sm:p-6 backdrop-blur-sm sm:col-span-2">
            <h3 className="text-base sm:text-lg font-semibold mb-3">Data Retention &amp; Deletion</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              Blend session data is stored only for the duration of your blend. You can revoke Blendify&apos;s access
              at any time through your{' '}
              <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">
                Google Account settings
              </a>. To request full deletion of your data, contact us at{' '}
              <a href="mailto:privacy@useblendify.com" className="text-purple-400 hover:underline">
                privacy@useblendify.com
              </a>.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 py-8 sm:py-10 border-t border-white/10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <Logo size={24} className="rounded-lg" />
            <span className="text-sm text-white/40">© {new Date().getFullYear()} Blendify. All rights reserved.</span>
          </div>
          <div className="flex gap-6 text-sm text-white/40">
            <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white/60 transition-colors">Terms of Service</Link>
            <a href="mailto:privacy@useblendify.com" className="hover:text-white/60 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
