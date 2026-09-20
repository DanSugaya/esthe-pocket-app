'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Star } from './Icons';

const navItems = [
  {
    label: 'TOP',
    href: '/',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="h-6 w-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    label: '店舗を探す',
    href: '/search',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="h-6 w-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z" />
      </svg>
    ),
  },
  {
    label: 'ランキング',
    href: '/ranking',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="h-6 w-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 0 3-3V8.25a3 3 0 0 0-3-3H15M7.5 18.75a3 3 0 0 1-3-3V8.25a3 3 0 0 1 3-3H9m0 0a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3m-6 0h6m-3 12.75v-3.75" />
      </svg>
    ),
  },
  {
    label: 'お気に入り',
    href: '/favorites',
    // お気に入りの記号は「★」に統一(§4.2。♡は使わない)
    icon: <Star className="h-6 w-6" />,
  },
  {
    label: 'マイページ',
    href: '/mypage',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="h-6 w-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
  },
];

export const TabBar: React.FC = () => {
  const pathname = usePathname();

  // '/' だけは完全一致、それ以外は配下のページ(/search/xxx など)でもアクティブにする
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav
      aria-label="メインメニュー"
      // 高さは 64px + セーフエリア(§4.2)。padding だけだと box-sizing の都合で 64px に食い込むため合計値を指定する
      className="fixed inset-x-0 bottom-0 z-50 mx-auto flex h-[var(--tabbar-total)] max-w-[720px] select-none items-center justify-around border-t border-[var(--color-border)] bg-white pb-[env(safe-area-inset-bottom)]"
    >
      {navItems.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={`flex h-full w-full flex-col items-center justify-center transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color:var(--color-primary)] ${
              active
                ? 'text-[var(--color-primary)]'
                : 'text-[var(--color-text-sub)] hover:text-[var(--color-primary)]'
            }`}
          >
            <span className="flex h-6 w-6 items-center justify-center">{item.icon}</span>
            <span className="mt-1 text-[11px] font-medium leading-[1.2]">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default TabBar;
