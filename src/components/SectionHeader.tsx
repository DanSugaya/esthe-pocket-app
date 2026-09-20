import React from 'react';
import Link from 'next/link';
import { ChevronRight } from './Icons';

interface SectionHeaderProps {
  title: string;
  /** 右端リンクの文言(シェブロンは自動で付く) */
  moreText?: string;
  href?: string;
  /** クライアントコンポーネントから使う場合のみ */
  onMoreClick?: () => void;
}

// 4.3 Section Header(◆見出し)。hooks を使わないので 'use client' は不要。
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  moreText = '一覧',
  href,
  onMoreClick,
}) => {
  const moreClass =
    '-my-2 -mr-2 inline-flex min-h-[44px] items-center gap-0.5 pl-2 pr-2 text-[13px] font-bold text-[var(--color-primary)] hover:underline active:opacity-70 transition-opacity';

  const moreInner = (
    <>
      {moreText}
      <ChevronRight className="h-4 w-4" />
    </>
  );

  return (
    <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-white px-4 py-3">
      {/* 見出しブロック */}
      <div className="flex min-w-0 items-center gap-1.5 pr-2">
        {/* ひし形記号(◆ 16px) */}
        <span className="shrink-0 select-none text-[16px] leading-none text-[var(--color-primary)]" aria-hidden="true">
          ◆
        </span>
        {/* セクションタイトル(17px / 太字 / 長い場合は省略) */}
        <h2 className="truncate text-[17px] font-bold leading-[1.4] text-[var(--color-text)]">{title}</h2>
      </div>

      {/* 一覧 / もっと見る リンク */}
      {href ? (
        <Link href={href} className={`shrink-0 ${moreClass}`}>
          {moreInner}
        </Link>
      ) : onMoreClick ? (
        <button type="button" onClick={onMoreClick} className={`shrink-0 ${moreClass}`}>
          {moreInner}
        </button>
      ) : null}
    </div>
  );
};

export default SectionHeader;
