import type { ShopSummary, Therapist, TherapistStatus } from './types';

export const formatNumber = (n: number) => n.toLocaleString('ja-JP');

export const formatYen = (n: number) => `¥${formatNumber(n)}`;

/** カードの説明文: 「渋谷 / 90分 12,000円〜」(一言説明があればそちらを優先) */
export const shopLine = (shop: ShopSummary) =>
  `${shop.area} / ${shop.catchCopy ?? `${shop.minMinutes}分 ${formatNumber(shop.minPrice)}円〜`}`;

/** いいね数の多い順(ランキング) */
export const byPopularity = (shops: ShopSummary[]) => [...shops].sort((a, b) => b.likes - a.likes);

/** §6.3 #7 の並び順: 空きあり > 出勤中 > 満席 > 休み。同順位は新人を先に */
const STATUS_ORDER: Record<TherapistStatus, number> = { available: 0, working: 1, full: 2, off: 3 };

export const sortTherapists = (list: Therapist[]) =>
  [...list].sort(
    (a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status] || Number(!!b.isNew) - Number(!!a.isNew),
  );

/** 「おすすめ」行に出す、出勤状況の一言 */
export const therapistNote = (t: Therapist) => {
  switch (t.status) {
    case 'available':
      return t.nextSlot ? `${t.nextSlot}〜空きあり` : '空きあり';
    case 'working':
      return '本日出勤中';
    case 'full':
      return '本日満席';
    default:
      return '本日休み';
  }
};
