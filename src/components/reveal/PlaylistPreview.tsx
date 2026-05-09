'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/utils/animations';
import { api } from '@/lib/api';
import { useState } from 'react';

export function PlaylistPreview({
  playlist,
  blendId,
  creatorName,
  joinerName,
}: {
  playlist: any[];
  blendId: string;
  creatorName: string;
  joinerName: string;
}) {
  const [pushing, setPushing] = useState(false);
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [sharing, setSharing] = useState(false);

  const handleAddToLibrary = async () => {
    setPushing(true);
    try {
      const { playlistUrl: url } = await api.pushPlaylist(blendId);
      setPlaylistUrl(url);
    } catch {
      alert('Failed to add playlist. Please try again.');
    }
    setPushing(false);
  };

  const handleShare = async () => {
    setSharing(true);
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d')!;

    const gradient = ctx.createLinearGradient(0, 0, 1080, 1920);
    gradient.addColorStop(0, '#581c87');
    gradient.addColorStop(0.5, '#0a0a0a');
    gradient.addColorStop(1, '#831843');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1920);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 120px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('Blendify', 540, 400);

    ctx.font = 'bold 200px system-ui';
    ctx.fillText(`${playlist.length}`, 540, 800);
    ctx.font = '48px system-ui';
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.fillText('tracks blended', 540, 880);

    ctx.font = '40px system-ui';
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.fillText(`${creatorName} x ${joinerName}`, 540, 1200);

    ctx.font = '32px system-ui';
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.fillText('blendify.app', 540, 1800);

    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], 'blendify-story.png', { type: 'image/png' });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'My Blendify Results',
        });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'blendify-story.png';
        a.click();
        URL.revokeObjectURL(url);
      }
      setSharing(false);
    });
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center text-center"
      onClick={(e) => e.stopPropagation()}
    >
      <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-2">
        Your Blend Playlist
      </motion.h2>
      <motion.p variants={fadeInUp} className="text-white/40 mb-6">
        {playlist.length} tracks curated for you both
      </motion.p>

      {/* Track list */}
      <motion.div
        variants={fadeInUp}
        className="w-full max-h-[40vh] overflow-y-auto space-y-2 mb-8 scrollbar-none"
      >
        {playlist.map((track: any, i: number) => (
          <motion.div
            key={`${track.title}-${i}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.05 }}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors"
          >
            <span className="text-xs text-white/20 w-6 text-right">{i + 1}</span>
            {track.albumArt ? (
              <img src={track.albumArt} alt="" className="w-10 h-10 rounded-lg object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-white/10" />
            )}
            <div className="text-left min-w-0 flex-1">
              <p className="text-sm font-medium truncate">{track.title}</p>
              <p className="text-xs text-white/40 truncate">{track.artist}</p>
            </div>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full ${
                track.source === 'shared'
                  ? 'bg-purple-500/20 text-purple-300'
                  : track.source === 'creator'
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'bg-pink-500/20 text-pink-300'
              }`}
            >
              {track.source === 'shared' ? 'both' : track.source === 'creator' ? 'you' : 'them'}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* CTAs */}
      <motion.div variants={fadeInUp} className="flex flex-col gap-3 w-full">
        {playlistUrl ? (
          <a
            href={playlistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 font-semibold text-center hover:opacity-90 transition-opacity"
          >
            Open in Your Library
          </a>
        ) : (
          <button
            onClick={handleAddToLibrary}
            disabled={pushing}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {pushing ? 'Adding...' : 'Add to My Library'}
          </button>
        )}

        <button
          onClick={handleShare}
          disabled={sharing}
          className="w-full py-4 rounded-2xl bg-white/10 font-semibold hover:bg-white/15 transition-colors disabled:opacity-50"
        >
          {sharing ? 'Generating...' : 'Share to Stories'}
        </button>
      </motion.div>
    </motion.div>
  );
}
