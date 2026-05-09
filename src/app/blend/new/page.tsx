'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/utils/animations';
import { useState } from 'react';

function BlendNewContent() {
  const searchParams = useSearchParams();
  const blendId = searchParams.get('id');
  const [copied, setCopied] = useState(false);

  const blendUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/blend/${blendId}`
    : '';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(blendUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'Blend with me on Blendify!',
        text: 'Let\'s see how our music taste compares',
        url: blendUrl,
      });
    } else {
      handleCopy();
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-green-500/15 blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-500/15 blur-[100px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center text-center max-w-lg"
      >
        <motion.div variants={scaleIn} className="mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </motion.div>

        <motion.h1 variants={fadeInUp} className="text-4xl font-bold mb-3">
          You&apos;re all set!
        </motion.h1>

        <motion.p variants={fadeInUp} className="text-white/50 text-lg mb-10">
          Now send this link to your friend to create your blend
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="w-full rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 bg-white/5 rounded-xl px-4 py-3 text-sm text-white/70 truncate font-mono">
              {blendUrl}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleCopy}
              className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/15 transition-colors font-medium text-sm"
            >
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
            <button
              onClick={handleShare}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition-opacity font-medium text-sm"
            >
              Share
            </button>
          </div>
        </motion.div>

        <motion.p variants={fadeInUp} className="text-white/30 text-sm mt-8">
          Waiting for your friend to join...
        </motion.p>
      </motion.div>
    </main>
  );
}

export default function BlendNew() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-green-500/30 border-t-green-500 animate-spin" />
      </main>
    }>
      <BlendNewContent />
    </Suspense>
  );
}
