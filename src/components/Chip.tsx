import Link from 'next/link';
import type { ReactNode } from 'react';

/** §4.17 特徴タグ(アウトライン)。size="sm" は一覧カード内のコンパクト版 */
export function OutlineChip({
  children,
  brand,
  size = 'md',
}: {
  children: ReactNode;
  brand?: boolean;
  size?: 'sm' | 'md';
}) {
  const tone = brand ? 'border-esthe-primary font-bold text-esthe-primary' : 'border-esthe-muted text-esthe-caption';
  const shape = size === 'sm' ? 'rounded-esthe-sm border px-2 py-0.5 text-badge' : 'rounded-esthe-md border-2 px-3.5 py-1.5 text-title';
  return <span className={`inline-flex items-center ${shape} ${tone}`}>{children}</span>;
}

/** §4.12 絞り込み・エリア選択のチップ(ピル型)。href を渡すとリンク、無ければトグルボタン */
export function FilterChip({
  children,
  selected = false,
  size = 'md',
  icon,
  href,
  onClick,
}: {
  children: ReactNode;
  selected?: boolean;
  size?: 'md' | 'lg';
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  const cls = `inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-3.5 text-body transition-colors ${
    size === 'lg' ? 'min-h-11' : 'h-9'
  } ${selected ? 'bg-esthe-primary font-bold text-white' : 'bg-esthe-sub text-esthe-text active:bg-esthe-primary-light'}`;

  return href ? (
    <Link href={href} className={cls}>
      {icon}
      {children}
    </Link>
  ) : (
    <button type="button" aria-pressed={selected} onClick={onClick} className={cls}>
      {icon}
      {children}
    </button>
  );
}
