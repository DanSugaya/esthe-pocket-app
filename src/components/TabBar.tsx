'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Star, Trophy, User } from 'lucide-react';

/* §4.2 Bottom Tab Bar。お気に入りは★に統一する */
const TABS = [
  { href: '/', label: 'TOP', Icon: Home },
  { href: '/search', label: '店舗を探す', Icon: Search },
  { href: '/ranking', label: 'ランキング', Icon: Trophy },
  { href: '/favorites', label: 'お気に入り', Icon: Star },
  { href: '/mypage', label: 'マイページ', Icon: User },
];

export function TabBar() {
  const pathname = usePathname();
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`));

  return (
    <nav
      aria-label="メインメニュー"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-esthe-border bg-white pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="mx-auto flex h-[var(--tabbar-h)] max-w-[720px]">
        {TABS.map(({ href, label, Icon }) => {
          const active = isActive(href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`flex h-full flex-col items-center justify-center gap-0.5 text-tab ${
                  active ? 'font-bold text-esthe-primary' : 'text-esthe-caption'
                }`}
              >
                <Icon size={24} aria-hidden="true" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
