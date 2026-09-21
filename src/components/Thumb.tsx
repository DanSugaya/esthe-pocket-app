import Image from 'next/image';
import type { ReactNode } from 'react';

const RADIUS = { none: '', sm: 'rounded-esthe-sm', md: 'rounded-esthe-md', lg: 'rounded-esthe-lg' } as const;

/**
 * サムネイル枠(比率・サイズは className で指定)。バッジ等のオーバーレイは children に置く。
 * data: / 外部URL は next/image の最適化を通さない(外部ドメインを最適化したい場合は
 * next.config の images.remotePatterns に登録し、ここの unoptimized 判定を外す)。
 */
export function Thumb({
  src,
  alt,
  sizes,
  className = '',
  radius = 'md',
  bordered = true,
  preload,
  children,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  radius?: keyof typeof RADIUS;
  bordered?: boolean;
  preload?: boolean;
  children?: ReactNode;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-esthe-sub ${bordered ? 'border border-esthe-border' : ''} ${RADIUS[radius]} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        preload={preload}
        unoptimized={src.startsWith('data:') || /^https?:/.test(src)}
        className="object-cover"
      />
      {children}
    </div>
  );
}
