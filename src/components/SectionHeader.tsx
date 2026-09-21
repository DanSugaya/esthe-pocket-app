import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';

/**
 * §4.3 Section Header
 * - 一覧ページ: 既定(◆ + 下線)
 * - 詳細ページ: diamond={false}(§4.21 ◆なし)。下線が不要なら border={false}
 * - href を渡すと右端に「一覧 >」。それ以外の右端要素は children で渡す
 */
export function SectionHeader({
  title,
  sub,
  href,
  linkLabel = '一覧',
  diamond = true,
  border = true,
  children,
}: {
  title: string;
  /** 見出しの横に置く補足(例: 本日出勤5名) */
  sub?: string;
  href?: string;
  linkLabel?: string;
  diamond?: boolean;
  border?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className={`flex items-center justify-between gap-3 px-4 py-3 ${border ? 'border-b border-esthe-border' : ''}`}>
      <h2 className="flex min-w-0 items-baseline gap-2 text-h2 font-bold">
        {diamond && (
          <span aria-hidden="true" className="text-base text-esthe-primary">
            ◆
          </span>
        )}
        <span>{title}</span>
        {sub && <span className="text-body font-normal text-esthe-caption">{sub}</span>}
      </h2>
      {href ? (
        <Link href={href} className="inline-flex shrink-0 items-center text-title font-bold text-esthe-primary">
          {linkLabel}
          <ChevronRight size={16} aria-hidden="true" />
        </Link>
      ) : (
        children
      )}
    </div>
  );
}
