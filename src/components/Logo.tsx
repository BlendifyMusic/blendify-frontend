import Image from 'next/image';

export function Logo({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <Image
      src="/logo.svg"
      alt="Blendify"
      width={size}
      height={size}
      className={className}
    />
  );
}
