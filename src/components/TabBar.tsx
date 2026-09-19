import React from 'react';

export const TabBar: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-[64px] bg-white border-t border-[var(--color-border)] flex justify-around items-center z-50 max-w-[720px] mx-auto pb-[env(safe-area-inset-bottom)]">
      <button className="flex flex-col items-center text-[var(--color-primary)] font-bold">
        <span className="text-xl">🏠</span>
        <span className="text-[11px] mt-0.5">TOP</span>
      </button>
      <button className="flex flex-col items-center text-[var(--color-text-sub)] hover:text-[var(--color-primary)]">
        <span className="text-xl">🔍</span>
        <span className="text-[11px] mt-0.5">探す</span>
      </button>
      <button className="flex flex-col items-center text-[var(--color-text-sub)] hover:text-[var(--color-primary)]">
        <span className="text-xl">🏆</span>
        <span className="text-[11px] mt-0.5">順位</span>
      </button>
      <button className="flex flex-col items-center text-[var(--color-text-sub)] hover:text-[var(--color-primary)]">
        <span className="text-xl">♥</span>
        <span className="text-[11px] mt-0.5">お気に入り</span>
      </button>
      <button className="flex flex-col items-center text-[var(--color-text-sub)] hover:text-[var(--color-primary)]">
        <span className="text-xl">👤</span>
        <span className="text-[11px] mt-0.5">マイページ</span>
      </button>
    </nav>
  );
};