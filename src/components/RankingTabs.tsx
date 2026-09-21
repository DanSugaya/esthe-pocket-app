import type { ShopSummary } from '@/lib/types';
import { ShopRow } from './ShopCard';
import { Tabs } from './Tabs';

function RankingList({ shops }: { shops: ShopSummary[] }) {
  return (
    <ol className="divide-y divide-esthe-border">
      {shops.map((shop, i) => (
        <li key={shop.id}>
          <ShopRow shop={shop} rank={i + 1} />
        </li>
      ))}
    </ol>
  );
}

/**
 * §4.6 ランキング(タブ + リスト)。TOP と ランキングページで共通。
 * shops は人気順に並べ済みのものを渡す。エリア別・口コミ順は集計データができ次第タブを追加する
 */
export function RankingTabs({ shops, limit }: { shops: ShopSummary[]; limit: number }) {
  const newShops = shops.filter((s) => s.tags.some((t) => t.label === '新店'));

  return (
    <Tabs
      label="ランキングの種類"
      tabs={[
        { label: '総合', panel: <RankingList shops={shops.slice(0, limit)} /> },
        { label: '新店', panel: <RankingList shops={newShops.slice(0, limit)} /> },
      ]}
    />
  );
}
