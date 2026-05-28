'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { signInWithCustomToken } from 'firebase/auth';
import { getFirebaseAuth } from '@/lib/firebase';
import { api } from '@/lib/api';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/utils/animations';

interface MusicData {
  tracks: { title: string; artist: string; albumArt: string; platform: string }[];
  artists: { name: string; imageUrl: string; genres: string[]; platform: string }[];
}

function AuthCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'preview' | 'creating' | 'error'>('loading');
  const [statusText, setStatusText] = useState('Connecting your account...');
  const [musicData, setMusicData] = useState<MusicData | null>(null);
  const [blendId, setBlendId] = useState<string | null>(null);
  const [isJoining, setIsJoining] = useState(false);

  useEffect(() => {
    const firebaseToken = searchParams.get('firebaseToken');
    const bid = searchParams.get('blendId');
    setBlendId(bid);
    setIsJoining(!!bid);

    if (!firebaseToken) {
      setStatus('error');
      setStatusText('Authentication failed. Please try again.');
      return;
    }

    (async () => {
      try {
        await signInWithCustomToken(getFirebaseAuth(), firebaseToken);
        setStatusText('Fetching your music data...');

        const data = await api.getUserMusicData();
        setMusicData(data);
        setStatus('preview');
      } catch {
        setStatus('error');
        setStatusText('Something went wrong. Please try again.');
      }
    })();
  }, [searchParams]);

  const handleContinue = async () => {
    setStatus('creating');
    try {
      if (blendId) {
        setStatusText('Joining the blend...');
        router.push(`/blend/${blendId}`);
      } else {
        setStatusText('Creating your blend...');
        const { blendId: newId } = await api.createBlend();
        router.push(`/blend/new?id=${newId}`);
      }
    } catch {
      setStatus('error');
      setStatusText('Something went wrong. Please try again.');
    }
  };

  if (status === 'error') {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="flex flex-col items-center gap-4">
          <p className="text-white/60 text-lg">{statusText}</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] transition-colors font-medium text-sm"
          >
            Go Home
          </button>
        </div>
      </main>
    );
  }

  if (status === 'loading' || status === 'creating') {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="w-16 h-16 rounded-full border-4 border-[#1DB954]/30 border-t-[#1DB954] animate-spin" />
          <p className="text-white/60 text-lg">{statusText}</p>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-12">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#1DB954]/10 blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-emerald-500/10 blur-[120px] animate-pulse-glow" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center text-center max-w-lg w-full"
      >
        <motion.div variants={fadeInUp} className="mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1DB954] to-emerald-600 flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </motion.div>

        <motion.h1 variants={fadeInUp} className="text-3xl font-bold mb-2">
          Account Connected!
        </motion.h1>

        <motion.p variants={fadeInUp} className="text-white/50 text-base mb-8">
          {musicData && musicData.tracks.length > 0
            ? `We found ${musicData.tracks.length} top tracks and ${musicData.artists.length} artists from your library`
            : 'Your music account is connected'}
        </motion.p>

        {musicData && musicData.tracks.length > 0 && (
          <motion.div variants={fadeInUp} className="w-full mb-8">
            <h3 className="text-sm text-white/40 uppercase tracking-wider mb-3 text-left">Your Top Tracks</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-2 scrollbar-none">
              {musicData.tracks.slice(0, 10).map((track, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2 rounded-xl bg-white/[0.03] border border-white/[0.05]"
                >
                  {track.albumArt ? (
                    <img src={track.albumArt} alt="" className="w-10 h-10 rounded-lg object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
                      </svg>
                    </div>
                  )}
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm font-medium truncate">{track.title}</p>
                    <p className="text-xs text-white/40 truncate">{track.artist}</p>
                  </div>
                  <span className="text-xs text-white/20 capitalize">{track.platform}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {musicData && musicData.artists.length > 0 && (
          <motion.div variants={fadeInUp} className="w-full mb-8">
            <h3 className="text-sm text-white/40 uppercase tracking-wider mb-3 text-left">Your Top Artists</h3>
            <div className="flex flex-wrap gap-2">
              {musicData.artists.slice(0, 10).map((artist, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/[0.03] border border-white/[0.05]"
                >
                  {artist.imageUrl ? (
                    <img src={artist.imageUrl} alt="" className="w-6 h-6 rounded-full object-cover" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-white/[0.06]" />
                  )}
                  <span className="text-sm">{artist.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.button
          variants={fadeInUp}
          onClick={handleContinue}
          className="w-full py-4 rounded-xl bg-[#1DB954] text-black hover:bg-[#1ed760] transition-colors font-semibold text-lg"
        >
          {isJoining ? 'Join the Blend' : 'Create Your Blend'}
        </motion.button>
      </motion.div>
    </main>
  );
}

export default function AuthCallback() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-[#1DB954]/30 border-t-[#1DB954] animate-spin" />
      </main>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
