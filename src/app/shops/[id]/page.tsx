import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  Share2,
  ThumbsUp,
  Star,
  MessageCircle,
  Gift,
  Coins,
  Phone,
  MapPin,
  ChevronRight,
  ArrowUp,
  Search,
  Home,
  Compass,
  Award,
  User,
} from "lucide-react";

// ----------------------------------------------------------------------
// 型定義 (§6.6 データ項目)
// ----------------------------------------------------------------------
type Shop = {
  id: string;
  name: string;
  heroImages: { src: string; alt: string }[];
  area: string;
  nearestStation: { name: string; walkMin: number };
  operator?: string;
  hours: { open: string; close: string; note?: string };
  closedDays: string;
  tel: string;
  webReservationUrl?: string;
  tags: { label: string; brand?: boolean }[];
  stats: { likes: number; favorites: number };
  therapists: {
    id: string;
    name: string;
    image: string;
    reviewCount: number;
    isNew?: boolean;
    hasCoupon?: boolean;
    status: "available" | "working" | "off" | "full";
    nextSlot?: string;
  }[];
  courses: {
    name: string;
    minutes: number;
    price: number;
    discountedPrice?: number;
    note?: string;
  }[];
  notices: { updatedAt: string; message: string };
  legal: { registrationInfo: string };
  reviews: {
    average: number;
    count: number;
    items: { id: string; user: string; rating: number; date: string; comment: string }[];
  };
  recommendations: { id: string; name: string; image: string; promoText?: string }[];
};

