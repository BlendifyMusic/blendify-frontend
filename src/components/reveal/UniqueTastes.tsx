'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from '@/lib/utils/animations';

export function UniqueTastes({
  uniqueTastes,
  creatorName,
  joinerName,
}: {
  uniqueTastes: {
    creator: { title: string; artist: string; albumArt: string }[];
    joiner: { title: string; artist: string; albumArt: string }[];
  };
  creatorName: string;
  joinerName: string;
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center text-center"
    >
      <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-2">
        What Makes You Unique
      </motion.h2>
      <motion.p variants={fadeInUp} className="text-white/40 mb-10">
        Songs only one of you vibes with
      </motion.p>

      <div className="grid grid-cols-2 gap-6 w-full">
        {/* Creator's unique */}
        <div>
          <motion.p variants={slideInLeft} className="text-sm font-medium text-purple-400 mb-4">
            {creatorName}
          </motion.p>
          <div className="space-y-3">
            {uniqueTastes.creator.slice(0, 4).map((track, i) => (
              <motion.div
                key={track.title}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-2 p-2 rounded-xl bg-white/5"
              >
                {track.albumArt ? (
                  <img src={track.albumArt} alt="" className="w-10 h-10 rounded-lg object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20" />
                )}
                <div className="text-left min-w-0">
                  <p className="text-xs font-medium truncate">{track.title}</p>
                  <p className="text-[10px] text-white/40 truncate">{track.artist}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Joiner's unique */}
        <div>
          <motion.p variants={slideInRight} className="text-sm font-medium text-pink-400 mb-4">
            {joinerName}
          </motion.p>
          <div className="space-y-3">
            {uniqueTastes.joiner.slice(0, 4).map((track, i) => (
              <motion.div
                key={track.title}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-2 p-2 rounded-xl bg-white/5"
              >
                {track.albumArt ? (
                  <img src={track.albumArt} alt="" className="w-10 h-10 rounded-lg object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-pink-500/20" />
                )}
                <div className="text-left min-w-0">
                  <p className="text-xs font-medium truncate">{track.title}</p>
                  <p className="text-[10px] text-white/40 truncate">{track.artist}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
