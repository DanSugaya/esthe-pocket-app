'use client';

import React from 'react';
import Link from 'next/link';

interface SectionHeaderProps {
  title: string;
  moreText?: string;
  href?: string;
  onMoreClick?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  moreText = '一覧 >',
  href,
  onMoreClick,
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-[var(--color-border)]">
      {/* 見出しブロック */}
      <div className="flex items-center gap-1.5 min-w-0 pr-2">
        {/* ひし形記号（◆） */}
        <span
          className="text-[var(--color-primary)] font-bold text-[14px] shrink-0 select-none"
          aria-hidden="true"
        >
          ◆
        </span>
        {/* セクションタイトル（17px / 太字 / 長い場合は省略） */}
        <h2 className="font-bold text-[17px] leading-[1.4] text-[var(--color-text)] truncate">
          {title}
        </h2>
      </div>

      {/* もっと見る / 一覧 リンクボタン */}
      {(href || onMoreClick) && (
        <div className="shrink-0">
          {href ? (
            <Link
              href={href}
              className="text-[13px] font-bold text-[var(--color-primary)] hover:underline active:opacity-70 transition-opacity"
            >
              {moreText}
            </Link>
          ) : (
            <button
              type="button"
              onClick={onMoreClick}
              className="text-[13px] font-bold text-[var(--color-primary)] hover:underline active:opacity-70 transition-opacity"
            >
              {moreText}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// デフォルトエクスポートも追加しておくことで、どちらのインポート方法でもエラーにならなくなります
export default SectionHeader;