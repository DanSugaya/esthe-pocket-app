'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const TabBar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { label: 'TOP', href: '/', icon: '🏠' },
    { label: '探す', href: '/search', icon: '🔍' },
    { label: '順位', href: '/ranking', icon: '🏆' },
    { label: 'お気に入り', href: '/favorites', icon: '♥' },
    { label: 'マイページ', href: '/mypage', icon: '👤' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-[64px] bg-white border-t border-[var(--color-border)] flex justify-around items-center z-50 max-w-[720px] mx-auto pb-[env(safe-area-inset-bottom)]">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center transition-colors ${
              isActive
                ? 'text-[var(--color-primary)] font-bold'
                : 'text-[var(--color-text-sub)] hover:text-[var(--color-primary)]'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-[11px] mt-0.5">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};