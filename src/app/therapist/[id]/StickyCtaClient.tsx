"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useTherapistActions } from "./TherapistActionsProvider";

type StickyCtaClientProps = {
  tel: string;
  /** 監視する主CTAの id。これが画面外に出たら追従バーを出す(designsystem 4.20) */
  targetId?: string;
};

export default function StickyCtaClient({
  tel,
  targetId = "primary-cta",
}: StickyCtaClientProps) {
  const { favorite } = useTherapistActions();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [targetId]);

  return (
    <div
      // 非表示中はフォーカス・読み上げ対象から外す
      inert={!visible}
      className={`fixed inset-x-0 z-20 flex items-center border-t border-[color:var(--color-border)] bg-[var(--color-bg)] px-4 transition-all duration-150 ease-in-out motion-reduce:transition-none lg:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
      style={{
        height: "var(--sticky-cta-h, 56px)",
        // 下部タブ(64px + safe-area)のすぐ上
        bottom: "calc(var(--tabbar-h, 64px) + env(safe-area-inset-bottom))",
      }}
    >
      <button
        type="button"
        aria-pressed={favorite.active}
        aria-label="お気に入り"
        onClick={favorite.toggle}
        className="flex h-11 w-11 shrink-0 items-center justify-center text-[color:var(--color-accent-star)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-primary)]"
      >
        <Star size={24} fill={favorite.active ? "currentColor" : "none"} aria-hidden="true" />
      </button>

      <a
        href={`tel:${tel}`}
        className="ml-2 flex h-12 flex-1 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary)] text-[14px] font-bold text-white active:bg-[var(--color-primary-dark)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-primary)]"
      >
        指名して電話で予約する
      </a>
    </div>
  );
}
