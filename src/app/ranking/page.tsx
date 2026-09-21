import type { Metadata } from 'next';
import { AppBar } from '@/components/AppBar';
import { RankingTabs } from '@/components/RankingTabs';
import { SHOPS } from '@/lib/mock';
import { byPopularity } from '@/lib/utils';

export const metadata: Metadata = { title: 'ランキング' };

export default function RankingPage() {
  return (
    <>
      <AppBar title="ランキング" />
      <main>
        <p className="px-4 py-3 text-body text-esthe-caption">人気指標をもとにしたランキングです。</p>
        <RankingTabs shops={byPopularity(SHOPS)} limit={10} />
      </main>
    </>
  );
}
