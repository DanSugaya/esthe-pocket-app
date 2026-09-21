'use client';

import { useState, type UIEvent } from 'react';
import { Thumb } from '../Thumb';
import { HERO_SENTINEL_ID } from './ids';

const RATIO = { wide: 'aspect-video', portrait: 'aspect-[3/4]' } as const;

/**
 * §4.8 ヒーロー(詳細ページ用)。ドットインジケーター付き・自動送りなし(ユーザー操作のみ)。
 * 下端の番兵は DetailAppBar のヘッダー切替に使う
 */
export function HeroCarousel({
  images,
  ratio = 'wide',
}: {
  images: { src: string; alt: string }[];
  ratio?: keyof typeof RATIO;
}) {
  const [index, setIndex] = useState(0);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (el.clientWidth > 0) setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div className={`relative w-full bg-esthe-text ${RATIO[ratio]}`}>
      <div
        role="group"
        aria-roledescription="カルーセル"
        aria-label="画像"
        tabIndex={0}
        onScroll={handleScroll}
        className="scrollbar-none flex h-full snap-x snap-mandatory overflow-x-auto"
      >
        {images.map((img, i) => (
          <Thumb
            key={img.src}
            src={img.src}
            alt={img.alt}
            sizes="(min-width: 720px) 720px, 100vw"
            radius="none"
            bordered={false}
            preload={i === 0}
            className="h-full min-w-full snap-center"
          />
        ))}
      </div>

      {images.length > 1 && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center gap-1.5">
          {images.map((img, i) => (
            <span key={img.src} className={`h-2 w-2 rounded-full ${i === index ? 'bg-white' : 'bg-white/50'}`} />
          ))}
        </div>
      )}

      <div id={HERO_SENTINEL_ID} aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px" />
    </div>
  );
}
