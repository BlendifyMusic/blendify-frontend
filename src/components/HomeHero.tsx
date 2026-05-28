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
            className="group flex items-center gap-2 px-9 py-4 rounded-full bg-[#1DB954] text-black font-medium text-[15px] hover:bg-[#1ed760] hover:scale-[1.04] active:scale-[0.97] transition-all disabled:opacity-50"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
            </svg>
            {creating ? 'Creating...' : 'Create your blend'}
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
          <span className="text-white/25 text-[13px]">
            Signed in as {user.displayName || 'User'}
          </span>
          <button
            onClick={() => signOut(getFirebaseAuth())}
            className="text-white/25 text-[13px] underline hover:text-white/50 transition-colors"
          >
            Sign out
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
