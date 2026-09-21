'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Share2 } from 'lucide-react';
import { HERO_SENTINEL_ID } from './ids';

const HEADER_H = 56;

const iconButton =
  // 見た目は40px、タップ領域は44px(::before で広げる)
  "relative flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors duration-150 before:absolute before:-inset-0.5 before:content-[''] motion-reduce:transition-none focus-visible:outline-white";

/**
 * §4.13 詳細ページ用ヘッダー。
 * ヒーロー下端の番兵(HERO_SENTINEL_ID)がヘッダーの下に潜ったら、透明 → primary 背景 + タイトル表示に切り替える
 */
export function DetailAppBar({ title }: { title: string }) {
  const router = useRouter();
  const [solid, setSolid] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const sentinel = document.getElementById(HERO_SENTINEL_ID);
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      // 画面が低く番兵が画面の下側にあるだけの場合(交差していない)は切り替えない
      ([entry]) => setSolid(!entry.isIntersecting && entry.boundingClientRect.top < HEADER_H),
      { rootMargin: `-${HEADER_H}px 0px 0px 0px` },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const showToast = (message: string) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2000);
  };

  const handleBack = () => {
    // 直接URLで開いた場合は戻る先が無いので TOP へ
    if (window.history.length > 1) router.back();
    else router.push('/');
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, url });
      } catch {
        // ユーザーがキャンセルした場合。何もしない
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      showToast('URLをコピーしました');
    } catch {
      showToast('URLをコピーできませんでした');
    }
  };

  const circle = solid ? 'bg-transparent' : 'bg-esthe-scrim';

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 pt-[env(safe-area-inset-top)] transition-colors duration-150 motion-reduce:transition-none ${
          solid ? 'bg-esthe-primary' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-[var(--header-h)] max-w-[720px] items-center justify-between px-4">
          <button type="button" onClick={handleBack} aria-label="前のページへ戻る" className={`${iconButton} ${circle}`}>
            <ChevronLeft size={24} aria-hidden="true" />
          </button>

          {/* ページ最上部では非表示。h1 が本文にあるので読み上げ対象からも外す */}
          <p
            aria-hidden={!solid}
            className={`mx-3 min-w-0 flex-1 truncate text-center text-title font-bold text-white transition-opacity duration-150 motion-reduce:transition-none ${
              solid ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {title}
          </p>

          <button type="button" onClick={handleShare} aria-label="このページをシェア" className={`${iconButton} ${circle}`}>
            <Share2 size={22} aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* ライブリージョンは常設する(後から挿入すると読み上げされないことがある) */}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-[calc(var(--tabbar-total)+var(--sticky-cta-h)+24px)] z-50 flex justify-center"
      >
        {toast && <span className="rounded-full bg-esthe-text/90 px-4 py-2 text-body font-medium text-white">{toast}</span>}
      </div>
    </>
  );
}
