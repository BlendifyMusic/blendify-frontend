'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CompatibilityScore } from './CompatibilityScore';
import { SharedArtists } from './SharedArtists';
import { GenreVenn } from './GenreVenn';
import { UniqueTastes } from './UniqueTastes';
import { PlaylistPreview } from './PlaylistPreview';

const slides = [
  'compatibility',
  'shared-artists',
  'genres',
  'unique-tastes',
  'playlist',
] as const;

type Slide = (typeof slides)[number];

export function RevealExperience({
  blend,
  blendId,
}: {
  blend: any;
  blendId: string;
}) {
  const [current, setCurrent] = useState(0);
  const result = blend.result;

  const next = () => setCurrent((i) => Math.min(i + 1, slides.length - 1));
  const prev = () => setCurrent((i) => Math.max(i - 1, 0));

  const slideVariants = {
    enter: { opacity: 0, x: 100, scale: 0.95 },
    center: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -100, scale: 0.95 },
  };

  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      onClick={next}
    >
      {/* Dynamic background per slide */}
      <div className="absolute inset-0 -z-10 transition-colors duration-1000">
        {current === 0 && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-[#0a0a0a] to-green-950" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#1DB954]/15 blur-[150px] animate-pulse-glow" />
          </>
        )}
        {current === 1 && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-teal-950 via-[#0a0a0a] to-emerald-950" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-teal-500/15 blur-[120px] animate-pulse-glow" />
          </>
        )}
        {current === 2 && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-[#0a0a0a] to-teal-950" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-emerald-500/15 blur-[120px] animate-pulse-glow" />
          </>
        )}
        {current === 3 && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-green-950 via-[#0a0a0a] to-emerald-950" />
            <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full bg-green-500/15 blur-[120px] animate-pulse-glow" />
          </>
        )}
        {current === 4 && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-[#0d2e1a] via-[#0a0a0a] to-emerald-950" />
            <div className="absolute bottom-1/3 left-1/2 w-96 h-96 rounded-full bg-[#1DB954]/15 blur-[120px] animate-pulse-glow" />
          </>
        )}
      </div>

      {/* Progress dots */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              setCurrent(i);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current
                ? 'w-8 bg-[#1DB954]'
                : i < current
                  ? 'w-4 bg-[#1DB954]/50'
                  : 'w-4 bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Slide content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current]}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-lg px-6"
        >
          {slides[current] === 'compatibility' && (
            <CompatibilityScore
              score={result.compatibilityScore}
              creatorName={blend.creatorName}
              joinerName={blend.joinerName}
              creatorAvatar={blend.creatorAvatar}
              joinerAvatar={blend.joinerAvatar}
            />
          )}
          {slides[current] === 'shared-artists' && (
            <SharedArtists artists={result.sharedArtists} />
          )}
          {slides[current] === 'genres' && (
            <GenreVenn genreOverlap={result.genreOverlap} />
          )}
          {slides[current] === 'unique-tastes' && (
            <UniqueTastes
              uniqueTastes={result.uniqueTastes}
              creatorName={blend.creatorName}
              joinerName={blend.joinerName}
            />
          )}
          {slides[current] === 'playlist' && (
            <PlaylistPreview
              playlist={result.playlist}
              blendId={blendId}
              creatorName={blend.creatorName}
              joinerName={blend.joinerName}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation hint */}
      {current < slides.length - 1 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 text-white/30 text-sm"
        >
          tap to continue
        </motion.p>
      )}

      {/* Back button */}
      {current > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors z-20"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}
    </main>
  );
}
