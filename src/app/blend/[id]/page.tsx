'use client';

import { useEffect, useState, use } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/utils/animations';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/hooks/useAuth';
import { PlatformPicker } from '@/components/auth/PlatformPicker';
import { useRouter } from 'next/navigation';

export default function BlendJoin({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [blend, setBlend] = useState<any>(null);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getBlend(id).then(setBlend).catch(() => setError('Blend not found'));
  }, [id]);

  useEffect(() => {
    if (!user || !blend || blend.status !== 'waiting' || joining) return;
    if (blend.creatorUid === user.uid) return;

    setJoining(true);
    (async () => {
      try {
        await api.joinBlend(id);
        router.push(`/blend/${id}/reveal`);
      } catch {
        setJoining(false);
        setError('Failed to create blend. Please try again.');
      }
    })();
  }, [user, blend, id, router, joining]);

  if (error) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6 gap-4">
        <p className="text-white/60 text-lg">{error}</p>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 transition-colors font-medium text-sm"
        >
          Go Home
        </button>
      </main>
    );
  }

  if (!blend) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-purple-500/30 border-t-purple-500 animate-spin" />
      </main>
    );
  }

  if (blend.status === 'ready' && user) {
    router.push(`/blend/${id}/reveal`);
    return null;
  }

  if (blend.status === 'ready' && !user && !authLoading) {
    return (
      <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/3 -left-20 w-72 h-72 rounded-full bg-purple-600/20 blur-[100px] animate-pulse-glow" />
          <div className="absolute bottom-1/3 -right-20 w-72 h-72 rounded-full bg-pink-600/20 blur-[100px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        </div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center max-w-lg"
        >
          <motion.h1 variants={fadeInUp} className="text-3xl font-bold mb-3">
            This blend is ready!
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-white/50 text-lg mb-10">
            Sign in to view the results
          </motion.p>
          <motion.div variants={fadeInUp}>
            <PlatformPicker blendId={id} />
          </motion.div>
        </motion.div>
      </main>
    );
  }

  if (joining) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-6">
        <div className="w-16 h-16 rounded-full border-4 border-pink-500/30 border-t-pink-500 animate-spin" />
        <p className="text-white/60 text-lg">Creating your blend...</p>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 -left-20 w-72 h-72 rounded-full bg-purple-600/20 blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-1/3 -right-20 w-72 h-72 rounded-full bg-pink-600/20 blur-[100px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center text-center max-w-lg"
      >
        <motion.div variants={scaleIn} className="mb-6">
          {blend.creatorAvatar ? (
            <img
              src={blend.creatorAvatar}
              alt={blend.creatorName}
              className="w-24 h-24 rounded-full border-4 border-purple-500/50"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold">
              {blend.creatorName?.charAt(0)}
            </div>
          )}
        </motion.div>

        <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold mb-3">
          <span className="text-gradient">{blend.creatorName}</span> wants to
          <br />blend with you
        </motion.h1>

        <motion.p variants={fadeInUp} className="text-white/50 text-lg mb-10">
          Connect your music to see how your tastes compare
        </motion.p>

        {!user && !authLoading && (
          <motion.div variants={fadeInUp}>
            <PlatformPicker blendId={id} />
          </motion.div>
        )}

        {authLoading && (
          <div className="w-8 h-8 rounded-full border-2 border-purple-500/30 border-t-purple-500 animate-spin" />
        )}
      </motion.div>
    </main>
  );
}
