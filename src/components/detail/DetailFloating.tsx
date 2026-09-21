'use client';

import { useEffect, useState } from 'react';
import { ArrowUp, Gift, Phone, Star } from 'lucide-react';
import { BottomSheet } from '../BottomSheet';
import { ButtonLink } from '../Buttons';
import type { Coupon } from '@/lib/types';
import { useEngagement } from './EngagementProvider';
import { PRIMARY_CTA_ID } from './ids';

/**
 * 詳細ページの浮き要素をまとめて管理する。
 * - §4.20 追従CTAバー: 主CTA(PRIMARY_CTA_ID)が画面外に出たら下部タブの上に出す
 * - §4.9 トップへ戻るFAB: scrollY > 300 で表示
 * - §4.22 クーポンFAB: クーポンがある場合のみ表示。タップで一覧シート
 * 追従バーが出ている間は FAB を 56px 上へずらす
 */
export function DetailFloating({
  tel,
  ctaLabel = '電話で予約する',
  coupons = [],
}: {
  tel: string;
  ctaLabel?: string;
  coupons?: Coupon[];
}) {
  const { favorite } = useEngagement();
  const [stickyVisible, setStickyVisible] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [couponOpen, setCouponOpen] = useState(false);

  useEffect(() => {
    const cta = document.getElementById(PRIMARY_CTA_ID);
    if (!cta) return;
    const observer = new IntersectionObserver(([entry]) => setStickyVisible(!entry.isIntersecting));
    observer.observe(cta);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* data-sticky-cta: layout.tsx がこの存在を検知して下余白を足す */}
      <div
        data-sticky-cta
        inert={!stickyVisible}
        className={`fixed inset-x-0 bottom-[var(--tabbar-total)] z-20 h-[var(--sticky-cta-h)] border-t border-esthe-border bg-white transition-all duration-150 ease-in-out motion-reduce:transition-none ${
          stickyVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'
        }`}
      >
        <div className="mx-auto flex h-full max-w-[720px] items-center gap-2 px-4">
          <button
            type="button"
            aria-pressed={favorite.active}
            aria-label="お気に入り"
            onClick={favorite.toggle}
            className="flex h-11 w-11 shrink-0 items-center justify-center text-esthe-star"
          >
            <Star size={24} fill={favorite.active ? 'currentColor' : 'none'} aria-hidden="true" />
          </button>
          <ButtonLink href={`tel:${tel}`} size="md" full={false} className="flex-1" icon={<Phone size={18} aria-hidden="true" />}>
            {ctaLabel}
          </ButtonLink>
        </div>
      </div>

      <div
        className={`pointer-events-none fixed inset-x-0 z-30 transition-[bottom] duration-150 motion-reduce:transition-none ${
          stickyVisible
            ? 'bottom-[calc(var(--tabbar-total)+var(--sticky-cta-h)+16px)]'
            : 'bottom-[calc(var(--tabbar-total)+16px)]'
        }`}
      >
        <div className="relative mx-auto h-0 max-w-[720px]">
          {showTop && (
            <button
              type="button"
              aria-label="トップへ戻る"
              onClick={() => window.scrollTo({ top: 0 })}
              className="pointer-events-auto absolute bottom-0 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-esthe-overlay text-white shadow-esthe-float"
            >
              <ArrowUp size={24} aria-hidden="true" />
            </button>
          )}
          {coupons.length > 0 && (
            <button
              type="button"
              aria-label="利用できるクーポンを見る"
              onClick={() => setCouponOpen(true)}
              className="pointer-events-auto absolute -right-2 bottom-0 flex h-[72px] w-[88px] flex-col items-center justify-center rounded-l-[36px] bg-esthe-point pr-2 text-badge font-bold leading-tight text-esthe-text shadow-esthe-float"
            >
              <Gift size={22} aria-hidden="true" />
              <span>クーポン</span>
              <span>GET!!</span>
            </button>
          )}
        </div>
      </div>

      {couponOpen && (
        <BottomSheet title="利用できるクーポン" onClose={() => setCouponOpen(false)}>
          <ul className="space-y-3">
            {coupons.map((coupon) => (
              <li key={coupon.id} className="rounded-esthe-lg border-2 border-esthe-primary p-3">
                <p className="text-title font-bold text-esthe-promo">{coupon.title}</p>
                <p className="mt-1 text-caption text-esthe-caption">{coupon.condition}</p>
              </li>
            ))}
          </ul>
        </BottomSheet>
      )}
    </>
  );
}
