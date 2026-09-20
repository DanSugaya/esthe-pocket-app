'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode, UIEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

/* ============================================================================
 * 1. 型定義 (designsystem.md §6.6)
 * ============================================================================ */
type TherapistStatus = 'available' | 'working' | 'full' | 'off';

type Therapist = {
  id: string;
  name: string;
  image: string;
  reviewCount: number;
  isNew?: boolean;
  hasCoupon?: boolean;
  status: TherapistStatus;
  nextSlot?: string;
};

type Course = {
  id: string;
  name: string;
  minutes: number;
  price: number;
  discountedPrice?: number;
  note?: string;
};

type Review = {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
};

type RecommendedShop = {
  id: string;
  name: string;
  image: string;
  promoText?: string;
};

type ShopDetail = {
  id: string;
  name: string;
  heroImages: { src: string; alt: string }[];
  area: string;
  address: string;
  nearestStation: { name: string; walkMin: number };
  operator?: string;
  hours: { open: string; close: string; note?: string };
  closedDays: string;
  tel: string;
  webReservationUrl?: string;
  tags: { label: string; brand?: boolean }[];
  stats: { likes: number; favorites: number };
  notices: { updatedAt: string; message: string };
  therapists: Therapist[];
  courses: Course[];
  reviews: {
    average: number;
    totalCount: number;
    items: Review[];
  };
  recommendations: RecommendedShop[];
  sameAreaShops: RecommendedShop[];
  legal: { registrationInfo: string };
};

/* ============================================================================
 * 2. モックデータ
 * ============================================================================ */
