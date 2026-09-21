/* ==========================================================================
 * モックデータ(API接続までの仮置き)
 * 各ページに散らばっていた仮データをここに集約。API 接続時はこのファイルを差し替える。
 * ========================================================================== */
import type {
  Coupon,
  Course,
  Review,
  ScheduleDay,
  ShopDetail,
  ShopSummary,
  Therapist,
  TherapistDetail,
} from './types';

/** 画像が用意できるまでのプレースホルダー(SVG の data URI) */
function placeholderImage(w: number, h: number, bg: string, label: string, fg = '#FFFFFF'): string {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">` +
    `<rect width="100%" height="100%" fill="${bg}"/>` +
    `<text x="50%" y="50%" fill="${fg}" font-size="${Math.round(w / 14)}" font-family="sans-serif" ` +
    `text-anchor="middle" dominant-baseline="middle">${label}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const shopImage = (label: string, bg: string) => placeholderImage(640, 360, bg, label);
const therapistImage = (label: string) => placeholderImage(300, 400, '#E0E0E0', label, '#333333');

/* --------------------------------------------------------------------------
 * エリア(TOP のチップと検索の絞り込みで共通)
 * -------------------------------------------------------------------------- */
export const AREAS = ['渋谷・恵比寿・代官山', '新宿・歌舞伎町', '池袋', '品川・五反田', '銀座・新橋', '六本木・赤坂', '横浜'];

/* --------------------------------------------------------------------------
 * 店舗
 * -------------------------------------------------------------------------- */
export const SHOPS: ShopSummary[] = [
  {
    id: 'precious-shibuya',
    name: 'アロマサロン プレシャス渋谷店',
    image: shopImage('precious-shibuya', '#1B2F8F'),
    area: '渋谷',
    station: '渋谷駅',
    walkMin: 3,
    minMinutes: 60,
    minPrice: 10000,
    tags: [{ label: 'ポータル限定', brand: true }, { label: '完全個室' }, { label: '駅近' }, { label: '深夜営業' }],
    likes: 20527,
    favorites: 9116,
    isOpen: true,
    hasCoupon: true,
    isPR: true,
    promo: '初回3,000円OFF',
  },
  {
    id: 'aroma-shibuya',
    name: 'アロマリラクゼーション 渋谷店',
    image: shopImage('aroma-shibuya', '#2A3F9D'),
    area: '渋谷',
    station: '渋谷駅',
    walkMin: 5,
    minMinutes: 90,
    minPrice: 12000,
    tags: [{ label: 'ポータル限定', brand: true }, { label: '完全個室' }],
    likes: 16800,
    favorites: 7200,
    isOpen: true,
    hasCoupon: true,
    label: 'ポータル限定特典あり',
    promo: 'ポータル限定特典あり',
  },
  {
    id: 'spa-shinjuku',
    name: 'メンズスパ 新宿',
    image: shopImage('spa-shinjuku', '#3A4FAD'),
    area: '新宿',
    station: '新宿駅',
    walkMin: 5,
    minMinutes: 60,
    minPrice: 9000,
    tags: [{ label: '新店', brand: true }, { label: '深夜営業' }],
    likes: 14200,
    favorites: 6830,
    isOpen: true,
    hasCoupon: true,
    label: '本日空きあり',
  },
  {
    id: 'ebisu-aroma',
    name: '極上アロマ 恵比寿本店',
    image: shopImage('ebisu-aroma', '#4A5FBD'),
    area: '恵比寿',
    station: '恵比寿駅',
    walkMin: 4,
    minMinutes: 90,
    minPrice: 14000,
    tags: [{ label: '完全個室' }],
    likes: 11050,
    favorites: 5320,
    isOpen: true,
    catchCopy: '完全個室プライベートサロン',
    promo: '初回限定 2,000円OFF',
  },
  {
    id: 'gotanda-ciel',
    name: 'プレミアムエステ 五反田ル・シエル',
    image: shopImage('gotanda-ciel', '#2A5D9D'),
    area: '五反田',
    station: '五反田駅',
    walkMin: 4,
    minMinutes: 80,
    minPrice: 13000,
    tags: [{ label: 'ポータル限定', brand: true }, { label: '新人多数' }],
    likes: 9800,
    favorites: 4700,
    isOpen: true,
    hasCoupon: true,
    promo: '新人多数在籍',
  },
  {
    id: 'premium-ikebukuro',
    name: 'プレミアムサロン 池袋',
    image: shopImage('premium-ikebukuro', '#3A6DAD'),
    area: '池袋',
    station: '池袋駅',
    walkMin: 2,
    minMinutes: 120,
    minPrice: 18000,
    tags: [{ label: '完全個室' }, { label: 'カード決済可' }, { label: 'シャワー完備' }],
    likes: 8940,
    favorites: 4210,
    isOpen: false,
  },
  {
    id: 'roppongi-spa',
    name: '高級メンズスパ 六本木',
    image: shopImage('roppongi-spa', '#4A7DBD'),
    area: '六本木',
    station: '六本木駅',
    walkMin: 3,
    minMinutes: 90,
    minPrice: 16000,
    tags: [{ label: 'カード決済可' }],
    likes: 7600,
    favorites: 3900,
    isOpen: true,
    catchCopy: 'アロマオイルセラピー',
    promo: 'ポイント5倍キャンペーン中',
  },
  {
    id: 'healing-ginza',
    name: 'ヒーリングラグジュアリー',
    image: shopImage('healing-ginza', '#12206A'),
    area: '銀座',
    station: '銀座駅',
    walkMin: 4,
    minMinutes: 90,
    minPrice: 15000,
    tags: [{ label: '駅近' }],
    likes: 5400,
    favorites: 2600,
    isOpen: true,
  },
  {
    id: 'asakusa-healing',
    name: '和風ヒーリング 浅草',
    image: shopImage('asakusa-healing', '#2E9E5B'),
    area: '浅草',
    station: '浅草駅',
    walkMin: 6,
    minMinutes: 60,
    minPrice: 9500,
    tags: [{ label: '新店', brand: true }],
    likes: 3200,
    favorites: 1500,
    isOpen: true,
    catchCopy: '落ち着いた和風空間',
    promo: '指名料無料特典',
  },
];

export const getShop = (id: string) => SHOPS.find((s) => s.id === id);

/* --------------------------------------------------------------------------
 * セラピスト
 * -------------------------------------------------------------------------- */
export const THERAPISTS: Therapist[] = [
  { id: 'alice', name: 'アリス', shopId: 'precious-shibuya', image: therapistImage('Alice'), status: 'working', reviewCount: 194, isNew: true },
  { id: 'nanami', name: 'ナナミ', shopId: 'precious-shibuya', image: therapistImage('Nanami'), status: 'working', reviewCount: 82, hasCoupon: true },
  { id: 'rin', name: 'リン', shopId: 'precious-shibuya', image: therapistImage('Rin'), status: 'available', nextSlot: '17:30', reviewCount: 45 },
  { id: 'miho', name: 'ミホ', shopId: 'precious-shibuya', image: therapistImage('Miho'), status: 'off', reviewCount: 110 },
  { id: 'airi', name: 'あいり', shopId: 'aroma-shibuya', image: therapistImage('Airi'), status: 'available', nextSlot: '17:30', reviewCount: 60 },
  { id: 'mio', name: 'みお', shopId: 'spa-shinjuku', image: therapistImage('Mio'), status: 'working', reviewCount: 33 },
];

/* --------------------------------------------------------------------------
 * 店舗詳細 / セラピスト詳細(全店舗・全セラピスト共通の仮データを組み合わせる)
 * -------------------------------------------------------------------------- */
const COURSES: Course[] = [
  { id: 'c1', name: 'スタンダードアロマ', minutes: 60, price: 13000, discountedPrice: 10000 },
  { id: 'c2', name: 'ディープリラクゼーション', minutes: 90, price: 16000 },
  { id: 'c3', name: 'プレミアムラグジュアリー', minutes: 120, price: 22000 },
];

const COUPONS: Coupon[] = [
  { id: 'cp1', title: '初回限定 3,000円OFF', condition: '60分以上のコースが対象・初めてのご利用の方' },
  { id: 'cp2', title: 'ポータル見た!で指名料無料', condition: '予約時に「ポータルを見た」とお伝えください' },
];

const REVIEWS: Review[] = [
  { id: 'r1', userName: 'ゲストさん', rating: 5, date: '2026/09/18', comment: 'とても丁寧な施術でリラックスできました。また利用したいです！' },
  { id: 'r2', userName: 'たかさん', rating: 4, date: '2026/09/15', comment: '部屋が清潔で居心地が良かったです。駅からも近くて便利。' },
  { id: 'r3', userName: 'K.Mさん', rating: 5, date: '2026/09/10', comment: 'カウンセリングがしっかりしていて安心できました。' },
];

export function getShopDetail(id: string): ShopDetail | null {
  const shop = getShop(id);
  if (!shop) return null;

  return {
    ...shop,
    heroImages: [
      { src: shop.image, alt: `${shop.name} 内観` },
      { src: shopImage(`${shop.id} / room`, '#12206A'), alt: `${shop.name} 完全個室の施術ルーム` },
    ],
    address: `東京都${shop.area}(ダミー)`,
    operator: 'プレシャスグループ',
    hours: { open: '12:00', close: '翌5:00', note: '最終受付 翌3:30' },
    closedDays: '年中無休',
    tel: '03-1234-5678',
    notice: '本日 12:00〜翌5:00 営業中 ／ 出勤情報を14:30に更新',
    therapists: THERAPISTS.filter((t) => t.shopId === shop.id),
    courses: COURSES,
    reviews: { average: 4.8, totalCount: 128, items: REVIEWS },
    coupons: shop.hasCoupon ? COUPONS : [],
    registrationInfo: '届出状況: 確認済み(ダミーデータ)',
  };
}

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];

/** 今日から7日分の出勤予定(日本時間) */
function weekSchedule(): ScheduleDay[] {
  const pattern: Pick<ScheduleDay, 'status' | 'timeSlot'>[] = [
    { status: 'working', timeSlot: '13:00~21:00' },
    { status: 'working', timeSlot: '14:00~22:00' },
    { status: 'off' },
    { status: 'working', timeSlot: '12:00~20:00' },
    { status: 'off' },
    { status: 'working', timeSlot: '15:00~23:00' },
    { status: 'undecided' },
  ];
  const jstNow = Date.now() + 9 * 60 * 60 * 1000;
  return pattern.map((p, i) => {
    const d = new Date(jstNow + i * 24 * 60 * 60 * 1000);
    return {
      ...p,
      label: `${d.getUTCMonth() + 1}/${d.getUTCDate()}(${WEEKDAYS[d.getUTCDay()]})`,
      isToday: i === 0,
    };
  });
}

export function getTherapistDetail(id: string): TherapistDetail | null {
  const therapist = THERAPISTS.find((t) => t.id === id);
  const shop = therapist && getShop(therapist.shopId);
  if (!therapist || !shop) return null;

  return {
    ...therapist,
    shopName: shop.name,
    tel: '03-1234-5678',
    images: [
      { src: placeholderImage(600, 800, '#E0E0E0', `${therapist.id} / 1`, '#333333'), alt: `${therapist.name} メイン写真` },
      { src: placeholderImage(600, 800, '#C8CCD8', `${therapist.id} / 2`, '#333333'), alt: `${therapist.name} サブ写真` },
    ],
    todayHours: therapist.status === 'off' ? undefined : '13:00〜21:00',
    specs: 'T162 / B85(D) / W58 / H86',
    nominations: 342,
    likes: 1250,
    favorites: 480,
    introText: `初めまして、${therapist.name}です！心を込めた丁寧な施術で、日頃の疲れやストレスをしっかりほぐします。まったりした空間で一緒に癒やされましょう。お待ちしております♪`,
    // 「No.1」などは根拠の明示がない限り使わない(designsystem §9)
    shopComment: '技術力と細やかな心配りで、リピートのお客様が多い人気セラピストです。初心者の方も安心してご指名ください。',
    tags: [{ label: 'ポータル限定', brand: true }, { label: '癒やし系' }, { label: '施術重視' }, { label: '接客定評' }],
    schedule: weekSchedule(),
    reviews: REVIEWS.slice(0, 2),
  };
}
