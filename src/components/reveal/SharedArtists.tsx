'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/utils/animations';

export function SharedArtists({
  artists,
}: {
  artists: { name: string; imageUrl: string }[];
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center text-center"
    >
      <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-2">
        Artists You Both Love
      </motion.h2>
      <motion.p variants={fadeInUp} className="text-white/40 mb-10">
        {artists.length} artists in common
      </motion.p>

      {artists.length === 0 ? (
        <motion.p variants={fadeInUp} className="text-white/30 text-lg">
          No shared artists — your taste is truly unique!
        </motion.p>
      ) : (
        <motion.div
          variants={staggerContainer}
          className="flex flex-wrap justify-center gap-4"
        >
          {artists.slice(0, 8).map((artist, i) => (
            <motion.div
              key={artist.name}
              variants={fadeInUp}
              className="flex flex-col items-center gap-2"
            >
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.3 + i * 0.1,
                  type: 'spring',
                  stiffness: 200,
                }}
                className="relative"
              >
                {artist.imageUrl ? (
                  <img
                    src={artist.imageUrl}
                    alt={artist.name}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-white/10"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold">
                    {artist.name.charAt(0)}
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
              </motion.div>
              <span className="text-xs text-white/50 max-w-[80px] truncate">
                {artist.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