function placeholder(w: number, h: number, bg: string, label: string, fg = '#FFFFFF'): string {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">` +
    `<rect width="100%" height="100%" fill="${bg}"/>` +
    `<text x="50%" y="50%" fill="${fg}" font-size="${Math.round(w / 14)}" font-family="sans-serif" ` +
    `text-anchor="middle" dominant-baseline="middle">${label}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const MOCK_SHOP: ShopDetail = {
  id: 'precious-shibuya',
  name: 'アロマサロン プレシャス渋谷店',
  heroImages: [
    { src: placeholder(640, 360, '#1B2F8F', 'Precious Shibuya - Main'), alt: 'プレシャス渋谷店 内観' },
    { src: placeholder(640, 360, '#12206A', 'Precious Shibuya - Room'), alt: '完全個室の施術ルーム' },
  ],
  area: '渋谷',
  address: '東京都渋谷区道玄坂1-XX-XX(ダミー)',
  nearestStation: { name: '渋谷駅', walkMin: 3 },
  operator: 'プレシャスグループ',
  hours: { open: '12:00', close: '翌5:00', note: '最終受付 翌3:30' },
  closedDays: '年中無休',
  tel: '03-1234-5678',
  tags: [
    { label: 'ポータル限定', brand: true },
    { label: '完全個室' },
    { label: '駅近' },
    { label: '深夜営業' },
  ],
  stats: { likes: 20527, favorites: 9116 },
  notices: {
    updatedAt: '14:30',
    message: '本日 12:00〜翌5:00 営業中 ／ 出勤情報を14:30に更新',
  },
  therapists: [
    { id: '1', name: 'アリス', image: placeholder(150, 200, '#E0E0E0', 'Alice', '#333333'), reviewCount: 194, isNew: true, status: 'working' },
    { id: '2', name: 'ナナミ', image: placeholder(150, 200, '#E0E0E0', 'Nanami', '#333333'), reviewCount: 82, hasCoupon: true, status: 'working' },
    { id: '3', name: 'リン', image: placeholder(150, 200, '#E0E0E0', 'Rin', '#333333'), reviewCount: 45, status: 'available', nextSlot: '17:30' },
    { id: '4', name: 'ミホ', image: placeholder(150, 200, '#E0E0E0', 'Miho', '#333333'), reviewCount: 110, status: 'off' },
  ],
  courses: [
    { id: 'c1', name: 'スタンダードアロマ', minutes: 60, price: 13000, discountedPrice: 10000 },
    { id: 'c2', name: 'ディープリラクゼーション', minutes: 90, price: 16000 },
    { id: 'c3', name: 'プレミアムラグジュアリー', minutes: 120, price: 22000 },
  ],
  reviews: {
    average: 4.8,
    totalCount: 128,
    items: [
      { id: 'r1', userName: 'ゲストさん', rating: 5, date: '2026/09/18', comment: 'とても丁寧な施術でリラックスできました。また利用したいです！' },
      { id: 'r2', userName: 'たかさん', rating: 4, date: '2026/09/15', comment: '部屋が清潔で居心地が良かったです。駅からも近くて便利。' },
      { id: 'r3', userName: 'K.Mさん', rating: 5, date: '2026/09/10', comment: 'カウンセリングがしっかりしていて安心できました。' },
    ],
  },
  recommendations: [
    { id: 'rec1', name: 'リラクゼーション 恵比寿', image: placeholder(200, 200, '#2A3F9D', 'Rec 1'), promoText: '初回3,000円OFF' },
    { id: 'rec2', name: 'アロママリン 新宿店', image: placeholder(200, 200, '#3A4FAD', 'Rec 2'), promoText: '極上個室スパ' },
    { id: 'rec3', name: 'スパ プレシャス六本木', image: placeholder(200, 200, '#4A5FBD', 'Rec 3'), promoText: '深夜営業中' },
  ],
  sameAreaShops: [
    { id: 'sa1', name: '渋谷スパ ラグゼ', image: placeholder(200, 200, '#2A5D9D', 'Area 1'), promoText: '渋谷駅徒歩1分' },
    { id: 'sa2', name: 'ヒーリングサロン 道玄坂', image: placeholder(200, 200, '#3A6DAD', 'Area 2'), promoText: '新人セラピスト多数' },
    { id: 'sa3', name: 'アロマアベニュー 渋谷', image: placeholder(200, 200, '#4A7DBD', 'Area 3'), promoText: '全員有資格者' },
  ],
  legal: { registrationInfo: '届出状況: 確認済み(ダミーデータ)' },
};

/* ============================================================================
 * 3. アイコン (インラインSVG / Lucide互換)
 * ============================================================================ */
const ICON_PATHS = {
  back: <path d="m15 18-6-6 6-6" />,
  next: <path d="m9 18 6-6-6-6" />,
  share: (
    <>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
      <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
    </>
  ),
  like: (
    <>
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
    </>
  ),
  star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  comment: <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />,
  gift: (
    <>
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
    </>
  ),
  home: (
    <>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  crown: <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />,
  user: (
    <>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  arrowUp: <polyline points="18 15 12 9 6 15" />,
};

type IconName = keyof typeof ICON_PATHS;

function Icon({
  name,
  className = 'w-6 h-6',
  filled = false,
}: {
  name: IconName;
  className?: string;
  filled?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

/* ============================================================================
 * 4. フック (IntersectionObserver)
 * ============================================================================ */
function useScrolledPast<T extends HTMLElement>(topOffset = 56) {
  const ref = useRef<T | null>(null);
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setPassed(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { rootMargin: `-${topOffset}px 0px 0px 0px` },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [topOffset]);

  return [ref, passed] as const;
}

/* ============================================================================
 * 5. サブコンポーネント (designsystem.md §4)
 * ============================================================================ */

// 4.13 Detail App Bar
function DetailAppBar({ shopName, solid }: { shopName: string; solid: boolean }) {
  const router = useRouter();
  const [toast, setToast] = useState<string | null>(null);

  const handleBack = () => {
    if (window.history.length > 1) router.back();
    else router.push('/');
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (typeof navigator.share === 'function') {
        await navigator.share({ title: shopName, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setToast('URLをコピーしました');
      window.setTimeout(() => setToast(null), 2000);
    } catch {
      // シェアキャンセルのエラー無視
    }
  };

  const circle = `w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors duration-150 ${
    solid ? 'bg-transparent' : 'bg-[rgba(0,0,0,0.35)]'
  }`;

  return (
    <>
      <header
        className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[720px] h-[56px] flex items-center justify-between px-4 z-[100] transition-colors duration-150 ${
          solid ? 'bg-[#1B2F8F]' : 'bg-transparent'
        }`}
      >
        <button type="button" onClick={handleBack} className={circle} aria-label="戻る">
          <Icon name="back" />
        </button>
        <div
          aria-hidden={!solid}
          className={`text-white font-bold text-[14px] truncate max-w-[60%] transition-opacity duration-150 ${
            solid ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {shopName}
        </div>
        <button type="button" onClick={handleShare} className={circle} aria-label="シェア">
          <Icon name="share" className="w-5 h-5" />
        </button>
      </header>
      {toast && (
        <div
          role="status"
          className="fixed top-[64px] left-1/2 -translate-x-1/2 z-[110] bg-[rgba(18,32,106,0.9)] text-white text-[12px] px-4 py-2 rounded-full shadow-md"
        >
          {toast}
        </div>
      )}
    </>
  );
}

// 4.8 Hero Carousel
function HeroCarousel({ images }: { images: ShopDetail['heroImages'] }) {
  const [index, setIndex] = useState(0);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (el.clientWidth > 0) setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div className="relative w-full aspect-[16/9] bg-[#333333]">
      <div
        onScroll={handleScroll}
        className="flex h-full overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((img, i) => (
          <div key={img.src} className="relative min-w-full h-full snap-center">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 720px) 100vw, 720px"
              className="object-cover"
              priority={i === 0}
              unoptimized
            />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-[6px] pointer-events-none">
          {images.map((img, i) => (
            <span
              key={img.src}
              className={`w-2 h-2 rounded-full ${i === index ? 'bg-white' : 'bg-white/50'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// 4.19 Status Circle
function StatusCircle({ status, nextSlot }: { status: TherapistStatus; nextSlot?: string }) {
  const base =
    'w-[52px] h-[52px] rounded-full text-white text-[11px] font-bold flex flex-col items-center justify-center shrink-0 leading-tight';
  switch (status) {
    case 'available':
      return (
        <div className={`${base} bg-[#2E9E5B]`}>
          <span>空き</span>
          {nextSlot && <span className="text-[9px] font-normal">{nextSlot}</span>}
        </div>
      );
    case 'working':
      return <div className={`${base} bg-[#1B2F8F]`}>出勤中</div>;
    case 'full':
      return <div className={`${base} bg-[#BDBDBD]`}>満席</div>;
    case 'off':
    default:
      return <div className={`${base} bg-[#BDBDBD]`}>休み</div>;
  }
}

// 4.18 List Row (セラピスト行)
function TherapistRow({ therapist }: { therapist: Therapist }) {
  return (
    <div className="flex items-center h-[104px] py-2 border-b border-[#E0E0E0] gap-3 px-2">
      <div className="relative w-[72px] aspect-[3/4] rounded-[4px] overflow-hidden border border-[#E0E0E0] shrink-0">
        <Image
          src={therapist.image}
          alt={therapist.name}
          fill
          sizes="72px"
          className="object-cover"
          unoptimized
        />
        {therapist.isNew && (
          <span className="absolute top-0 left-0 bg-[#D93025] text-white text-[10px] font-bold px-[6px] py-[2px] rounded-br-[4px]">
            UP
          </span>
        )}
        {therapist.hasCoupon && (
          <div className="absolute bottom-0 w-full h-5 bg-[#FFE234] text-[#222222] text-[11px] font-bold flex items-center justify-center">
            クーポンあり
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[14px] font-bold truncate">{therapist.name}</div>
        <div className="flex items-center gap-1 text-[#888888] text-[14px] font-bold mt-3">
          <Icon name="comment" className="w-4 h-4" filled />
          <span className="tabular-nums">{therapist.reviewCount}</span>
        </div>
      </div>
      <StatusCircle status={therapist.status} nextSlot={therapist.nextSlot} />
    </div>
  );
}

// 4.20 Sticky CTA Bar
function StickyCtaBar({
  tel,
  faved,
  onToggleFav,
}: {
  tel: string;
  faved: boolean;
  onToggleFav: () => void;
}) {
  return (
    <div
      className="fixed left-1/2 -translate-x-1/2 w-full max-w-[720px] h-[56px] bg-white border-t border-[#E0E0E0] flex items-center px-4 gap-2 z-[90]"
      style={{ bottom: 'calc(64px + env(safe-area-inset-bottom))' }}
    >
      <button
        type="button"
        onClick={onToggleFav}
        aria-pressed={faved}
        className="w-11 h-11 flex items-center justify-center text-[#F5A623]"
        aria-label="お気に入り"
      >
        <Icon name="star" className="w-6 h-6" filled={faved} />
      </button>
      <a
        href={`tel:${tel}`}
        className="flex-1 h-11 bg-[#1B2F8F] text-white font-bold text-[15px] rounded-lg flex items-center justify-center gap-2"
      >
        <Icon name="phone" className="w-5 h-5" />
        電話で予約する
      </a>
    </div>
  );
}

// 4.9 Outline Large
function OutlineButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="relative w-full h-[52px] bg-white border-2 border-[#1B2F8F] text-[#1B2F8F] font-bold text-[16px] rounded-lg flex items-center justify-center active:opacity-70"
    >
      {children}
      <Icon name="next" className="absolute right-3 w-5 h-5" />
    </button>
  );
}

// 4.21 Recommend Row
function RecommendRow({ title, items }: { title: string; items: RecommendedShop[] }) {
  return (
    <section className="py-4">
      <h2 className="text-[17px] font-bold px-4 mb-3">{title}</h2>
      <div className="flex overflow-x-auto gap-[10px] px-4 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <div key={item.id} className="w-[134px] shrink-0 snap-start">
            <div className="relative w-[134px] h-[134px] rounded-[12px] overflow-hidden border border-[#E0E0E0]">
              <Image src={item.image} alt={item.name} fill sizes="134px" className="object-cover" unoptimized />
            </div>
            <div className="text-[14px] font-bold mt-2 truncate">{item.name}</div>
            {item.promoText && (
              <div className="text-[12px] font-bold text-[#E0407F] truncate mt-0.5">{item.promoText}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

const STATUS_RANK: Record<TherapistStatus, number> = { available: 0, working: 1, full: 2, off: 3 };

const TABS: { href: string; label: string; icon: IconName }[] = [
  { href: '/', label: 'TOP', icon: 'home' },
  { href: '/search', label: '店舗を探す', icon: 'search' },
  { href: '/ranking', label: 'ランキング', icon: 'crown' },
  { href: '/favorites', label: 'お気に入り', icon: 'star' },
  { href: '/mypage', label: 'マイページ', icon: 'user' },
];

const formatYen = (n: number) => `¥${n.toLocaleString('ja-JP')}`;

/* ============================================================================
 * 6. メインページ (店舗詳細)
 * ============================================================================ */
export default function ShopDetailPage() {
  const shop = MOCK_SHOP;

  const [heroRef, heroPassed] = useScrolledPast<HTMLDivElement>(56);
  const [ctaRef, ctaPassed] = useScrolledPast<HTMLAnchorElement>(56);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [liked, setLiked] = useState(false);
  const [faved, setFaved] = useState(false);
  const likes = shop.stats.likes + (liked ? 1 : 0);
  const favorites = shop.stats.favorites + (faved ? 1 : 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setShowScrollTop(true);
      else setShowScrollTop(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sortedTherapists = [...shop.therapists].sort(
    (a, b) => STATUS_RANK[a.status] - STATUS_RANK[b.status] || Number(!!b.isNew) - Number(!!a.isNew),
  );
  const workingCount = shop.therapists.filter((t) => t.status !== 'off').length;

  const fabBottom = ctaPassed
    ? 'calc(64px + 56px + 16px + env(safe-area-inset-bottom))'
    : 'calc(64px + 16px + env(safe-area-inset-bottom))';

  return (
    <div className="max-w-[720px] mx-auto bg-white min-h-screen relative pb-[140px] text-[#222222] font-sans text-[13px]">
      {/* 4.13 App Bar */}
      <DetailAppBar shopName={shop.name} solid={heroPassed} />

      {/* 6.3 #1 ヒーロー */}
      <div ref={heroRef} className="w-full">
        <HeroCarousel images={shop.heroImages} />
      </div>

      {/* 4.14 Notice Strip */}
      <a
        href="#therapists"
        className="h-[40px] px-4 flex items-center justify-between border-b border-[#E0E0E0] bg-white"
      >
        <span className="flex items-center gap-2 min-w-0">
          <span className="bg-[#E0407F] text-white text-[11px] font-bold px-[10px] py-[4px] rounded-full whitespace-nowrap">
            更新
          </span>
          <span className="text-[13px] truncate">{shop.notices.message}</span>
        </span>
        <Icon name="next" className="w-5 h-5 text-[#888888] shrink-0" />
      </a>

      <div className="p-4">
        {/* 6.3 #3 主CTA */}
        <a
          ref={ctaRef}
          href={`tel:${shop.tel}`}
          className="w-full h-[52px] bg-[#1B2F8F] text-white font-bold text-[16px] rounded-lg flex items-center justify-center gap-2 active:opacity-70"
        >
          <Icon name="phone" className="w-5 h-5" />
          電話で予約する
        </a>
        {shop.webReservationUrl && (
          <a
            href={shop.webReservationUrl}
            className="mt-2 w-full h-[52px] border-2 border-[#1B2F8F] text-[#1B2F8F] font-bold text-[16px] rounded-lg flex items-center justify-center"
          >
            Web予約
          </a>
        )}

        {/* 4.15 Stat & Action Row */}
        <div className="flex justify-between items-start mt-4">
          <div>
            <div className="flex items-center gap-4 font-bold text-[18px] tabular-nums" aria-live="polite">
              <span className="flex items-center gap-1 text-[#D93025]">
                <Icon name="like" className="w-5 h-5" filled />
                {likes.toLocaleString('ja-JP')}
              </span>
              <span className="flex items-center gap-1 text-[#F5A623]">
                <Icon name="star" className="w-5 h-5" filled />
                {favorites.toLocaleString('ja-JP')}
              </span>
            </div>
            <div className="text-[13px] text-[#666666] mt-2 leading-relaxed">
              営業時間:{shop.hours.open}〜{shop.hours.close}
              <br />
              定休日:{shop.closedDays}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setLiked((v) => !v)}
              aria-pressed={liked}
              aria-label="おすすめ"
              className="w-[54px] h-[54px] rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.15)] flex items-center justify-center text-[#D93025] transition-transform active:scale-110"
            >
              <Icon name="like" className="w-[26px] h-[26px]" filled={liked} />
            </button>
            <button
              type="button"
              onClick={() => setFaved((v) => !v)}
              aria-pressed={faved}
              aria-label="お気に入り"
              className="w-[54px] h-[54px] rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.15)] flex items-center justify-center text-[#F5A623] transition-transform active:scale-110"
            >
              <Icon name="star" className="w-[26px] h-[26px]" filled={faved} />
            </button>
          </div>
        </div>

        {/* 4.16 Title Block */}
        <div className="mt-4">
          <h1 className="text-[20px] font-bold text-[#1B2F8F] leading-snug">{shop.name}</h1>
          <p className="text-[14px] font-bold mt-2">
            {shop.area} ／ {shop.nearestStation.name} 徒歩{shop.nearestStation.walkMin}分
            {shop.operator && ` ／ 運営:${shop.operator}`}
          </p>
          <a href="#info-section" className="text-[14px] text-[#666666] inline-flex items-center mt-1">
            店舗詳細情報
            <Icon name="next" className="w-4 h-4" />
          </a>
        </div>

        {/* 4.17 Outline Chips */}
        <div className="flex flex-wrap gap-2 mt-3">
          {shop.tags.map((tag) => (
            <span
              key={tag.label}
              className={`px-[14px] py-[6px] rounded-lg text-[14px] leading-tight border-2 ${
                tag.brand
                  ? 'border-[#1B2F8F] text-[#1B2F8F] font-bold'
                  : 'border-[#888888] text-[#666666]'
              }`}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>

      {/* 強区切り (4px 太線) */}
      <div className="h-1 bg-[#1B2F8F]" />

      {/* 6.3 #7 セラピスト一覧 */}
      <section id="therapists" className="scroll-mt-[64px]">
        <div className="flex items-baseline px-4 pt-4 pb-2 border-b border-[#E0E0E0]">
          <h2 className="text-[17px] font-bold">セラピスト全{shop.therapists.length}名</h2>
          <span className="text-[13px] text-[#666666] ml-2">本日出勤{workingCount}名</span>
        </div>

        <div>
          {sortedTherapists.slice(0, 4).map((t) => (
            <TherapistRow key={t.id} therapist={t} />
          ))}
        </div>

        <div className="px-4 py-3">
          <OutlineButton>全{shop.therapists.length}名を表示する</OutlineButton>
        </div>
      </section>

      {/* 中区切り (2px グレー) */}
      <div className="border-b-2 border-[#DADADA]" />

      {/* 4.24 Price Table */}
      <section className="p-4" id="price-section">
        <h2 className="text-[17px] font-bold mb-2">料金・コース</h2>
        <table className="w-full border-collapse">
          <caption className="sr-only">コース料金一覧</caption>
          <tbody>
            {shop.courses.map((course) => (
              <tr key={course.id} className="border-b border-[#E0E0E0]">
                <th scope="row" className="py-3 text-left font-normal align-top">
                  <div className="text-[14px] font-bold">{course.name}</div>
                  <div className="text-[12px] text-[#666666]">{course.minutes}分</div>
                </th>
                <td className="py-3 text-right text-[14px] font-bold align-top tabular-nums">
                  {course.discountedPrice ? (
                    <>
                      <span className="line-through text-[#888888] text-[11px] mr-1 font-normal">
                        {formatYen(course.price)}
                      </span>
                      <span className="text-[#E0407F]">{formatYen(course.discountedPrice)}</span>
                    </>
                  ) : (
                    formatYen(course.price)
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-[11px] text-[#666666] mt-2">
          ※表示価格はすべて税込です。本指名料は別途かかります。
        </p>
      </section>

      {/* 中区切り */}
      <div className="border-b-2 border-[#DADADA]" />

      {/* 6.3 #9 口コミ */}
      <section className="p-4" id="review-section">
        <div className="flex justify-between items-baseline mb-3">
          <h2 className="text-[17px] font-bold">口コミ</h2>
          <div className="flex items-center gap-1 font-bold text-[14px]">
            <Icon name="star" className="w-4 h-4 text-[#F5A623]" filled />
            <span>{shop.reviews.average}</span>
            <span className="text-[#666666] font-normal text-[12px]">({shop.reviews.totalCount}件)</span>
          </div>
        </div>
        <div className="space-y-3">
          {shop.reviews.items.map((review) => (
            <div key={review.id} className="border-b border-[#E0E0E0] pb-3">
              <div className="flex justify-between items-center text-[12px] text-[#666666]">
                <span className="font-bold text-[#222222]">{review.userName}</span>
                <span>{review.date}</span>
              </div>
              <div className="flex text-[#F5A623] my-1">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="star" className="w-3.5 h-3.5" filled={i < review.rating} />
                ))}
              </div>
              <p className="text-[13px] leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 中区切り */}
      <div className="border-b-2 border-[#DADADA]" />

      {/* 4.23 Info Table */}
      <section className="p-4 scroll-mt-[64px]" id="info-section">
        <h2 className="text-[17px] font-bold mb-2">店舗情報</h2>
        <table className="w-full border-collapse text-[13px]">
          <tbody>
            {[
              { label: '住所', value: <>{shop.address}</> },
              {
                label: 'アクセス',
                value: (
                  <>
                    {shop.nearestStation.name} 徒歩{shop.nearestStation.walkMin}分
                  </>
                ),
              },
              {
                label: '営業時間',
                value: (
                  <>
                    {shop.hours.open}〜{shop.hours.close}
                    {shop.hours.note && `(${shop.hours.note})`}
                  </>
                ),
              },
              { label: '定休日', value: <>{shop.closedDays}</> },
              {
                label: '電話番号',
                value: (
                  <a href={`tel:${shop.tel}`} className="text-[#1B2F8F] font-bold">
                    {shop.tel}
                  </a>
                ),
              },
              { label: '届出情報', value: <>{shop.legal.registrationInfo}</> },
            ].map((row) => (
              <tr key={row.label} className="border-b border-[#E0E0E0]">
                <th scope="row" className="w-[96px] text-left font-normal text-[#666666] py-3 align-top">
                  {row.label}
                </th>
                <td className="py-3">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 中区切り */}
      <div className="border-b-2 border-[#DADADA]" />

      {/* 4.21 Recommend Row (おすすめ) */}
      <RecommendRow title="この店舗を見た人はこちらも" items={shop.recommendations} />

      {/* 中区切り */}
      <div className="border-b-2 border-[#DADADA]" />

      {/* 4.21 Recommend Row (同エリア) */}
      <RecommendRow title="同じエリアの店舗" items={shop.sameAreaShops} />

      {/* 4.11 Footer */}
      <footer className="bg-[#12206A] text-white p-6 mt-6">
        <div className="grid grid-cols-2 gap-2 mb-6">
          <div className="bg-[#F4F4F4] text-[#222222] h-[60px] rounded-xl flex items-center px-3 font-bold">
            公式SNS
          </div>
          <div className="bg-[#F4F4F4] text-[#222222] h-[60px] rounded-xl flex items-center px-3 font-bold">
            ご利用ガイド
          </div>
        </div>
        <p className="text-[11px] text-white/70 leading-relaxed">
          当サイトはメンズエステの情報ポータルサイトです。掲載店舗の届出状況は各店舗ページの「店舗情報」でご確認ください。
          18歳未満の方のご利用はお断りしています。
          <br />
          <br />© 2026 Portal Site Name All Rights Reserved.
        </p>
      </footer>

      {/* トップへ戻る FAB (4.9) */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="トップへ戻る"
          className="fixed left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[rgba(18,32,106,0.85)] text-white shadow-lg flex items-center justify-center z-[85] transition-opacity"
          style={{ bottom: fabBottom }}
        >
          <Icon name="arrowUp" className="w-6 h-6" />
        </button>
      )}

      {/* 4.22 Coupon FAB */}
      <div
        className="fixed left-1/2 -translate-x-1/2 w-full max-w-[720px] h-0 pointer-events-none z-[80]"
        style={{ bottom: fabBottom }}
      >
        <button
          type="button"
          aria-label="利用できるクーポンを見る"
          className="pointer-events-auto absolute right-0 bottom-0 w-[80px] h-[72px] bg-[#FFE234] text-[#222222] rounded-l-full shadow-[0_2px_8px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center font-bold text-[11px] leading-tight"
        >
          <Icon name="gift" className="w-5 h-5" />
          <span>クーポン</span>
          <span>GET!!</span>
        </button>
      </div>

      {/* 4.20 Sticky CTA */}
      {ctaPassed && (
        <StickyCtaBar tel={shop.tel} faved={faved} onToggleFav={() => setFaved((v) => !v)} />
      )}

      {/* 4.2 Bottom Tab Bar */}
      <nav
        aria-label="メインメニュー"
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[720px] bg-white border-t border-[#E0E0E0] flex z-[100]"
        style={{
          height: 'calc(64px + env(safe-area-inset-bottom))',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {TABS.map((tab) => {
          const active = tab.href === '/search';
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? 'page' : undefined}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 text-[11px] ${
                active ? 'text-[#1B2F8F] font-bold' : 'text-[#666666]'
              }`}
            >
              <Icon name={tab.icon} className="w-6 h-6" />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}