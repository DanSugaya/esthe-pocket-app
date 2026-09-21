'use client';

import { Star, ThumbsUp, type LucideIcon } from 'lucide-react';
import { Metric } from '../Metric';
import { useEngagement } from './EngagementProvider';

function ActionButton({
  label,
  Icon,
  color,
  active,
  bounce,
  onClick,
}: {
  label: string;
  Icon: LucideIcon;
  color: string;
  active: boolean;
  bounce: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={label}
      onClick={onClick}
      className={`flex h-[var(--size-action)] w-[var(--size-action)] items-center justify-center rounded-full bg-white shadow-esthe-action transition-transform duration-200 ease-out active:scale-95 ${color} ${
        bounce ? 'scale-[1.15]' : ''
      }`}
    >
      <Icon size={26} fill={active ? 'currentColor' : 'none'} aria-hidden="true" />
    </button>
  );
}

/** §4.15 指標(いいね・お気に入り数)+ 補足行 + アクション丸ボタン */
export function StatActionRow({ notes = [] }: { notes?: string[] }) {
  const { like, favorite } = useEngagement();

  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3">
      <div className="min-w-0">
        <div className="flex items-center gap-4">
          <Metric kind="like" value={like.count} size="lg" />
          <Metric kind="favorite" value={favorite.count} size="lg" />
        </div>
        {notes.length > 0 && (
          <p className="mt-2 flex flex-col gap-1 text-body text-esthe-caption">
            {notes.slice(0, 2).map((note) => (
              <span key={note}>{note}</span>
            ))}
          </p>
        )}
      </div>

      <div className="flex shrink-0 gap-2">
        <ActionButton label="いいね" Icon={ThumbsUp} color="text-esthe-like" active={like.active} bounce={like.bounce} onClick={like.toggle} />
        <ActionButton label="お気に入り" Icon={Star} color="text-esthe-star" active={favorite.active} bounce={favorite.bounce} onClick={favorite.toggle} />
      </div>

      {/* スクリーンリーダー向けの数値変化通知 */}
      <span className="sr-only" aria-live="polite">
        {`いいね ${like.count}件、お気に入り ${favorite.count}件`}
      </span>
    </div>
  );
}
