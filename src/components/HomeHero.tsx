'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/utils/animations';
import { PlatformPicker } from '@/components/auth/PlatformPicker';
import { useState } from 'react';

export function HomeHero() {
  const [showPicker, setShowPicker] = useState(false);

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
    </motion.div>
  );
}
