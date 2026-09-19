'use client';

import React from 'react';
import Link from 'next/link';

export function AppBar() {
  return (
    <header className="fixed top-0 left-0 right-0 max-w-[720px] mx-auto h-[56px] bg-[var(--color-primary)] text-white flex items-center justify-between px-4 z-20 shadow-sm select-none">
      {/* 左側ダミー（ロゴを中央に配置するためのスペース） */}
      <div className="w-[44px] h-[44px]" aria-hidden="true" />

      {/* 中央：ロゴ / サイト名 */}
      <h1 className="font-bold text-[18px] tracking-wide text-white truncate">
        <Link href="/" className="hover:opacity-90 transition-opacity">
          エステポケット
        </Link>
      </h1>

      {/* 右側：検索アイコン (タップ領域 44x44px) */}
      <Link
        href="/search"
        aria-label="検索"
        className="w-[44px] h-[44px] flex items-center justify-center -mr-2 hover:opacity-80 active:opacity-60 transition-opacity rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.75}
          stroke="currentColor"
          className="w-6 h-6"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z"
          />
        </svg>
      </Link>
    </header>
  );
}

// Named export と Default export の両方を公開（ビルドエラー防止）
export default AppBar;