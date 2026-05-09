'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/utils/animations';

export function GenreVenn({
  genreOverlap,
}: {
  genreOverlap: {
    shared: string[];
    creatorUnique: string[];
    joinerUnique: string[];
  };
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center text-center"
    >
      <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-2">
        Genre Vibes
      </motion.h2>
      <motion.p variants={fadeInUp} className="text-white/40 mb-10">
        Where your tastes intersect
      </motion.p>

      {/* Visual genre bubbles */}
      <motion.div variants={fadeInUp} className="w-full space-y-6">
        {/* Shared genres */}
        {genreOverlap.shared.length > 0 && (
          <div>
            <p className="text-sm text-white/30 mb-3 uppercase tracking-wider">Both of you</p>
            <div className="flex flex-wrap justify-center gap-2">
              {genreOverlap.shared.map((genre, i) => (
                <motion.span
                  key={genre}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.08, type: 'spring' }}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-sm"
                >
                  {genre}
                </motion.span>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-6">
          {/* Creator unique */}
          <div>
            <p className="text-sm text-white/30 mb-3 uppercase tracking-wider">Only you</p>
            <div className="flex flex-wrap justify-center gap-2">
              {genreOverlap.creatorUnique.map((genre, i) => (
                <motion.span
                  key={genre}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.08 }}
                  className="px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs text-white/60"
                >
                  {genre}
                </motion.span>
              ))}
              {genreOverlap.creatorUnique.length === 0 && (
                <span className="text-xs text-white/20">—</span>
              )}
            </div>
          </div>

          {/* Joiner unique */}
          <div>
            <p className="text-sm text-white/30 mb-3 uppercase tracking-wider">Only them</p>
            <div className="flex flex-wrap justify-center gap-2">
              {genreOverlap.joinerUnique.map((genre, i) => (
                <motion.span
                  key={genre}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.08 }}
                  className="px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-xs text-white/60"
                >
                  {genre}
                </motion.span>
              ))}
              {genreOverlap.joinerUnique.length === 0 && (
                <span className="text-xs text-white/20">—</span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
