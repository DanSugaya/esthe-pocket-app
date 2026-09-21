import Link from 'next/link';
import type { ReactNode } from 'react';
import type { ShopSummary } from '@/lib/types';
import { formatNumber, shopLine } from '@/lib/utils';
import { OutlineChip } from './Chip';
import { Metric } from './Metric';
import { CouponBand, OpenBadge } from './Status';
import { Thumb } from './Thumb';

/* 店舗カード 3種。いずれもカード全体が /shops/[id] へのリンク */

/** §4.4 グリッド(2列)用。TOP の「大人気の店舗」など */
export function ShopGridCard({ shop }: { shop: ShopSummary }) {
  return (
    <Link href={`/shops/${shop.id}`} className="press block">
      <Thumb src={shop.image} alt="" sizes="(min-width: 720px) 344px, 50vw" className="aspect-video">
        {/* §4.7 オーバーレイラベル: 白85% 背景 + primary 太字 */}
        {shop.label && (
          <span className="absolute inset-x-0 bottom-0 bg-white/85 py-0.5 text-center text-badge font-bold leading-[1.4] text-esthe-primary">
            {shop.label}
          </span>
        )}
      </Thumb>
      <p className="mt-2 truncate text-title font-bold">{shop.name}</p>
      <p className="mt-1 truncate text-caption text-esthe-caption">{shopLine(shop)}</p>
    </Link>
  );
}

// 1〜3位は金・銀・銅。上に置く文字は --color-text(§4.6)
const RANK_COLOR = ['bg-esthe-gold text-esthe-text', 'bg-esthe-silver text-esthe-text', 'bg-esthe-bronze text-esthe-text'];

/**
 * §4.6 リスト行。rank を渡すとランクバッジ付き(ランキング)。
 * action は行の右端に置く操作(リンクの外側に描画するので、ボタンを入れても入れ子にならない)
 */
export function ShopRow({
  shop,
  rank,
  note,
  action,
}: {
  shop: ShopSummary;
  rank?: number;
  /** 説明文の下に出す補足(例: 閲覧日) */
  note?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-center gap-1 pr-2">
      <Link href={`/shops/${shop.id}`} className="press flex min-w-0 flex-1 items-center gap-3 py-3 pl-4">
        <Thumb src={shop.image} alt="" sizes="130px" className="h-[88px] w-[130px] shrink-0">
          {rank && (
            <span
              className={`absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-br-esthe-md text-caption font-bold ${
                RANK_COLOR[rank - 1] ?? 'bg-esthe-primary text-white'
              }`}
            >
              <span className="sr-only">第</span>
              {rank}
              <span className="sr-only">位</span>
            </span>
          )}
        </Thumb>
        <div className="min-w-0 flex-1">
          <p className="truncate text-title font-bold">{shop.name}</p>
          <p className="mt-0.5 truncate text-caption text-esthe-caption">{shopLine(shop)}</p>
          {note && <p className="mt-0.5 text-caption text-esthe-caption">{note}</p>}
          {shop.promo && <p className="mt-1 truncate text-caption font-bold text-esthe-promo">{shop.promo}</p>}
          <div className="mt-1 flex items-center justify-end gap-3">
            <Metric kind="like" value={shop.likes} />
            <Metric kind="favorite" value={shop.favorites} />
          </div>
        </div>
      </Link>
      {action}
    </div>
  );
}

/** 検索結果用の大きめカード */
export function ShopListCard({ shop }: { shop: ShopSummary }) {
  return (
    <article className="relative overflow-hidden rounded-esthe-lg border border-esthe-border">
      {/* §12 広告(PR)の明示 */}
      {shop.isPR && (
        <span className="absolute left-2 top-2 z-10 rounded-esthe-sm bg-black/60 px-1.5 py-0.5 text-badge font-bold text-white">PR</span>
      )}
      <Link href={`/shops/${shop.id}`} className="press flex flex-col sm:flex-row">
        <Thumb
          src={shop.image}
          alt=""
          sizes="(min-width: 640px) 220px, 100vw"
          radius="none"
          bordered={false}
          className="h-[140px] shrink-0 sm:h-auto sm:w-[220px]"
        >
          {shop.hasCoupon && <CouponBand label="クーポン利用可能" />}
        </Thumb>
        <div className="flex flex-1 flex-col justify-between p-3 sm:p-4">
          <div>
            <ul className="mb-1.5 flex flex-wrap gap-1.5">
              {shop.tags.map((tag) => (
                <li key={tag.label}>
                  <OutlineChip size="sm" brand={tag.brand}>
                    {tag.label}
                  </OutlineChip>
                </li>
              ))}
            </ul>
            <h3 className="line-clamp-1 text-base font-bold text-esthe-primary">{shop.name}</h3>
            <p className="mt-1 line-clamp-1 text-body text-esthe-caption">
              {shop.area} ／ {shop.station} 徒歩{shop.walkMin}分
            </p>
            <p className="mt-2 text-title font-bold">
              {shop.minMinutes}分{' '}
              <span className="text-btn tabular-nums text-esthe-primary">{formatNumber(shop.minPrice)}円〜</span>
              <span className="ml-1 text-caption font-normal text-esthe-caption">(税込)</span>
            </p>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-esthe-border pt-2">
            <div className="flex items-center gap-3">
              <Metric kind="like" value={shop.likes} />
              <Metric kind="favorite" value={shop.favorites} />
            </div>
            <OpenBadge isOpen={shop.isOpen} />
          </div>
        </div>
      </Link>
    </article>
  );
}
