'use client';

import { motion } from 'framer-motion';
import { signOut } from 'firebase/auth';
import { staggerContainer, scaleIn } from '@/lib/utils/animations';
import { PlatformPicker } from '@/components/auth/PlatformPicker';
import { useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { getFirebaseAuth } from '@/lib/firebase';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

export function HomeHero() {
  const [showPicker, setShowPicker] = useState(false);
  const [creating, setCreating] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleCreateBlend = async () => {
    if (user) {
      setCreating(true);
      try {
        const { blendId } = await api.createBlend();
        router.push(`/blend/new?id=${blendId}`);
      } catch {
        await signOut(getFirebaseAuth());
        setShowPicker(true);
        setCreating(false);
      }
    } else {
      setShowPicker(true);
    }
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="contents"
    >
      <motion.div variants={scaleIn}>
        {!showPicker ? (
          <button
            onClick={handleCreateBlend}
            disabled={loading || creating}
            className="group relative px-8 py-4 rounded-full font-semibold text-lg overflow-hidden transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 animate-gradient" />
            <div className="absolute inset-[2px] bg-[#0a0a0a] rounded-full transition-opacity group-hover:opacity-0" />
            <span className="relative text-gradient group-hover:text-white transition-colors">
              {creating ? 'Creating...' : 'Create Your Blend'}
            </span>
          </button>
        ) : (
          <PlatformPicker />
        )}
      </motion.div>

      {user && !showPicker && !creating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3 mt-3"
        >
          <span className="text-white/30 text-sm">
            Signed in as {user.displayName || 'User'}
          </span>
          <button
            onClick={() => signOut(getFirebaseAuth())}
            className="text-white/30 text-sm underline hover:text-white/60 transition-colors"
          >
            Sign out
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
