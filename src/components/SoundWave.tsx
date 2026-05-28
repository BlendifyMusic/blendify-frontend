'use client';

const bars = [8, 14, 22, 30, 26, 18, 12, 22, 34, 26, 16, 10, 20, 32, 24, 14, 8, 18, 28, 22, 12, 16, 26, 20, 10];

export function SoundWave() {
  return (
    <div className="flex items-center gap-[3px]">
      {bars.map((h, i) => (
        <div
          key={i}
          className="w-[3px] rounded-sm bg-[#1DB954]/25"
          style={{
            height: `${h}px`,
            animation: `pulse-bar ${0.6 + (i % 5) * 0.15}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.04}s`,
          }}
        />
      ))}
    </div>
  );
}
