"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, Share2 } from "lucide-react";

type DetailAppBarClientProps = {
  title: string;
  /**
   * ヒーロー下端に置いた番兵要素の id。
   * Server Component から ref は渡せないため、id で受け取る。
   */
  sentinelId?: string;
  onBack?: () => void;
};

const HEADER_H = 56;

const iconButton =
  "relative flex h-10 w-10 items-center justify-center rounded-full text-white " +
  "transition-colors duration-150 ease-in-out motion-reduce:transition-none " +
  // 見た目は40px、タップ領域は44px(designsystem 4.9)
  "before:absolute before:-inset-0.5 before:content-[''] " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export default function DetailAppBarClient({
  title,
  sentinelId = "hero-sentinel",
  onBack,
}: DetailAppBarClientProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const el = document.getElementById(sentinelId);
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // 「ヘッダーの下に潜った」ときだけ true。
        // 画面が低く、番兵が画面の下側にある場合(交差していない)は false のまま。
        setIsScrolled(!entry.isIntersecting && entry.boundingClientRect.top < HEADER_H);
      },
      { root: null, rootMargin: `-${HEADER_H}px 0px 0px 0px`, threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [sentinelId]);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const showToast = (message: string) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2000);
  };

  const handleBack = () => {
    if (onBack) onBack();
    else window.history.back();
  };

  const handleShare = async () => {
    const url = window.location.href;

    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, url });
      } catch {
        // ユーザーがキャンセルした場合など。何もしない
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      showToast("URLをコピーしました");
    } catch {
      showToast("URLをコピーできませんでした");
    }
  };

  const circleBg = isScrolled ? "bg-transparent" : "bg-[var(--color-scrim)]";

  return (
    <>
      <header
        style={{ height: "var(--header-h, 56px)" }}
        className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-4 transition-colors duration-150 ease-in-out motion-reduce:transition-none ${
          isScrolled ? "bg-[var(--color-primary)]" : "bg-transparent"
        }`}
      >
        <button
          type="button"
          onClick={handleBack}
          aria-label="前のページへ戻る"
          className={`${iconButton} ${circleBg}`}
        >
          <ChevronLeft size={24} aria-hidden="true" />
        </button>

        {/* ページ最上部では非表示(h1 が本文にあるため読み上げ対象からも外す) */}
        <div
          aria-hidden={!isScrolled}
          className={`mx-3 min-w-0 flex-1 truncate text-center text-[14px] font-bold leading-[1.4] text-white transition-opacity duration-150 motion-reduce:transition-none ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`}
        >
          {title}
        </div>

        <button
          type="button"
          onClick={handleShare}
          aria-label="このページをシェア"
          className={`${iconButton} ${circleBg}`}
        >
          <Share2 size={22} aria-hidden="true" />
        </button>
      </header>

      {/* ライブリージョンは常に存在させる(後から挿入すると読み上げされないことがある) */}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 z-50 flex justify-center"
        style={{
          // 下部タブ + 追従CTA の上
          bottom:
            "calc(var(--tabbar-h, 64px) + var(--sticky-cta-h, 56px) + 24px + env(safe-area-inset-bottom))",
        }}
      >
        {toast && (
          <span
            className="rounded-[var(--radius-pill)] px-4 py-2 text-[13px] font-medium text-white"
            style={{ backgroundColor: "rgba(34, 34, 34, 0.9)" }}
          >
            {toast}
          </span>
        )}
      </div>
    </>
  );
}
