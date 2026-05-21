'use client';

import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import { fadeInUp, staggerContainer } from '@/lib/utils/animations';

export function PlatformPicker({ blendId }: { blendId?: string }) {
  const handleSelect = (platform: 'lastfm' | 'ytmusic') => {
    window.location.href = api.getAuthUrl(platform, blendId);
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col sm:flex-row gap-4"
    >
      <motion.button
        variants={fadeInUp}
        onClick={() => handleSelect('lastfm')}
        className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-[#D51007]/10 border border-[#D51007]/30 hover:bg-[#D51007]/20 transition-all hover:scale-105 active:scale-95"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#D51007">
          <path d="M10.584 17.21l-.88-2.392s-1.43 1.594-3.573 1.594c-1.897 0-3.244-1.649-3.244-4.288 0-3.382 1.704-4.591 3.381-4.591 2.42 0 3.189 1.567 3.849 3.574l.88 2.749c.88 2.666 2.529 4.81 7.285 4.81 3.409 0 5.718-1.044 5.718-3.793 0-2.227-1.265-3.381-3.63-3.931l-1.758-.385c-1.21-.275-1.567-.77-1.567-1.594 0-.935.742-1.484 1.952-1.484 1.32 0 2.034.495 2.144 1.677l2.749-.33c-.22-2.474-1.924-3.492-4.729-3.492-2.474 0-4.893.935-4.893 3.932 0 1.87.907 3.051 3.189 3.601l1.87.44c1.402.33 1.869.825 1.869 1.676 0 1.017-.99 1.43-2.86 1.43-2.776 0-3.932-1.457-4.591-3.464l-.907-2.749c-1.155-3.573-2.997-4.893-6.653-4.893C1.567 5.926 0 8.473 0 12.592c0 3.876 1.621 6.104 5.333 6.104 2.806 0 4.345-1.32 5.251-1.486z" />
        </svg>
        <span className="font-semibold text-[#D51007]">Last.fm</span>
      </motion.button>

      <motion.button
        variants={fadeInUp}
        onClick={() => handleSelect('ytmusic')}
        className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-[#FF0000]/10 border border-[#FF0000]/30 hover:bg-[#FF0000]/20 transition-all hover:scale-105 active:scale-95"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF0000">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
        <span className="font-semibold text-[#FF0000]">YouTube Music</span>
      </motion.button>
    </motion.div>
  );
}
