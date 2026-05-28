import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { HomeHero } from '@/components/HomeHero';
import { SoundWave } from '@/components/SoundWave';

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 20% -10%, #0d2e1a 0%, #0a0a0a 55%), radial-gradient(ellipse 60% 50% at 85% 100%, #0d2416 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="w-full px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between max-w-5xl mx-auto">
        <div className="flex items-center gap-2.5">
          <Logo size={38} className="rounded-xl" />
          <span className="text-[17px] font-bold text-white tracking-tight">
            blend<span className="text-[#1DB954]">ify</span>
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-8 text-[13px] text-white/35 font-medium">
          <a href="#how-it-works" className="hover:text-white/70 transition-colors">How It Works</a>
          <a href="#features" className="hover:text-white/70 transition-colors">Features</a>
          <a href="#data-usage" className="hover:text-white/70 transition-colors">Privacy</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-5 sm:px-8 pt-8 sm:pt-16 pb-10 sm:pb-16">
        <div className="flex flex-col items-center max-w-[600px]">
          {/* Badge */}
          <div className="mb-6 sm:mb-8 px-3.5 py-1.5 rounded-full border border-[#1DB954]/25 bg-[#1DB954]/10 text-[#1DB954] text-[11px] font-medium tracking-[1.5px] uppercase">
            Cross-platform music blending
          </div>

          <h1 className="text-[clamp(32px,6vw,54px)] font-extrabold tracking-tight leading-[1.05] mb-4 sm:mb-5">
            Your taste.
            <br />
            Their taste.
            <br />
            <span className="text-gradient">One playlist.</span>
          </h1>

          <p className="text-[15px] font-light text-white/40 max-w-[380px] mb-8 sm:mb-10 leading-[1.7]">
            Merge music libraries across platforms. Share a link, discover your overlap, vibe together.
          </p>

          <HomeHero />

          {/* Platform chips */}
          <div className="flex flex-col items-center gap-2 mt-8 sm:mt-10">
            <span className="text-[11px] text-white/20 tracking-[0.5px] uppercase font-medium">Works with</span>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { name: 'YouTube Music', color: '#FC3C44' },
                { name: 'Last.fm', color: '#d4483b' },
                { name: 'Spotify', color: '', soon: true },
              ].map((p) => (
                <div
                  key={p.name}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-[12px] ${
                    p.soon
                      ? 'border-white/5 bg-white/[0.02] text-white/20'
                      : 'border-white/7 bg-white/[0.04] text-white/45'
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: p.soon ? 'rgba(255,255,255,0.2)' : p.color }}
                  />
                  {p.name}
                  {p.soon && <span className="text-white/15 ml-0.5">— soon</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full max-w-[500px] mx-auto border-t border-white/[0.06]" />

      {/* How It Works */}
      <section id="how-it-works" className="px-5 sm:px-8 py-12 sm:py-20 max-w-[500px] mx-auto w-full">
        <p className="text-[11px] font-medium tracking-[2px] uppercase text-white/20 text-center mb-8 sm:mb-10">How it works</p>

        <div className="flex flex-col">
          {[
            { title: 'Connect your music', desc: 'Log in with YouTube Music or Last.fm to bring your library in.' },
            { title: 'Share a blend link', desc: 'Generate a unique link and send it to a friend — no app required on their end.' },
            { title: 'Friend joins', desc: 'They connect their platform and the blend engine analyses your combined taste.' },
            { title: 'Your playlist drops', desc: 'A shared playlist + personalised taste insights — save it or share it anywhere.' },
          ].map((step, i, arr) => (
            <div key={step.title} className="flex gap-5">
              {/* Timeline */}
              <div className="flex flex-col items-center flex-shrink-0 pt-0.5">
                <div className="w-[30px] h-[30px] rounded-full border border-[#1DB954]/30 bg-[#1DB954]/[0.08] flex items-center justify-center text-[12px] font-bold text-[#1DB954]">
                  {i + 1}
                </div>
                {i < arr.length - 1 && (
                  <div className="w-px flex-1 min-h-[36px] my-1.5 bg-gradient-to-b from-[#1DB954]/20 to-[#1DB954]/[0.04]" />
                )}
              </div>
              {/* Content */}
              <div className="pb-7">
                <p className="text-[14px] font-bold text-white mt-1 mb-1.5">{step.title}</p>
                <p className="text-[13px] text-white/30 leading-[1.65]">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Sound wave */}
        <div className="flex justify-center mt-4">
          <SoundWave />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-5 sm:px-8 py-12 sm:py-20 max-w-3xl mx-auto w-full">
        <p className="text-[11px] font-medium tracking-[2px] uppercase text-white/20 text-center mb-3">Features</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-3">Built for music lovers</h2>
        <p className="text-white/35 text-center text-sm mb-10 sm:mb-14 max-w-md mx-auto leading-relaxed">
          Blendify brings people together through music — no matter which platform they use.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: 'Cross-Platform Blending', desc: 'Compare music taste between Last.fm and YouTube Music users. You don\'t need to be on the same platform.' },
            { title: 'Compatibility Score', desc: 'Get a percentage-based score showing how similar your music taste is with your friend.' },
            { title: 'Shared Artist Discovery', desc: 'See exactly which artists you both listen to, ranked by how much you both love them.' },
            { title: 'Blended Playlist', desc: 'Automatically generate a playlist of songs you both enjoy, ready to listen together.' },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6 hover:border-[#1DB954]/20 hover:bg-[#1DB954]/[0.03] transition-all duration-300">
              <h3 className="text-[15px] font-semibold mb-2 text-white/90">{item.title}</h3>
              <p className="text-white/35 text-[13px] leading-[1.7]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Data Usage & Privacy */}
      <section id="data-usage" className="px-5 sm:px-8 py-12 sm:py-20 max-w-3xl mx-auto w-full">
        <p className="text-[11px] font-medium tracking-[2px] uppercase text-white/20 text-center mb-3">Privacy</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-3">Your Data &amp; Privacy</h2>
        <p className="text-white/35 text-center text-sm mb-10 sm:mb-14 max-w-md mx-auto leading-relaxed">
          Blendify is built with your privacy in mind. Here&apos;s exactly what we access and why.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6">
            <h3 className="text-[15px] font-semibold mb-3 text-white/90">What We Access</h3>
            <ul className="text-white/35 text-[13px] space-y-2.5 leading-[1.65]">
              <li className="flex gap-2"><span className="text-[#1DB954]/60 mt-0.5">-</span>Your public profile (name and email) for authentication</li>
              <li className="flex gap-2"><span className="text-[#1DB954]/60 mt-0.5">-</span>Your YouTube Music library and listening history to compare music taste</li>
              <li className="flex gap-2"><span className="text-[#1DB954]/60 mt-0.5">-</span>Your Last.fm listening data (public scrobbles) if you choose Last.fm</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6">
            <h3 className="text-[15px] font-semibold mb-3 text-white/90">What We Never Do</h3>
            <ul className="text-white/35 text-[13px] space-y-2.5 leading-[1.65]">
              <li className="flex gap-2"><span className="text-red-400/60 mt-0.5">-</span>We never post, upload, or modify anything on your accounts</li>
              <li className="flex gap-2"><span className="text-red-400/60 mt-0.5">-</span>We never sell or share your data with third parties</li>
              <li className="flex gap-2"><span className="text-red-400/60 mt-0.5">-</span>We never store your passwords — authentication is handled by Google and Last.fm</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6 sm:col-span-2">
            <h3 className="text-[15px] font-semibold mb-3 text-white/90">Data Retention &amp; Deletion</h3>
            <p className="text-white/35 text-[13px] leading-[1.7]">
              Blend session data is stored only for the duration of your blend. You can revoke Blendify&apos;s access
              at any time through your{' '}
              <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer" className="text-[#1DB954]/70 hover:text-[#1DB954] hover:underline transition-colors">
                Google Account settings
              </a>. To request full deletion of your data, contact us at{' '}
              <a href="mailto:privacy@useblendify.com" className="text-[#1DB954]/70 hover:text-[#1DB954] hover:underline transition-colors">
                privacy@useblendify.com
              </a>.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-5 sm:px-8 py-8 sm:py-10 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Logo size={22} className="rounded-lg" />
            <span className="text-[12px] text-white/25">&copy; {new Date().getFullYear()} Blendify</span>
          </div>
          <div className="flex gap-6 text-[12px] text-white/25">
            <Link href="/privacy" className="hover:text-white/50 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white/50 transition-colors">Terms of Service</Link>
            <a href="mailto:privacy@useblendify.com" className="hover:text-white/50 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
