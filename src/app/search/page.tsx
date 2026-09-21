'use client';

import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { AppBar } from '@/components/AppBar';
import { FilterChip } from '@/components/Chip';
import { SectionHeader } from '@/components/SectionHeader';
import { ShopListCard } from '@/components/ShopCard';
import { TabList } from '@/components/Tabs';
import { AREAS, SHOPS } from '@/lib/mock';
import type { ShopSummary } from '@/lib/types';

const ALL_AREAS = 'すべて';

const SORTS = [
  { id: 'recommend', label: 'おすすめ順' },
  { id: 'likes', label: 'いいね順' },
  { id: 'favorites', label: '★評価順' },
  { id: 'price', label: '料金が安い順' },
];

const SORT_FN: Record<string, (a: ShopSummary, b: ShopSummary) => number> = {
  recommend: () => 0,
  likes: (a, b) => b.likes - a.likes,
  favorites: (a, b) => b.favorites - a.favorites,
  price: (a, b) => a.minPrice - b.minPrice,
};

/** 「渋谷・恵比寿・代官山」のような複合エリア名は、含まれる地名のどれかに一致すればよい */
const matchesArea = (shop: ShopSummary, area: string) => area.split('・').some((name) => shop.area.includes(name));

export default function SearchPage() {
  const [keyword, setKeyword] = useState('');
  const [area, setArea] = useState(ALL_AREAS);
  const [sort, setSort] = useState('recommend');

  const results = useMemo(() => {
    const word = keyword.trim();
    return SHOPS.filter(
      (shop) =>
        (area === ALL_AREAS || matchesArea(shop, area)) &&
        (!word || [shop.name, shop.area, shop.station].some((s) => s.includes(word))),
    ).sort(SORT_FN[sort]);
  }, [keyword, area, sort]);

  return (
    <>
      <AppBar title="店舗を探す" backHref="/" />

      <main>
        <div className="space-y-3 p-4">
          {/* §4.12 キーワード検索 */}
          <div className="relative">
            <Search size={18} aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-esthe-muted" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              aria-label="店舗名・エリア・駅名で検索"
              placeholder="店舗名・エリア・駅名で検索"
              className="h-11 w-full rounded-full bg-esthe-sub pl-11 pr-11 text-title placeholder:text-esthe-muted"
            />
            {keyword && (
              <button
                type="button"
                aria-label="キーワードを消す"
                onClick={() => setKeyword('')}
                className="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center text-esthe-muted"
              >
                <X size={18} aria-hidden="true" />
              </button>
            )}
          </div>

          {/* エリア絞り込み(横スクロール) */}
          <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4">
            {[ALL_AREAS, ...AREAS].map((name) => (
              <FilterChip key={name} selected={area === name} onClick={() => setArea(name)}>
                {name}
              </FilterChip>
            ))}
          </div>
        </div>

        {/* §4.10 並び替え */}
        <TabList label="並び替え" items={SORTS} value={sort} onChange={setSort} />

        <SectionHeader title="検索結果">
          <span className="text-body text-esthe-caption">
            該当 <strong className="text-base tabular-nums text-esthe-primary">{results.length}</strong> 件
          </span>
        </SectionHeader>

        {results.length === 0 ? (
          <p className="px-4 py-10 text-center text-body text-esthe-caption">条件に合う店舗が見つかりませんでした。</p>
        ) : (
          <ul className="space-y-4 p-4">
            {results.map((shop) => (
              <li key={shop.id}>
                <ShopListCard shop={shop} />
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
