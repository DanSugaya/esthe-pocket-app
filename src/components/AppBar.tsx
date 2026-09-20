import Link from 'next/link';

// 4.1 App Bar。ステータスバー領域(safe-area-inset-top)も同色で塗る。
// ロゴは見出しではないため h1 にしない(ページ側の h1 と重複させない)。
export function AppBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 mx-auto flex h-[var(--header-total)] max-w-[720px] select-none items-center justify-between bg-[var(--color-primary)] px-4 pt-[env(safe-area-inset-top)] text-white">
      {/* 左側ダミー(ロゴを中央に配置するためのスペース) */}
      <div className="h-[44px] w-[44px]" aria-hidden="true" />

      {/* 中央:ロゴ / サイト名 */}
      <Link
        href="/"
        className="truncate rounded text-[18px] font-bold tracking-wide text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        エステポケット
      </Link>

      {/* 右側:検索アイコン(タップ領域 44x44px) */}
      <Link
        href="/search"
        aria-label="検索"
        className="-mr-2 flex h-[44px] w-[44px] items-center justify-center rounded-full transition-opacity hover:opacity-80 active:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.75}
          stroke="currentColor"
          className="h-6 w-6"
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

export default AppBar;
