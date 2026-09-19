'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const TabBar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'TOP',
      href: '/',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="w-6 h-6" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
    },
    {
      label: '探す',
      href: '/search',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="w-6 h-6" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z" />
        </svg>
      ),
    },
    {
      label: '順位',
      href: '/ranking',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="w-6 h-6" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 0 3-3V8.25a3 3 0 0 0-3-3H15M7.5 18.75a3 3 0 0 1-3-3V8.25a3 3 0 0 1 3-3H9m0 0a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3m-6 0h6m-3 12.75v-3.75" />
        </svg>
      ),
    },
    {
      label: 'お気に入り',
      href: '/favorites',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="w-6 h-6" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      ),
    },
    {
      label: 'マイページ',
      href: '/mypage',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="w-6 h-6" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-[64px] bg-white border-t border-[var(--color-border)] flex justify-around items-center z-50 max-w-[720px] mx-auto pb-[env(safe-area-inset-bottom)] select-none">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
              isActive
                ? 'text-[var(--color-primary)] font-bold'
                : 'text-[var(--color-text-sub)] hover:text-[var(--color-primary)]'
            }`}
          >
            <div className="flex items-center justify-center w-6 h-6">
              {item.icon}
            </div>
            <span className="text-[11px] leading-[1.2] mt-1 font-medium">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

// 名前付きエクスポートとデフォルトエクスポートの両方を公開してビルドエラーを防止
export default TabBar;