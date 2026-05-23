import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { HomeHero } from '@/components/HomeHero';

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-purple-600/20 blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-pink-600/20 blur-[120px] animate-pulse-glow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-[150px] animate-pulse-glow" />
      </div>

      <div className="flex flex-col items-center text-center max-w-2xl">
        <div className="mb-8">
          <Logo size={80} className="rounded-2xl" />
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
          Blend your music
          <br />
          <span className="text-gradient">across platforms</span>
        </h1>

        <p className="text-lg sm:text-xl text-white/60 max-w-md mb-4 leading-relaxed">
          Blendify is a free music comparison app that lets you and your friends connect your Last.fm or YouTube Music accounts to discover your shared music taste.
        </p>

        <p className="text-base text-white/50 max-w-md mb-10 leading-relaxed">
          See which artists you both love, get a compatibility score, and generate a shared playlist — all across different music platforms.
        </p>

        <HomeHero />

        <div className="flex flex-wrap justify-center gap-3 mt-16">
          {['Cross-Platform', 'Compatibility Score', 'Shared Playlist', 'Shareable Stories'].map(
            (feature) => (
              <span
                key={feature}
                className="px-4 py-2 rounded-full border border-white/10 text-sm text-white/40 backdrop-blur-sm"
              >
                {feature}
              </span>
            ),
          )}
        </div>

        <section className="mt-20 text-left max-w-lg space-y-6 text-white/50 text-sm leading-relaxed">
          <h2 className="text-lg font-semibold text-white/80">How Blendify Works</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Connect your Last.fm or YouTube Music account</li>
            <li>Share your unique blend link with a friend</li>
            <li>Your friend connects their music account</li>
            <li>Blendify compares your listening histories and reveals your shared artists, a compatibility score, and a blended playlist</li>
          </ol>
          <p>
            Blendify only reads your public listening data. We never post on your behalf, modify your playlists, or share your data with third parties.
          </p>
        </section>
      </div>

      <footer className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="flex gap-4 text-sm text-white/30">
          <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
          <span>·</span>
          <Link href="/terms" className="hover:text-white/60 transition-colors">Terms of Service</Link>
        </div>
        <span className="text-white/20 text-xs tracking-widest uppercase">Blendify</span>
      </footer>
    </main>
  );
}
