import Link from 'next/link';
import { ChevronLeft, Search } from 'lucide-react';
import type { ReactNode } from 'react';

/* §4.1 App Bar。固定ヘッダー + 同じ高さのスペーサーを返すので、ページ側で pt を付ける必要はない */

const iconButton =
  'flex h-11 w-11 items-center justify-center rounded-full text-white active:bg-esthe-primary-dark focus-visible:outline-white';

export function HeaderIconLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <Link href={href} aria-label={label} className={iconButton}>
      {children}
    </Link>
  );
}

export function HeaderIconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className={`relative ${iconButton}`}>
      {children}
    </button>
  );
}

export function AppBar({
  title,
  backHref,
  actions,
}: {
  /** 省略時はブランド名(TOP用) */
  title?: string;
  backHref?: string;
  /** 右端。省略時は検索アイコン */
  actions?: ReactNode;
}) {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 bg-esthe-primary pt-[env(safe-area-inset-top)] text-white">
        <div className="mx-auto flex h-[var(--header-h)] max-w-[720px] items-center px-2">
          {backHref && (
            <HeaderIconLink href={backHref} label="前のページへ戻る">
              <ChevronLeft size={24} aria-hidden="true" />
            </HeaderIconLink>
          )}
          <div className="min-w-0 flex-1 px-2">
            {title ? (
              <h1 className="truncate text-h1 font-bold">{title}</h1>
            ) : (
              <Link href="/" className="text-h1 font-bold focus-visible:outline-white">
                エステポケット
              </Link>
            )}
          </div>
          {actions ?? (
            <HeaderIconLink href="/search" label="検索">
              <Search size={24} aria-hidden="true" />
            </HeaderIconLink>
          )}
        </div>
      </header>
      <div aria-hidden="true" className="h-[var(--header-total)]" />
    </>
  );
}
