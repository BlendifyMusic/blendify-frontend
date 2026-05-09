'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { signInWithCustomToken } from 'firebase/auth';
import { getFirebaseAuth } from '@/lib/firebase';
import { api } from '@/lib/api';
import { motion } from 'framer-motion';

function AuthCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState('Connecting your account...');

  useEffect(() => {
    const firebaseToken = searchParams.get('firebaseToken');
    const blendId = searchParams.get('blendId');

    if (!firebaseToken) {
      setStatus('Authentication failed. Please try again.');
      return;
    }

    (async () => {
      try {
        await signInWithCustomToken(getFirebaseAuth(), firebaseToken);
        setStatus('Connected! Setting things up...');

        if (blendId) {
          router.push(`/blend/${blendId}`);
        } else {
          setStatus('Creating your blend...');
          const { blendId: newId } = await api.createBlend();
          router.push(`/blend/new?id=${newId}`);
        }
      } catch {
        setStatus('Something went wrong. Please try again.');
      }
    })();
  }, [searchParams, router]);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-6"
      >
        <div className="w-16 h-16 rounded-full border-4 border-purple-500/30 border-t-purple-500 animate-spin" />
        <p className="text-white/60 text-lg">{status}</p>
      </motion.div>
    </main>
  );
}

export default function AuthCallback() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-purple-500/30 border-t-purple-500 animate-spin" />
      </main>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
