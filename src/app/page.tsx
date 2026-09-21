import { MapPin } from 'lucide-react';
import { AppBar } from '@/components/AppBar';
import { ButtonLink } from '@/components/Buttons';
import { FilterChip } from '@/components/Chip';
import { Divider } from '@/components/Divider';
import { RankingTabs } from '@/components/RankingTabs';
import { SectionHeader } from '@/components/SectionHeader';
import { ShopGridCard } from '@/components/ShopCard';
import { TherapistCompactCard } from '@/components/TherapistCard';
import { AREAS, SHOPS, THERAPISTS, getShop } from '@/lib/mock';
import { byPopularity } from '@/lib/utils';

export default function Home() {
  const workingTherapists = THERAPISTS.filter((t) => t.status !== 'off');

  return (
    <>
      <AppBar />

      <main>
        {/* §4.8 ヒーロー(カルーセル実装までは静的なバナー) */}
        <section
          aria-label="特集"
          className="relative isolate flex aspect-[16/10] w-full flex-col items-center justify-center overflow-hidden bg-esthe-primary-dark px-4 text-center text-white"
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/60 to-transparent" />
          <span className="mb-2 inline-block rounded-esthe-sm bg-esthe-promo px-2 py-0.5 text-badge font-bold">期間限定キャンペーン</span>
          <h1 className="text-h1 font-bold">新規オープン店舗 特集</h1>
          <p className="mt-1 text-caption text-white/80">初回利用で使える限定クーポン配布中！</p>
        </section>

        {/* エリア選択(チップ / 横スクロール) */}
        <nav aria-label="エリアから探す" className="border-b border-esthe-border p-4">
          <ul className="scrollbar-none flex gap-2 overflow-x-auto">
            {AREAS.map((area) => (
              <li key={area} className="shrink-0">
                <FilterChip size="lg" href={`/search?area=${encodeURIComponent(area)}`} icon={<MapPin size={16} aria-hidden="true" />}>
                  {area}
                </FilterChip>
              </li>
            ))}
          </ul>
        </nav>

        <Divider level="strong" />

        {/* §4.4 大人気の店舗(2列グリッド) */}
        <section>
          <SectionHeader title="大人気の店舗" href="/search?sort=popular" />
          <ul className="grid grid-cols-2 gap-3 p-4">
            {SHOPS.slice(0, 4).map((shop) => (
              <li key={shop.id}>
                <ShopGridCard shop={shop} />
              </li>
            ))}
          </ul>
        </section>

        <Divider level="strong" />

        {/* §4.5 本日の出勤セラピスト(横スクロールのコンパクトカード) */}
        <section>
          <SectionHeader title="本日の出勤セラピスト" href="/search?today=1" />
          <ul className="scrollbar-none flex snap-x snap-proximity scroll-px-4 gap-3 overflow-x-auto p-4">
            {workingTherapists.map((t) => (
              <li key={t.id} className="shrink-0 snap-start">
                <TherapistCompactCard therapist={t} shopName={getShop(t.shopId)?.name ?? ''} />
              </li>
            ))}
          </ul>
        </section>

        <Divider level="strong" />

        <section>
          <SectionHeader title="月間人気ランキング" />
          <RankingTabs shops={byPopularity(SHOPS)} limit={3} />
          <div className="p-4">
            <ButtonLink href="/ranking" size="md" chevron>
              ランキングの続きを見る
            </ButtonLink>
          </div>
        </section>
      </main>
    </>
  );
}
