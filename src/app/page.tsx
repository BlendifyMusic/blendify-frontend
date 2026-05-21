'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/utils/animations';
import { PlatformPicker } from '@/components/auth/PlatformPicker';
import { useState } from 'react';

export default function Home() {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Animated background orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-purple-600/20 blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-pink-600/20 blur-[120px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-[150px] animate-pulse-glow" style={{ animationDelay: '3s' }} />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center text-center max-w-2xl"
      >
        {/* Logo */}
        <motion.div variants={scaleIn} className="mb-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center animate-gradient">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={fadeInUp}
          className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
        >
          Blend your music
          <br />
          <span className="text-gradient">across platforms</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={fadeInUp}
          className="text-lg sm:text-xl text-white/60 max-w-md mb-10 leading-relaxed"
        >
          Connect with friends on Last.fm or YouTube Music. Discover what you share, what makes you unique, and get a playlist you&apos;ll both love.
        </motion.p>

        {/* CTA */}
        <motion.div variants={fadeInUp}>
          {!showPicker ? (
            <button
              onClick={() => setShowPicker(true)}
              className="group relative px-8 py-4 rounded-full font-semibold text-lg overflow-hidden transition-transform hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 animate-gradient" />
              <div className="absolute inset-[2px] bg-[#0a0a0a] rounded-full transition-opacity group-hover:opacity-0" />
              <span className="relative text-gradient group-hover:text-white transition-colors">
                Create Your Blend
              </span>
            </button>
          ) : (
            <PlatformPicker />
          )}
        </motion.div>

        {/* Feature pills */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap justify-center gap-3 mt-16"
        >
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
        </motion.div>
      </motion.div>

      {/* Footer watermark */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20 text-sm tracking-widest uppercase">
        Blendify
      </div>
    </main>
  );
}
