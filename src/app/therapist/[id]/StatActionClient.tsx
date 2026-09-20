"use client";

import { Star, ThumbsUp } from "lucide-react";
import { useTherapistActions } from "./TherapistActionsProvider";

type StatActionClientProps = {
  /** 指標の下に出す補足(最大2行。例: 本日の出勤 / 累計指名) */
  notes?: string[];
};

const actionButton =
  "flex h-[var(--size-action,54px)] w-[var(--size-action,54px)] items-center justify-center " +
  "rounded-[var(--radius-circle)] bg-[var(--color-bg)] " +
  "transition-transform duration-200 ease-out active:scale-95 " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-[color:var(--color-primary)]";

export default function StatActionClient({ notes = [] }: StatActionClientProps) {
  const { like, favorite } = useTherapistActions();

  return (
    <div className="flex items-center justify-between gap-3 border-b border-[color:var(--color-border)] bg-[var(--color-bg)] px-4 py-3">
      {/* 左: 指標 + 補足 */}
      <div className="min-w-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-[color:var(--color-accent-like)]">
            <ThumbsUp size={20} aria-hidden="true" />
            <span className="text-[18px] font-bold leading-none tabular-nums text-[color:var(--color-text)]">
              {like.count.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[color:var(--color-accent-star)]">
            <Star size={20} fill="currentColor" aria-hidden="true" />
            <span className="text-[18px] font-bold leading-none tabular-nums text-[color:var(--color-text)]">
              {favorite.count.toLocaleString()}
            </span>
          </div>
        </div>

        {notes.length > 0 && (
          <div className="mt-2 flex flex-col gap-1 text-[13px] leading-[1.6] text-[color:var(--color-text-sub)]">
            {notes.slice(0, 2).map((note) => (
              <span key={note}>{note}</span>
            ))}
          </div>
        )}
      </div>

      {/* 右: アクション丸ボタン(状態は aria-pressed で伝えるため、ラベルは固定) */}
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          aria-pressed={like.active}
          aria-label="いいね"
          onClick={like.toggle}
          style={{ boxShadow: "var(--shadow-action)" }}
          className={`${actionButton} text-[color:var(--color-accent-like)] ${
            like.bounce ? "scale-[1.15]" : "scale-100"
          }`}
        >
          <ThumbsUp size={26} fill={like.active ? "currentColor" : "none"} aria-hidden="true" />
        </button>

        {/* お気に入りは★に統一(designsystem 4.2) */}
        <button
          type="button"
          aria-pressed={favorite.active}
          aria-label="お気に入り"
          onClick={favorite.toggle}
          style={{ boxShadow: "var(--shadow-action)" }}
          className={`${actionButton} text-[color:var(--color-accent-star)] ${
            favorite.bounce ? "scale-[1.15]" : "scale-100"
          }`}
        >
          <Star size={26} fill={favorite.active ? "currentColor" : "none"} aria-hidden="true" />
        </button>
      </div>

      {/* スクリーンリーダー向けの数値変化通知 */}
      <span className="sr-only" aria-live="polite">
        {`いいね ${like.count}件、お気に入り ${favorite.count}件`}
      </span>
    </div>
  );
}