// ----------------------------------------------------------------------
// モックデータ取得 (Server-side)
// ----------------------------------------------------------------------
async function getShopData(id: string): Promise<Shop> {
  return {
    id,
    name: "アロマサロン プレミアム渋谷店",
    heroImages: [
      { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80", alt: "アロマサロン プレミアム渋谷店 内観1" },
      { src: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80", alt: "アロマサロン プレミアム渋谷店 内観2" },
    ],
    area: "渋谷",
    nearestStation: { name: "渋谷駅", walkMin: 3 },
    operator: "プレミアムグループ",
    hours: { open: "12:00", close: "翌5:00", note: "最終受付 翌4:00" },
    closedDays: "年中無休",
    tel: "03-0000-0000",
    webReservationUrl: "https://example.com/reserve",
    tags: [
      { label: "ポータル限定", brand: true },
      { label: "新店", brand: true },
      { label: "完全個室" },
      { label: "駅近" },
      { label: "深夜営業" },
    ],
    stats: { likes: 20527, favorites: 9116 },
    therapists: [
      { id: "t1", name: "美咲 (23)", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80", reviewCount: 194, isNew: true, status: "available", nextSlot: "17:30" },
      { id: "t2", name: "七海 (25)", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80", reviewCount: 88, hasCoupon: true, status: "working" },
      { id: "t3", name: "葵 (21)", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80", reviewCount: 42, status: "off" },
      { id: "t4", name: "凛 (24)", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80", reviewCount: 112, status: "full" },
    ],
    courses: [
      { name: "スタンダードアロマコース", minutes: 60, price: 12000, discountedPrice: 10000, note: "新規限定2,000円OFF" },
      { name: "ディープディープディープリラクゼーション", minutes: 90, price: 17000 },
      { name: "プレミアムラグジュアリーコース", minutes: 120, price: 22000 },
    ],
    notices: { updatedAt: "14:30", message: "本日 12:00〜翌5:00 営業中 ／ 出勤情報を更新" },
    legal: { registrationInfo: "東京都公安委員会 届出済 (第30240000号)" },
    reviews: {
      average: 4.8,
      count: 156,
      items: [
        { id: "r1", user: "ゲスト様", rating: 5, date: "2026/09/18", comment: "部屋の雰囲気が落ち着いていてすごくリラックスできました。施術も丁寧です。" },
        { id: "r2", user: "たか様", rating: 5, date: "2026/09/15", comment: "接客が素晴らしい。また利用させてもらいます。" },
      ],
    },
    recommendations: [
      { id: "s2", name: "リラクゼーション恵比寿", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80", promoText: "初回2,000円引き" },
      { id: "s3", name: "スパ アロマ新宿", image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=400&q=80", promoText: "ポイント2倍" },
      { id: "s4", name: "プレミアム六本木", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=400&q=80" },
    ],
  };
}

// ----------------------------------------------------------------------
// Client Components (対話操作・スクロール制御)
// ----------------------------------------------------------------------
"use client";

function ClientInteractiveUI({ shop }: { shop: Shop }) {
  const [isHeaderScrolled, setIsHeaderScrolled] = React.useState(false);
  const [showStickyCta, setShowStickyCta] = React.useState(false);
  const [showFab, setShowFab] = React.useState(false);

  const [likes, setLikes] = React.useState(shop.stats.likes);
  const [isLiked, setIsLiked] = React.useState(false);
  const [favorites, setFavorites] = React.useState(shop.stats.favorites);
  const [isFavorited, setIsFavorited] = React.useState(false);

  const heroRef = React.useRef<HTMLDivElement>(null);
  const mainCtaRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // 4.13 Detail App Bar スクロール制御
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        setIsHeaderScrolled(!entry.isIntersecting);
      },
      { threshold: 0 }
    );
    if (heroRef.current) heroObserver.observe(heroRef.current);

    // 4.20 Sticky CTA スクロール制御
    const ctaObserver = new IntersectionObserver(
      ([entry]) => {
        setShowStickyCta(!entry.isIntersecting);
      },
      { threshold: 0 }
    );
    if (mainCtaRef.current) ctaObserver.observe(mainCtaRef.current);

    // FABスクロール表示制御
    const handleScroll = () => {
      setShowFab(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      heroObserver.disconnect();
      ctaObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    setFavorites((prev) => (isFavorited ? prev - 1 : prev + 1));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: shop.name, url: window.location.href });
      } catch {
        /* cancel */
      }
    } else {
      alert("URLをコピーしました");
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* 4.13 Detail App Bar (固定ヘッダー) */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 flex h-[56px] max-w-[720px] mx-auto items-center justify-between px-4 transition-colors duration-150 ${
          isHeaderScrolled ? "bg-[var(--color-primary)] text-white shadow-md" : "bg-transparent text-white"
        }`}
      >
        <Link
          href="/"
          className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
            isHeaderScrolled ? "" : "bg-[var(--color-scrim)]"
          }`}
          aria-label="戻る"
        >
          <ChevronLeft className="h-6 w-6" />
        </Link>

        {isHeaderScrolled && (
          <h1 className="truncate px-2 text-[14px] font-bold text-white flex-1 text-center">
            {shop.name}
          </h1>
        )}

        <button
          onClick={handleShare}
          className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
            isHeaderScrolled ? "" : "bg-[var(--color-scrim)]"
          }`}
          aria-label="シェア"
        >
          <Share2 className="h-5 w-5" />
        </button>
      </header>

      {/* ヒーロー監視バウンダリ */}
      <div ref={heroRef} className="relative aspect-[16/9] w-full bg-[var(--color-bg-sub)]">
        <Image
          src={shop.heroImages[0].src}
          alt={shop.heroImages[0].alt}
          fill
          priority
          sizes="(max-width: 720px) 100vw, 720px"
          className="object-cover"
        />
        <div className="absolute bottom-2 right-4 flex space-x-1.5">
          <span className="h-2 w-2 rounded-full bg-white" />
          <span className="h-2 w-2 rounded-full bg-white/50" />
        </div>
      </div>

      {/* 4.14 Notice Strip (お知らせ帯) */}
      <button
        onClick={() => scrollToSection("therapists-section")}
        className="flex h-10 w-full items-center justify-between border-b border-[var(--color-border)] px-4 text-xs bg-white text-left"
      >
        <div className="flex items-center space-x-2 truncate">
          <span className="rounded-full bg-[var(--color-accent-promo)] px-2 py-0.5 text-[11px] font-bold text-white shrink-0">
            更新
          </span>
          <span className="truncate text-[var(--color-text)]">
            {shop.notices.message}
          </span>
        </div>
        <ChevronRight className="h-4 w-4 text-[var(--color-text-sub)] shrink-0 ml-1" />
      </button>

      {/* 主CTA 領域 */}
      <div ref={mainCtaRef} className="p-4 bg-white space-y-2">
        {/* 4.9 Primary Large */}
        <a
          href={`tel:${shop.tel}`}
          className="flex h-[var(--btn-h-lg)] w-full items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary)] font-bold text-white text-[16px] shadow-sm active:opacity-70 transition-opacity"
        >
          電話で予約する
        </a>
        {shop.webReservationUrl && (
          /* 4.9 Outline Large */
          <a
            href={shop.webReservationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[var(--btn-h-lg)] w-full items-center justify-center rounded-[var(--radius-md)] border-2 border-[var(--color-primary)] bg-white font-bold text-[var(--color-primary)] text-[16px] active:opacity-70 transition-opacity"
          >
            Web予約
          </a>
        )}
      </div>

      {/* 4.15 Stat & Action Row (指標とアクション) */}
      <div className="flex items-start justify-between px-4 pb-4 bg-white">
        <div className="space-y-1">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 font-bold text-[18px] text-[var(--color-accent-like)] tabular-nums">
              <ThumbsUp className="h-5 w-5 fill-current" />
              <span>{likes.toLocaleString()}</span>
            </span>
            <span className="flex items-center space-x-1 font-bold text-[18px] text-[var(--color-accent-star)] tabular-nums">
              <Star className="h-5 w-5 fill-current" />
              <span>{favorites.toLocaleString()}</span>
            </span>
          </div>
          <p className="text-xs text-[var(--color-text-sub)]">
            営業時間: {shop.hours.open}〜{shop.hours.close}
          </p>
          <p className="text-xs text-[var(--color-text-sub)]">
            定休日: {shop.closedDays}
          </p>
        </div>

        <div className="flex space-x-2">
          {/* アクション丸ボタン (いいね) */}
          <button
            onClick={handleLike}
            aria-pressed={isLiked}
            aria-label="いいね"
            className={`flex h-[var(--size-action)] w-[var(--size-action)] items-center justify-center rounded-full bg-white shadow-[var(--shadow-action)] transition-transform active:scale-95 ${
              isLiked ? "text-[var(--color-accent-like)]" : "text-[var(--color-accent-like)]"
            }`}
          >
            <ThumbsUp className={`h-6.5 w-6.5 ${isLiked ? "fill-current" : ""}`} />
          </button>
          {/* アクション丸ボタン (お気に入り) */}
          <button
            onClick={handleFavorite}
            aria-pressed={isFavorited}
            aria-label="お気に入り"
            className={`flex h-[var(--size-action)] w-[var(--size-action)] items-center justify-center rounded-full bg-white shadow-[var(--shadow-action)] transition-transform active:scale-95 ${
              isFavorited ? "text-[var(--color-accent-star)]" : "text-[var(--color-accent-star)]"
            }`}
          >
            <Star className={`h-6.5 w-6.5 ${isFavorited ? "fill-current" : ""}`} />
          </button>
        </div>
      </div>

      {/* 4.16 Detail Title Block (店舗名・メタ情報) */}
      <div className="px-4 pb-4 bg-white border-b border-[var(--color-border)]">
        <h1 className="text-[20px] font-bold text-[var(--color-primary)] leading-tight">
          {shop.name}
        </h1>
        <p className="mt-2 text-sm font-bold text-[var(--color-text)]">
          {shop.area} ／ {shop.nearestStation.name} 徒歩{shop.nearestStation.walkMin}分
          {shop.operator && `   運営:${shop.operator}`}
        </p>
        <button
          onClick={() => scrollToSection("shop-info-section")}
          className="mt-1 text-xs text-[var(--color-text-sub)] flex items-center"
        >
          店舗詳細情報 <ChevronRight className="h-3 w-3 inline ml-0.5" />
        </button>

        {/* 4.17 Outline Chip (特徴タグ) */}
        <div className="mt-3 flex flex-wrap gap-2">
          {shop.tags.map((tag, idx) => (
            <span
              key={idx}
              className={`inline-flex items-center px-3 py-1 rounded-[var(--radius-md)] text-xs leading-none ${
                tag.brand
                  ? "border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-bold"
                  : "border-2 border-[#888] text-[var(--color-text-sub)]"
              }`}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>

      {/* 4.22 Coupon FAB (右端固定) */}
      <button
        onClick={() => alert("利用可能なクーポン: 新規限定2,000円OFF")}
        style={{ bottom: `calc(var(--tabbar-h) + ${showStickyCta ? 72 : 16}px + env(safe-area-inset-bottom))` }}
        className="fixed right-[-8px] z-30 flex h-[72px] w-[88px] flex-col items-center justify-center rounded-l-[36px] bg-[var(--color-accent-point)] pr-2 text-[var(--color-text)] shadow-[var(--shadow-float)] transition-all duration-150"
      >
        <Gift className="h-5.5 w-5.5 text-[var(--color-text)] mb-0.5" />
        <span className="text-[11px] font-bold leading-tight text-center">
          クーポン<br />GET!!
        </span>
      </button>

      {/* 4.9 FAB (トップへ戻る) */}
      {showFab && (
        <button
          onClick={scrollToTop}
          style={{ bottom: `calc(var(--tabbar-h) + ${showStickyCta ? 72 : 16}px + env(safe-area-inset-bottom))` }}
          className="fixed left-1/2 -translate-x-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-overlay)] text-white shadow-md transition-all duration-150"
          aria-label="トップへ戻る"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}

      {/* 4.20 Sticky CTA Bar (追従CTA) */}
      <div
        className={`fixed bottom-[var(--tabbar-h)] left-0 right-0 z-30 max-w-[720px] mx-auto flex h-[56px] items-center border-t border-[var(--color-border)] bg-white px-4 transition-transform duration-150 ${
          showStickyCta ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <button
          onClick={handleFavorite}
          className="flex h-11 w-11 items-center justify-center rounded-md border border-[var(--color-border)] text-[var(--color-accent-star)] mr-2"
          aria-label="お気に入り"
        >
          <Star className={`h-6 w-6 ${isFavorited ? "fill-current" : ""}`} />
        </button>
        <a
          href={`tel:${shop.tel}`}
          className="flex h-11 flex-1 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary)] font-bold text-white text-[16px]"
        >
          電話で予約する
        </a>
      </div>
    </>
  );
}

// ----------------------------------------------------------------------
// Main Server Component (Page Entry Point)
// ----------------------------------------------------------------------
export default async function ShopDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const shop = await getShopData(id);

  const workingTherapistsCount = shop.therapists.filter(
    (t) => t.status === "working" || t.status === "available"
  ).length;

  return (
    <main className="min-h-screen max-w-[720px] mx-auto bg-[var(--color-bg)] text-[var(--color-text)] pb-[calc(var(--tabbar-h)+16px)]">
      {/* クライアント動的UI（ヘッダー/ヒーロー/CTA/FAB/ステート） */}
      <ClientInteractiveUI shop={shop} />

      {/* ================================================================== */}
      {/* 7. セラピスト一覧 セクション (§3.3 太線強で区切り) */}
      {/* ================================================================== */}
      <section id="therapists-section" className="border-t-4 border-[var(--color-primary)] mt-2">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)]">
          <h2 className="text-base font-bold text-[var(--color-text)]">
            セラピスト全{shop.therapists.length}名
            <span className="ml-2 text-xs font-normal text-[var(--color-text-sub)]">
              本日出勤{workingTherapistsCount}名
            </span>
          </h2>
        </div>

        {/* 4.18 List Row & 4.19 Status Circle */}
        <div className="divide-y divide-[var(--color-border)] px-2">
          {shop.therapists.map((therapist) => (
            <div key={therapist.id} className="flex h-[104px] items-center p-2 space-x-3">
              {/* サムネイル 3:4 */}
              <div className="relative h-[88px] w-[66px] flex-shrink-0 overflow-hidden rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-sub)]">
                <Image
                  src={therapist.image}
                  alt={therapist.name}
                  fill
                  sizes="66px"
                  className="object-cover"
                />
                {therapist.isNew && (
                  <span className="absolute top-0 left-0 bg-[var(--color-accent-like)] px-1.5 py-0.5 text-[10px] font-bold text-white">
                    UP
                  </span>
                )}
                {therapist.hasCoupon && (
                  <span className="absolute bottom-0 left-0 right-0 h-5 bg-[var(--color-accent-point)] text-center text-[11px] font-bold leading-5 text-[var(--color-text)]">
                    クーポン
                  </span>
                )}
              </div>

              {/* 中央情報 */}
              <div className="flex flex-1 flex-col justify-center space-y-1 min-w-0">
                <h3 className="truncate font-bold text-[14px] text-[var(--color-text)]">
                  {therapist.name}
                </h3>
                <p className="flex items-center text-xs font-bold text-[var(--color-text-sub)]">
                  <MessageCircle className="h-4 w-4 mr-1 inline" />
                  {therapist.reviewCount}
                </p>
              </div>

              {/* 4.19 Status Circle */}
              <div className="flex-shrink-0">
                {therapist.status === "available" && (
                  <div className="flex h-[var(--size-status)] w-[var(--size-status)] flex-col items-center justify-center rounded-full bg-[var(--color-success)] text-white text-[11px] font-bold leading-tight text-center">
                    <span>空き</span>
                    {therapist.nextSlot && <span className="text-[10px]">{therapist.nextSlot}</span>}
                  </div>
                )}
                {therapist.status === "working" && (
                  <div className="flex h-[var(--size-status)] w-[var(--size-status)] items-center justify-center rounded-full bg-[var(--color-primary)] text-white text-[11px] font-bold">
                    出勤中
                  </div>
                )}
                {therapist.status === "off" && (
                  <div className="flex h-[var(--size-status)] w-[var(--size-status)] items-center justify-center rounded-full bg-[#BDBDBD] text-white text-[11px] font-bold">
                    休み
                  </div>
                )}
                {therapist.status === "full" && (
                  <div className="flex h-[var(--size-status)] w-[var(--size-status)] items-center justify-center rounded-full bg-[#BDBDBD] text-white text-[11px] font-bold">
                    満席
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4">
          <button className="flex h-[var(--btn-h-lg)] w-full items-center justify-center rounded-[var(--radius-md)] border-2 border-[var(--color-primary)] bg-white font-bold text-[var(--color-primary)] text-[16px] relative">
            全{shop.therapists.length}名を表示する
            <ChevronRight className="absolute right-3 h-5 w-5" />
          </button>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 8. 料金・コース セクション (4.24 Price Table) */}
      {/* ================================================================== */}
      <section className="border-t-2 border-[var(--color-divider-strong)] pt-4">
        <h2 className="px-4 text-[17px] font-bold text-[var(--color-text)] mb-3">
          コース・料金
        </h2>
        <div className="divide-y divide-[var(--color-border)] px-4">
          {shop.courses.map((course, idx) => (
            <div key={idx} className="py-3 flex justify-between items-start">
              <div className="pr-2 space-y-0.5">
                <p className="font-bold text-[14px] text-[var(--color-text)]">
                  {course.name}
                </p>
                <p className="text-xs text-[var(--color-text-sub)]">
                  {course.minutes}分
                </p>
                {course.note && (
                  <p className="text-xs text-[var(--color-accent-promo)] font-bold">
                    {course.note}
                  </p>
                )}
              </div>
              <div className="text-right flex-shrink-0">
                {course.discountedPrice ? (
                  <>
                    <p className="text-xs text-[var(--color-text-sub)] line-through">
                      ¥{course.price.toLocaleString()}
                    </p>
                    <p className="font-bold text-[16px] text-[var(--color-accent-promo)]">
                      ¥{course.discountedPrice.toLocaleString()} <span className="text-xs font-normal text-[var(--color-text)]">(税込)</span>
                    </p>
                  </>
                ) : (
                  <p className="font-bold text-[16px] text-[var(--color-text)]">
                    ¥{course.price.toLocaleString()} <span className="text-xs font-normal text-[var(--color-text-sub)]">(税込)</span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="px-4 mt-2 text-[11px] text-[var(--color-text-sub)]">
          ※ 指名料・延長料金は別途発生する場合がございます。
        </p>
      </section>

      {/* ================================================================== */}
      {/* 9. 口コミ セクション */}
      {/* ================================================================== */}
      <section className="border-t-2 border-[var(--color-divider-strong)] mt-6 pt-4">
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="text-[17px] font-bold text-[var(--color-text)]">
            口コミ ({shop.reviews.count}件)
          </h2>
          <span className="flex items-center font-bold text-[16px] text-[var(--color-accent-star)]">
            ★ {shop.reviews.average}
          </span>
        </div>
        <div className="divide-y divide-[var(--color-border)] px-4">
          {shop.reviews.items.map((review) => (
            <div key={review.id} className="py-3 space-y-1">
              <div className="flex justify-between text-xs text-[var(--color-text-sub)]">
                <span>{review.user}</span>
                <span>{review.date}</span>
              </div>
              <p className="text-xs text-[var(--color-accent-star)] font-bold">
                {"★".repeat(review.rating)}
              </p>
              <p className="text-xs text-[var(--color-text)] line-clamp-3">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================== */}
      {/* 10. 店舗情報 セクション (4.23 Info Table) */}
      {/* ================================================================== */}
      <section id="shop-info-section" className="border-t-2 border-[var(--color-divider-strong)] mt-6 pt-4">
        <h2 className="px-4 text-[17px] font-bold text-[var(--color-text)] mb-3">
          店舗情報
        </h2>
        <div className="divide-y divide-[var(--color-border)] border-t border-b border-[var(--color-border)] text-xs">
          <div className="flex p-3">
            <span className="w-24 text-[var(--color-text-sub)] shrink-0">住所</span>
            <span className="text-[var(--color-text)] flex-1">東京都渋谷区... (予約確定後に詳細をお知らせ)</span>
          </div>
          <div className="flex p-3">
            <span className="w-24 text-[var(--color-text-sub)] shrink-0">アクセス</span>
            <span className="text-[var(--color-text)] flex-1">{shop.area} / {shop.nearestStation.name} 徒歩{shop.nearestStation.walkMin}分</span>
          </div>
          <div className="flex p-3">
            <span className="w-24 text-[var(--color-text-sub)] shrink-0">営業時間</span>
            <span className="text-[var(--color-text)] flex-1">{shop.hours.open}〜{shop.hours.close} ({shop.hours.note})</span>
          </div>
          <div className="flex p-3">
            <span className="w-24 text-[var(--color-text-sub)] shrink-0">電話番号</span>
            <a href={`tel:${shop.tel}`} className="text-[var(--color-primary)] font-bold underline flex-1">
              {shop.tel}
            </a>
          </div>
          <div className="flex p-3">
            <span className="w-24 text-[var(--color-text-sub)] shrink-0">届出情報</span>
            <span className="text-[var(--color-text)] flex-1">{shop.legal.registrationInfo}</span>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 11 & 12. おすすめ・回遊 セクション (4.21 Recommend Row) */}
      {/* ================================================================== */}
      <section className="border-t-2 border-[var(--color-divider-strong)] mt-6 pt-4">
        <h2 className="px-4 text-[17px] font-bold text-[var(--color-text)] mb-3">
          この店舗を見た人はこちらも
        </h2>
        <div className="flex space-x-3 overflow-x-auto px-4 pb-2 scrollbar-none">
          {shop.recommendations.map((rec) => (
            <div key={rec.id} className="w-[134px] flex-shrink-0 space-y-1">
              <div className="relative h-[134px] w-[134px] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-sub)]">
                <Image src={rec.image} alt={rec.name} fill sizes="134px" className="object-cover" />
              </div>
              <p className="font-bold text-[14px] text-[var(--color-text)] truncate">{rec.name}</p>
              {rec.promoText && (
                <p className="text-xs font-bold text-[var(--color-accent-promo)] truncate">
                  {rec.promoText}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================== */}
      {/* 4.11 Footer & 4.2 Bottom Tab Bar */}
      {/* ================================================================== */}
      <footer className="mt-8 bg-[var(--color-primary-dark)] p-6 text-white text-xs space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <button className="h-[60px] rounded-[var(--radius-lg)] bg-white/10 font-bold flex items-center justify-center">
            ヘルプ
          </button>
          <button className="h-[60px] rounded-[var(--radius-lg)] bg-white/10 font-bold flex items-center justify-center">
            お問い合わせ
          </button>
        </div>
        <div className="text-center text-white/70 space-y-1">
          <p>18歳未満の方の利用は固くお断りいたします。</p>
          <p>© 2026 Portal Site Inc.</p>
        </div>
      </footer>

      {/* 4.2 Bottom Tab Bar (固定下部タブ) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 max-w-[720px] mx-auto flex h-[var(--tabbar-h)] items-center justify-around border-t border-[var(--color-border)] bg-white pb-[env(safe-area-inset-bottom)]">
        <Link href="/" className="flex flex-col items-center text-[var(--color-text-sub)]">
          <Home className="h-6 w-6" />
          <span className="text-[11px]">TOP</span>
        </Link>
        <Link href="/search" className="flex flex-col items-center text-[var(--color-text-sub)]">
          <Compass className="h-6 w-6" />
          <span className="text-[11px]">探す</span>
        </Link>
        <Link href="/ranking" className="flex flex-col items-center text-[var(--color-text-sub)]">
          <Award className="h-6 w-6" />
          <span className="text-[11px]">ランキング</span>
        </Link>
        <Link href="/favorites" className="flex flex-col items-center text-[var(--color-primary)] font-bold">
          <Star className="h-6 w-6 fill-current" />
          <span className="text-[11px]">お気に入り</span>
        </Link>
        <Link href="/mypage" className="flex flex-col items-center text-[var(--color-text-sub)]">
          <User className="h-6 w-6" />
          <span className="text-[11px]">マイページ</span>
        </Link>
      </nav>
    </main>
  );
}