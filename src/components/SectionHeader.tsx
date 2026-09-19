import React from 'react';

export function AppBar() {
  return (
    <header className="fixed top-0 left-0 right-0 max-w-[720px] mx-auto h-[56px] bg-[var(--color-primary)] text-white flex items-center justify-between px-4 font-bold text-lg z-20 shadow-sm">
      {/* 左側ダミー（ロゴを中央に配置するためのスペース） */}
      <div className="w-[44px] h-[44px]" />

      {/* 中央：ロゴ / サイト名 */}
      <div className="tracking-wide text-[18px]">
        エステポケット
      </div>

      {/* 右側：検索アイコン (タップ領域 44x44px) */}
      <button
        type="button"
        aria-label="検索"
        className="w-[44px] h-[44px] flex items-center justify-center -mr-2 hover:opacity-80 transition-opacity"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z"
          />
        </svg>
      </button>
    </header>
  );
}