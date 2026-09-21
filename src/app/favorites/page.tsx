'use client';

import { useState } from 'react';
import { Star, Trash2 } from 'lucide-react';
import { AppBar } from '@/components/AppBar';
import { ShopRow } from '@/components/ShopCard';
import { TabList } from '@/components/Tabs';
import { SHOPS } from '@/lib/mock';

const TABS = [
  { id: 'favorites', label: 'お気に入り' },
  { id: 'history', label: '閲覧履歴' },
];

// API 接続までの仮データ
const INITIAL_FAVORITES = SHOPS.slice(0, 3);
const INITIAL_HISTORY = SHOPS.slice(3, 6);

function Empty({ children }: { children: string }) {
  return <p className="py-20 text-center text-title text-esthe-caption">{children}</p>;
}

export default function FavoritesPage() {
  const [tab, setTab] = useState('favorites');
  const [favorites, setFavorites] = useState(INITIAL_FAVORITES);
  const [history, setHistory] = useState(INITIAL_HISTORY);

  return (
    <>
      <AppBar title="お気に入り" />

      <TabList label="お気に入りのカテゴリー" items={TABS} value={tab} onChange={setTab} fill className="sticky top-[var(--header-total)] z-30" />

      <main>
        {tab === 'favorites' &&
          (favorites.length === 0 ? (
            <Empty>お気に入りの店舗はまだありません。</Empty>
          ) : (
            <ul className="divide-y divide-esthe-border">
              {favorites.map((shop) => (
                <li key={shop.id}>
                  <ShopRow
                    shop={shop}
                    action={
                      <button
                        type="button"
                        aria-label={`${shop.name}をお気に入りから外す`}
                        onClick={() => setFavorites((prev) => prev.filter((s) => s.id !== shop.id))}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-esthe-star"
                      >
                        <Star size={24} fill="currentColor" aria-hidden="true" />
                      </button>
                    }
                  />
                </li>
              ))}
            </ul>
          ))}

        {tab === 'history' &&
          (history.length === 0 ? (
            <Empty>閲覧履歴はありません。</Empty>
          ) : (
            <>
              <div className="flex justify-end border-b border-esthe-border px-2">
                <button
                  type="button"
                  aria-label="履歴をすべて削除"
                  onClick={() => setHistory([])}
                  className="flex h-11 w-11 items-center justify-center text-esthe-caption"
                >
                  <Trash2 size={20} aria-hidden="true" />
                </button>
              </div>
              <ul className="divide-y divide-esthe-border">
                {history.map((shop) => (
                  <li key={shop.id}>
                    <ShopRow shop={shop} note="2026/09/20 閲覧" />
                  </li>
                ))}
              </ul>
            </>
          ))}
      </main>
    </>
  );
}
