/* designsystem.md §6.6 をベースにした共通の型。API 接続後もここを正とする */

export type Tag = { label: string; brand?: boolean };

export type TherapistStatus = 'available' | 'working' | 'full' | 'off';

/** 一覧・カード・ランキングで使う店舗の要約 */
export type ShopSummary = {
  id: string;
  name: string;
  image: string;
  area: string;
  station: string;
  walkMin: number;
  minMinutes: number;
  minPrice: number;
  tags: Tag[];
  likes: number;
  favorites: number;
  isOpen: boolean;
  hasCoupon?: boolean;
  /** 広告枠(「PR」ラベルを出す / §12) */
  isPR?: boolean;
  /** サムネイル下端のオーバーレイラベル */
  label?: string;
  /** 特典テキスト(promo 色で強調) */
  promo?: string;
  /** 一言説明。無ければ最低料金を表示する */
  catchCopy?: string;
};

export type Therapist = {
  id: string;
  name: string;
  shopId: string;
  image: string;
  status: TherapistStatus;
  /** status が available のときの直近の空き枠(例: 17:30) */
  nextSlot?: string;
  reviewCount: number;
  isNew?: boolean;
  hasCoupon?: boolean;
};

export type Course = {
  id: string;
  name: string;
  minutes: number;
  price: number;
  discountedPrice?: number;
};

export type Review = {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
};

export type Coupon = { id: string; title: string; condition: string };

export type ShopDetail = ShopSummary & {
  heroImages: { src: string; alt: string }[];
  address: string;
  operator?: string;
  hours: { open: string; close: string; note?: string };
  closedDays: string;
  tel: string;
  webReservationUrl?: string;
  notice: string;
  therapists: Therapist[];
  courses: Course[];
  reviews: { average: number; totalCount: number; items: Review[] };
  coupons: Coupon[];
  /** 届出情報(§12)。未確認の場合は「未確認」と明示する */
  registrationInfo: string;
};

export type ScheduleDay = {
  /** 表示用(例: 9/21(月)) */
  label: string;
  status: 'working' | 'off' | 'undecided';
  timeSlot?: string;
  isToday?: boolean;
};

export type TherapistDetail = Therapist & {
  shopName: string;
  tel: string;
  images: { src: string; alt: string }[];
  todayHours?: string;
  /** 表示用に整形済み(例: T162 / B85(D) / W58 / H86) */
  specs?: string;
  nominations: number;
  likes: number;
  favorites: number;
  introText: string;
  shopComment?: string;
  tags: Tag[];
  schedule: ScheduleDay[];
  reviews: Review[];
};
