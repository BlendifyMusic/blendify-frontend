'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/utils/animations';
import { useAuth } from '@/lib/hooks/useAuth';
import { api } from '@/lib/api';

function BlendNewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const blendId = searchParams.get('id');
  const [copied, setCopied] = useState(false);
  const [blendStatus, setBlendStatus] = useState<string>('waiting');
  const [joinerName, setJoinerName] = useState<string | null>(null);
  const [joinerAvatar, setJoinerAvatar] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!blendId) return;

    const close = api.streamBlendEvents(blendId, (data) => {
      setBlendStatus(data.status);
      if (data.joinerName) {
        setJoinerName(data.joinerName);
        setJoinerAvatar(data.joinerAvatar);
      }
      if (data.status === 'ready') {
        setTimeout(() => {
          router.push(`/blend/${blendId}/reveal`);
        }, 2000);
      }
    });

    return close;
  }, [blendId, router]);

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

  if (authLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-purple-500/30 border-t-purple-500 animate-spin" />
      </main>
    );
  }

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

        <AnimatePresence mode="wait">
          {blendStatus === 'waiting' && (
            <motion.div
              key="waiting"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center gap-3 mt-8"
            >
              <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white/60 animate-spin" />
              <p className="text-white/30 text-sm">Waiting for your friend to join...</p>
            </motion.div>
          )}

          {blendStatus === 'computing' && joinerName && (
            <motion.div
              key="computing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-4 mt-8"
            >
              <div className="flex items-center gap-3">
                {joinerAvatar ? (
                  <img src={joinerAvatar} alt={joinerName} className="w-12 h-12 rounded-full border-2 border-pink-500/50" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-xl font-bold">
                    {joinerName.charAt(0)}
                  </div>
                )}
                <div className="text-left">
                  <p className="font-semibold text-gradient">{joinerName}</p>
                  <p className="text-sm text-white/40">has joined!</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full border-2 border-purple-500/30 border-t-purple-500 animate-spin" />
                <p className="text-white/50 text-sm">Computing your blend...</p>
              </div>
            </motion.div>
          )}

          {blendStatus === 'ready' && (
            <motion.div
              key="ready"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4 mt-8"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
                </svg>
              </div>
              <p className="text-lg font-semibold text-gradient">Your blend is ready!</p>
              <p className="text-sm text-white/40">Redirecting to your results...</p>
            </motion.div>
          )}
        </AnimatePresence>
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
