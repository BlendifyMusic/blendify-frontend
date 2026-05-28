'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';
import { fadeInUp, staggerContainer } from '@/lib/utils/animations';

export function CompatibilityScore({
  score,
  creatorName,
  joinerName,
  creatorAvatar,
  joinerAvatar,
}: {
  score: number;
  creatorName: string;
  joinerName: string;
  creatorAvatar: string;
  joinerAvatar: string;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    const controls = animate(count, score, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.8,
    });
    return controls.stop;
  }, [count, score]);

  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center text-center"
    >
      {/* Avatars */}
      <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-10">
        <div className="flex flex-col items-center gap-2">
          {creatorAvatar ? (
            <img src={creatorAvatar} alt={creatorName} className="w-16 h-16 rounded-full border-2 border-[#1DB954]/50" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-[#1DB954]/30 flex items-center justify-center font-bold text-xl">
              {creatorName?.charAt(0)}
            </div>
          )}
          <span className="text-sm text-white/50">{creatorName}</span>
        </div>

        <div className="text-2xl text-white/20">&times;</div>

        <div className="flex flex-col items-center gap-2">
          {joinerAvatar ? (
            <img src={joinerAvatar} alt={joinerName} className="w-16 h-16 rounded-full border-2 border-[#fc3c8a]/50" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-[#fc3c8a]/30 flex items-center justify-center font-bold text-xl">
              {joinerName?.charAt(0)}
            </div>
          )}
          <span className="text-sm text-white/50">{joinerName}</span>
        </div>
      </motion.div>

      {/* Score ring */}
      <motion.div variants={fadeInUp} className="relative w-56 h-56 mb-8">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
          <circle
            cx="100" cy="100" r="90"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="8"
          />
          <motion.circle
            cx="100" cy="100" r="90"
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1DB954" />
              <stop offset="50%" stopColor="#1ed760" />
              <stop offset="100%" stopColor="#8de84e" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span className="text-6xl font-bold text-gradient">
            {rounded}
          </motion.span>
          <span className="text-white/40 text-sm mt-1">%</span>
        </div>
      </motion.div>

      <motion.h2 variants={fadeInUp} className="text-2xl font-bold mb-2">
        Music Compatibility
      </motion.h2>
      <motion.p variants={fadeInUp} className="text-white/40">
        {score >= 70
          ? 'You two are musical soulmates!'
          : score >= 40
            ? 'You share some great taste!'
            : 'Opposites attract — time to explore!'}
      </motion.p>
    </motion.div>
  );
}
