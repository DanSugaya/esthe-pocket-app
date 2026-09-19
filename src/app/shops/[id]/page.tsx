"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
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
  Home,
  Search,
  Trophy,
  User,
  ArrowUp,
} from "lucide-react";

// ==========================================
// Types (Design System §6.6)
// ==========================================
type Therapist = {
  id: string;
  name: string;
  image: string;
  reviewCount: number;
  isNew?: boolean;
  hasCoupon?: boolean;
  status: "available" | "working" | "off" | "full";
  nextSlot?: string;
};

type Course = {
  name: string;
  minutes: number;
  price: number;
  discountedPrice?: number;
  note?: string;
};

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
  therapists: Therapist[];
  courses: Course[];
  notices: { updatedAt: string; message: string };
  legal: { registrationInfo: string };
  address: string;
  access: string;
  paymentMethods: string;
  officialSite: string;
};

// Mock Data
const MOCK_SHOP: Shop = {
  id: "shop-001",
  name: "アロマテラピーサロン Luxury Lounge 渋谷店",
  heroImages: [
    { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80", alt: "Luxury Lounge 渋谷店 内観" },
    { src: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80", alt: "Luxury Lounge 渋谷店 施術ルーム" },
    { src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80", alt: "Luxury Lounge 渋谷店 受付" },
  ],
  area: "渋谷",
  nearestStation: { name: "渋谷駅", walkMin: 3 },
  operator: "ラグジュアリーグループ",
  hours: { open: "12:00", close: "翌5:00" },
  closedDays: "年中無休",
  tel: "03-1234-5678",
  webReservationUrl: "https://example.com/reserve",
  tags: [
    { label: "ポータル限定", brand: true },
    { label: "新店", brand: true },
    { label: "完全個室" },
    { label: "駅近" },
    { label: "深夜営業" },
    { label: "カード可" },
    { label: "シャワー完備" },
  ],
  stats: { likes: 20527, favorites: 9116 },
  notices: {
    updatedAt: "14:30",
    message: "本日 12:00〜翌5:00 営業中 ／ 出勤情報を14:30に更新",
  },
  therapists: [
    { id: "t1", name: "美咲 (ミサキ)", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80", reviewCount: 194, isNew: true, status: "available", nextSlot: "17:30" },
    { id: "t2", name: "愛莉 (アイリ)", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80", reviewCount: 88, hasCoupon: true, status: "working" },
    { id: "t3", name: "葵 (アオイ)", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80", reviewCount: 42, status: "working" },
    { id: "t4", name: "ナナ", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80", reviewCount: 15, status: "off" },
  ],
  courses: [
    { name: "スタンダードアロマコース", minutes: 60, price: 12000, note: "基本のお手軽コースです" },
    { name: "ディープリラックスアロマ", minutes: 90, price: 18000, discountedPrice: 15000, note: "一番人気！しっかりほぐしたい方に" },
    { name: "極上プレミアムコース", minutes: 120, price: 24000, note: "全身贅沢トリートメント" },
  ],
  address: "東京都渋谷区道玄坂1-XX-XX ラグジュアリービル 3F",
  access: "JR渋谷駅 ハチ公口より徒歩3分（道玄坂沿い）",
  paymentMethods: "現金、クレジットカード（VISA, Master, JCB, AMEX）",
  officialSite: "https://example.com/shop-001",
  legal: { registrationInfo: "届出済み（東京都公安委員会 第XXXXXXXX号）" },
};

const RECOMMEND_SHOPS = [
  { id: "r1", name: "スパリゾート Salon AROMA", promo: "初回3,000円OFFクーポンあり", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=300&q=80" },
  { id: "r2", name: "癒し空間 Premium 恵比寿", promo: "本日ポイント2倍デー", image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=300&q=80" },
  { id: "r3", name: "ナイトリゾート 新宿店", promo: "深夜限定割引あり", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=300&q=80" },
];

export default function ShopDetailPage() {
  const shop = MOCK_SHOP;

  // Interactivity States
  const [likes, setLikes] = useState(shop.stats.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [favorites, setFavorites] = useState(shop.stats.favorites);
  const [isFavorited, setIsFavorited] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);

  // Observer States
  const [isHeaderSolid, setIsHeaderSolid] = useState(false);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Refs
  const heroRef = useRef<HTMLDivElement>(null);
  const mainCtaRef = useRef<HTMLDivElement>(null);
  const therapistSectionRef = useRef<HTMLElement>(null);
  const infoSectionRef = useRef<HTMLElement>(null);

  // Intersection Observers (Header, Sticky CTA)
  useEffect(() => {
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        setIsHeaderSolid(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (heroRef.current) heroObserver.observe(heroRef.current);

    const ctaObserver = new IntersectionObserver(
      ([entry]) => {
        setShowStickyCta(!entry.isIntersecting);
      },
      { threshold: 0 }
    );
    if (mainCtaRef.current) ctaObserver.observe(mainCtaRef.current);

    return () => {
      heroObserver.disconnect();
      ctaObserver.disconnect();
    };
  }, []);

  // Scroll listener for Top FAB
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handlers
  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    setFavorites((prev) => (isFavorited ? prev - 1 : prev + 1));
  };

  const scrollToSection = (ref: React.RefObject<HTMLElement | HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${shop.name} | メンズエステ`,
          url: window.location.href,
        });
      } catch (e) {
        // user cancelled or failed
      }
    } else {
      alert("URLをコピーしました。");
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#222222] font-sans pb-[calc(64px+env(safe-area-inset-bottom))] max-w-[720px] mx-auto relative antialiased border-x border-[#E0E0E0]">
      {/* Dynamic CSS Token Variables Variables (Design System §2.5) */}
      <style jsx global>{`
        :root {
          --color-primary: #1B2F8F;
          --color-primary-dark: #12206A;
          --color-primary-light: #E8ECFA;
          --color-accent-promo: #E0407F;
          --color-accent-like: #D93025;
          --color-accent-star: #F5A623;
          --color-accent-point: #FFE234;
          --color-success: #2E9E5B;
          --color-text: #222222;
          --color-text-sub: #888888;
          --color-border: #E0E0E0;
          --color-divider-strong: #DADADA;
          --color-bg: #FFFFFF;
          --color-bg-sub: #F4F4F4;
          --color-overlay: rgba(18, 32, 106, 0.85);
          --color-scrim: rgba(0, 0, 0, 0.35);

          --space-1: 4px; --space-2: 8px; --space-3: 12px;
          --space-4: 16px; --space-5: 24px; --space-6: 32px;

          --radius-sm: 4px; --radius-md: 8px; --radius-lg: 12px;
          --radius-pill: 999px; --radius-circle: 50%;

          --border-outline: 2px solid var(--color-primary);
          --border-section: 2px solid var(--color-divider-strong);
          --shadow-float: 0 2px 8px rgba(0,0,0,0.25);
          --shadow-action: 0 2px 6px rgba(0,0,0,0.15);

          --size-action: 54px;
          --size-status: 52px;
          --btn-h-lg: 52px;
          --header-h: 56px;
          --tabbar-h: 64px;
          --sticky-cta-h: 56px;
        }
      `}</style>

      {/* 4.13 Detail App Bar */}
      <header
        className={`fixed top-0 left-0 right-0 max-w-[720px] mx-auto h-[56px] z-40 transition-colors duration-150 flex items-center justify-between px-4 ${
          isHeaderSolid ? "bg-[#1B2F8F] text-white shadow-md" : "bg-transparent text-white"
        }`}
      >
        <button
          onClick={() => window.history.back()}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity active:opacity-70 focus:outline-none"
          style={{ backgroundColor: isHeaderSolid ? "transparent" : "var(--color-scrim)" }}
          aria-label="戻る"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <h1
          className={`font-bold text-[14px] truncate max-w-[200px] transition-opacity duration-150 ${
            isHeaderSolid ? "opacity-100" : "opacity-0"
          }`}
        >
          {shop.name}
        </h1>

        <button
          onClick={handleShare}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity active:opacity-70 focus:outline-none"
          style={{ backgroundColor: isHeaderSolid ? "transparent" : "var(--color-scrim)" }}
          aria-label="シェア"
        >
          <Share2 className="w-5 h-5 text-white" />
        </button>
      </header>

      {/* 4.8 Hero Carousel (16:9, No Auto-play) */}
      <div ref={heroRef} className="relative w-full aspect-[16/9] bg-[#F4F4F4] overflow-hidden">
        <div
          className="flex h-full transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${heroIndex * 100}%)` }}
        >
          {shop.heroImages.map((img, idx) => (
            <div key={idx} className="relative w-full h-full flex-shrink-0">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={idx === 0}
                className="object-cover"
                sizes="(max-width: 720px) 100vw, 720px"
              />
            </div>
          ))}
        </div>
        {/* Indicators */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
          {shop.heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setHeroIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                heroIndex === idx ? "w-5 bg-white" : "w-2 bg-white/50"
              }`}
              aria-label={`スライド ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 4.14 Notice Strip */}
      <div
        onClick={() => scrollToSection(therapistSectionRef)}
        className="h-10 px-4 flex items-center justify-between border-b border-[#E0E0E0] cursor-pointer active:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2 overflow-hidden mr-2">
          <span className="bg-[#E0407F] text-white text-[11px] font-bold px-2 py-0.5 rounded-full flex-shrink-0">
            更新
          </span>
          <span className="text-[13px] text-[#222222] truncate">{shop.notices.message}</span>
        </div>
        <ChevronRight className="w-4 h-4 text-[#888888] flex-shrink-0" />
      </div>

      {/* Main Block 1: CTA & Basic Info */}
      <div className="p-4 space-y-4">
        {/* 4.9 Primary Large CTA */}
        <div ref={mainCtaRef} className="space-y-2">
          <a
            href={`tel:${shop.tel}`}
            className="w-full h-[52px] bg-[#1B2F8F] text-white font-bold text-[16px] rounded-[8px] flex items-center justify-center gap-2 active:bg-[#12206A] transition-colors"
          >
            <Phone className="w-5 h-5" />
            電話で予約する
          </a>
          {shop.webReservationUrl && (
            <a
              href={shop.webReservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-[52px] bg-white text-[#1B2F8F] border-2 border-[#1B2F8F] font-bold text-[16px] rounded-[8px] flex items-center justify-center relative active:bg-blue-50 transition-colors"
            >
              Web予約
              <ChevronRight className="absolute right-3 w-5 h-5" />
            </a>
          )}
        </div>

        {/* 4.15 Stat & Action Row */}
        <div className="flex items-start justify-between pt-1">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <span className="flex items-center gap-1 text-[#D93025] font-bold text-[18px] tabular-nums">
                <ThumbsUp className="w-5 h-5 fill-current" />
                {likes.toLocaleString()}
              </span>
              <span className="flex items-center gap-1 text-[#F5A623] font-bold text-[18px] tabular-nums">
                <Star className="w-5 h-5 fill-current" />
                {favorites.toLocaleString()}
              </span>
            </div>
            <div className="text-[13px] text-[#888888] leading-tight space-y-1">
              <p>営業時間:{shop.hours.open}〜{shop.hours.close}</p>
              <p>定休日:{shop.closedDays}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLike}
              aria-pressed={isLiked}
              className={`w-[54px] h-[54px] rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.15)] flex items-center justify-center active:scale-95 transition-transform ${
                isLiked ? "text-[#D93025]" : "text-[#888888]"
              }`}
              aria-label="いいね"
            >
              <ThumbsUp className={`w-6.5 h-6.5 ${isLiked ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={toggleFavorite}
              aria-pressed={isFavorited}
              className={`w-[54px] h-[54px] rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.15)] flex items-center justify-center active:scale-95 transition-transform ${
                isFavorited ? "text-[#F5A623]" : "text-[#888888]"
              }`}
              aria-label="お気に入り"
            >
              <Star className={`w-6.5 h-6.5 ${isFavorited ? "fill-current" : ""}`} />
            </button>
          </div>
        </div>

        {/* 4.16 Detail Title Block */}
        <div className="space-y-2 pt-2">
          <h1 className="text-[#1B2F8F] font-bold text-[20px] leading-snug">{shop.name}</h1>
          <p className="text-[#222222] font-bold text-[14px]">
            エリア:{shop.area} ／ 最寄駅:{shop.nearestStation.name} 徒歩{shop.nearestStation.walkMin}分
            {shop.operator && ` 運営:${shop.operator}`}
          </p>
          <button
            onClick={() => scrollToSection(infoSectionRef)}
            className="text-[14px] text-[#888888] flex items-center gap-0.5 hover:underline"
          >
            店舗詳細情報
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4.17 Outline Chip */}
        <div className="flex flex-wrap gap-2 pt-1">
          {shop.tags.map((tag, i) => (
            <span
              key={i}
              className={`px-3.5 py-1.5 rounded-[8px] text-[14px] leading-tight font-medium ${
                tag.brand
                  ? "border-2 border-[#1B2F8F] text-[#1B2F8F] font-bold"
                  : "border-2 border-[#888888] text-[#888888]"
              }`}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>

      {/* Section Divider: Strong (4px Primary) */}
      <div className="h-1 bg-[#1B2F8F] w-full" />

      {/* 4.18 & 4.19 Therapist List Section */}
      <section ref={therapistSectionRef} className="py-4">
        <div className="px-4 mb-3 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <h2 className="font-bold text-[17px]">セラピスト全{shop.therapists.length}名</h2>
            <span className="text-[#888888] text-[13px]">
              本日出勤{shop.therapists.filter((t) => t.status !== "off").length}名
            </span>
          </div>
        </div>

        <div className="divide-y divide-[#E0E0E0]">
          {shop.therapists.map((therapist) => (
            <div key={therapist.id} className="px-2 py-2 flex items-center justify-between h-[104px]">
              <div className="flex items-center gap-3 overflow-hidden">
                {/* Thumbnail 3:4 */}
                <div className="relative w-[72px] h-[88px] flex-shrink-0 rounded-[4px] border border-[#E0E0E0] overflow-hidden bg-gray-100">
                  <Image src={therapist.image} alt={therapist.name} fill className="object-cover" />
                  {therapist.isNew && (
                    <span className="absolute top-0 left-0 bg-[#D93025] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-br-[4px]">
                      UP
                    </span>
                  )}
                  {therapist.hasCoupon && (
                    <span className="absolute bottom-0 left-0 right-0 bg-[#FFE234] text-[#222222] text-[11px] font-bold text-center h-[20px] flex items-center justify-center">
                      クーポンあり
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="space-y-1 overflow-hidden">
                  <p className="font-bold text-[14px] text-[#222222] truncate">{therapist.name}</p>
                  <p className="text-[#888888] text-[13px] font-bold flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {therapist.reviewCount}
                  </p>
                </div>
              </div>

              {/* 4.19 Status Circle */}
              <div className="flex-shrink-0 ml-2">
                {therapist.status === "available" && (
                  <div className="w-[52px] h-[52px] rounded-full bg-[#2E9E5B] text-white font-bold text-[11px] flex flex-col items-center justify-center leading-tight">
                    <span>空き</span>
                    <span className="text-[10px]">{therapist.nextSlot}</span>
                  </div>
                )}
                {therapist.status === "working" && (
                  <div className="w-[52px] h-[52px] rounded-full bg-[#1B2F8F] text-white font-bold text-[11px] flex items-center justify-center">
                    出勤中
                  </div>
                )}
                {therapist.status === "off" && (
                  <div className="w-[52px] h-[52px] rounded-full bg-[#BDBDBD] text-white font-bold text-[11px] flex items-center justify-center">
                    休み
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 mt-3 space-y-2">
          <button className="w-full h-[52px] bg-white text-[#1B2F8F] border-2 border-[#1B2F8F] font-bold text-[16px] rounded-[8px] flex items-center justify-center relative active:bg-blue-50 transition-colors">
            全{shop.therapists.length}名を表示する
            <ChevronRight className="absolute right-3 w-5 h-5" />
          </button>
          <button
            onClick={() => scrollToSection(infoSectionRef)}
            className="w-full h-[52px] bg-[#1B2F8F] text-white font-bold text-[16px] rounded-[8px] flex items-center justify-center active:bg-[#12206A] transition-colors"
          >
            コース・料金を見る
          </button>
        </div>
      </section>

      {/* Section Divider: Medium */}
      <div className="border-t-2 border-[#DADADA]" />

      {/* 4.24 Price Table Section */}
      <section className="py-5 px-4 space-y-3">
        <h2 className="font-bold text-[17px] text-[#222222]">料金・コース</h2>
        <div className="border-t border-[#E0E0E0] divide-y divide-[#E0E0E0]">
          {shop.courses.map((course, idx) => (
            <div key={idx} className="py-3 flex items-start justify-between gap-2">
              <div className="space-y-0.5">
                <p className="font-bold text-[14px] text-[#222222]">{course.name}</p>
                {course.note && <p className="text-[12px] text-[#888888]">{course.note}</p>}
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-[13px] text-[#888888]">{course.minutes}分</p>
                {course.discountedPrice ? (
                  <div className="font-bold text-[14px]">
                    <span className="line-through text-[#888888] text-[12px] mr-1">
                      ¥{course.price.toLocaleString()}
                    </span>
                    <span className="text-[#E0407F]">¥{course.discountedPrice.toLocaleString()}</span>
                    <span className="text-[10px] text-[#888888] font-normal"> (税込)</span>
                  </div>
                ) : (
                  <p className="font-bold text-[14px] text-[#222222]">
                    ¥{course.price.toLocaleString()}
                    <span className="text-[10px] text-[#888888] font-normal"> (税込)</span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="text-[12px] text-[#888888]">※ 指名料・延長料金は店舗にて別途ご確認ください。</p>
      </section>

      {/* Section Divider: Medium */}
      <div className="border-t-2 border-[#DADADA]" />

      {/* Reviews Section */}
      <section className="py-5 px-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-[17px] text-[#222222]">口コミ</h2>
          <div className="flex items-center gap-1 text-[#F5A623] font-bold text-[14px]">
            <Star className="w-4 h-4 fill-current" />
            <span>4.8</span>
            <span className="text-[#888888] font-normal text-[12px]">(128件)</span>
          </div>
        </div>

        <div className="space-y-3 text-[13px]">
          <div className="p-3 bg-[#F4F4F4] rounded-[8px] space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold">サトウ 様</span>
              <span className="text-[#888888] text-[12px]">2026-09-15</span>
            </div>
            <p className="text-[#222222] line-clamp-3">
              店内がとても清潔でリラックスできました。セラピストさんの対応も丁寧で、技術も高く大満足です。また利用させていただきます！
            </p>
          </div>
        </div>

        <button className="w-full h-[52px] bg-white text-[#1B2F8F] border-2 border-[#1B2F8F] font-bold text-[16px] rounded-[8px] flex items-center justify-center relative active:bg-blue-50 transition-colors">
          口コミをすべて見る (128件)
          <ChevronRight className="absolute right-3 w-5 h-5" />
        </button>
      </section>

      {/* Section Divider: Medium */}
      <div className="border-t-2 border-[#DADADA]" />

      {/* 4.23 Info Table Section */}
      <section ref={infoSectionRef} className="py-5 px-4 space-y-3">
        <h2 className="font-bold text-[17px] text-[#222222]">店舗情報</h2>
        <div className="border border-[#E0E0E0] rounded-[8px] divide-y divide-[#E0E0E0] text-[13px]">
          <div className="flex p-3">
            <span className="w-[96px] text-[#888888] flex-shrink-0">住所</span>
            <span className="text-[#222222] font-medium">{shop.address}</span>
          </div>
          <div className="flex p-3">
            <span className="w-[96px] text-[#888888] flex-shrink-0">アクセス</span>
            <span className="text-[#222222]">{shop.access}</span>
          </div>
          <div className="flex p-3">
            <span className="w-[96px] text-[#888888] flex-shrink-0">電話番号</span>
            <a href={`tel:${shop.tel}`} className="text-[#1B2F8F] font-bold hover:underline">
              {shop.tel}
            </a>
          </div>
          <div className="flex p-3">
            <span className="w-[96px] text-[#888888] flex-shrink-0">営業時間</span>
            <span className="text-[#222222]">{shop.hours.open}〜{shop.hours.close}</span>
          </div>
          <div className="flex p-3">
            <span className="w-[96px] text-[#888888] flex-shrink-0">定休日</span>
            <span className="text-[#222222]">{shop.closedDays}</span>
          </div>
          <div className="flex p-3">
            <span className="w-[96px] text-[#888888] flex-shrink-0">支払方法</span>
            <span className="text-[#222222]">{shop.paymentMethods}</span>
          </div>
          <div className="flex p-3">
            <span className="w-[96px] text-[#888888] flex-shrink-0">届出情報</span>
            <span className="text-[#222222]">{shop.legal.registrationInfo}</span>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="relative w-full aspect-[16/9] bg-gray-200 rounded-[8px] overflow-hidden flex items-center justify-center border border-[#E0E0E0]">
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(shop.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md text-[#1B2F8F] font-bold text-[13px]"
          >
            <MapPin className="w-4 h-4" />
            地図アプリで開く
          </a>
        </div>
      </section>

      {/* Section Divider: Medium */}
      <div className="border-t-2 border-[#DADADA]" />

      {/* 4.21 Recommend Row Section */}
      <section className="py-5 space-y-3">
        <h2 className="font-bold text-[17px] text-[#222222] px-4">この店舗を見た人はこちらも</h2>
        <div className="flex gap-3 overflow-x-auto px-4 pb-2 no-scrollbar snap-x snap-proximity">
          {RECOMMEND_SHOPS.map((rec) => (
            <div key={rec.id} className="w-[134px] flex-shrink-0 snap-start space-y-1">
              <div className="relative w-[134px] h-[134px] rounded-[12px] border border-[#E0E0E0] overflow-hidden bg-gray-100">
                <Image src={rec.image} alt={rec.name} fill className="object-cover" sizes="134px" />
              </div>
              <p className="font-bold text-[14px] text-[#222222] truncate">{rec.name}</p>
              <p className="text-[#E0407F] font-bold text-[12px] truncate">{rec.promo}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4.11 Footer */}
      <footer className="bg-[#12206A] text-white p-4 space-y-6 mt-8">
        <div className="grid grid-cols-2 gap-2">
          <a href="#" className="h-[60px] bg-[#F4F4F4] text-[#222222] rounded-[12px] flex items-center justify-center font-bold text-[13px]">
            公式SNS
          </a>
          <a href="#" className="h-[60px] bg-[#F4F4F4] text-[#222222] rounded-[12px] flex items-center justify-center font-bold text-[13px]">
            ご利用ガイド
          </a>
          <a href="#" className="h-[60px] bg-[#F4F4F4] text-[#222222] rounded-[12px] flex items-center justify-center font-bold text-[13px]">
            ヘルプ
          </a>
          <a href="#" className="h-[60px] bg-[#F4F4F4] text-[#222222] rounded-[12px] flex items-center justify-center font-bold text-[13px]">
            お問い合わせ
          </a>
        </div>

        <div className="text-[11px] text-white/70 space-y-2 leading-relaxed">
          <p>※ 18歳未満の方のアクセスは固くお断りいたします。</p>
          <p>運営会社: ポータルポータル株式会社</p>
          <div className="flex gap-3 underline pt-1">
            <a href="#">利用規約</a>
            <a href="#">プライバシーポリシー</a>
          </div>
        </div>

        <div className="text-center font-bold text-[16px] tracking-wider pt-2">PORTAL LOGO</div>
      </footer>

      {/* 4.22 Coupon FAB (Vertical tab right side) */}
      <button
        onClick={() => alert("利用可能なクーポン: 初回1,000円引き")}
        className={`fixed right-[-8px] w-[88px] h-[72px] pr-[8px] rounded-l-[36px] bg-[#FFE234] text-[#222222] shadow-[0_2px_8px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center font-bold text-[11px] leading-tight z-30 transition-all duration-150 ${
          showStickyCta
            ? "bottom-[calc(64px+56px+16px+env(safe-area-inset-bottom))]"
            : "bottom-[calc(64px+16px+env(safe-area-inset-bottom))]"
        }`}
      >
        <Gift className="w-5 h-5 mb-0.5 text-[#222222]" />
        <span>クーポン</span>
        <span>GET!!</span>
      </button>

      {/* Back to Top FAB */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className={`fixed left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[rgba(18,32,106,0.85)] text-white flex items-center justify-center shadow-lg z-30 transition-all duration-150 ${
            showStickyCta
              ? "bottom-[calc(64px+56px+16px+env(safe-area-inset-bottom))]"
              : "bottom-[calc(64px+16px+env(safe-area-inset-bottom))]"
          }`}
          aria-label="トップへ戻る"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* 4.20 Sticky CTA Bar */}
      <div
        className={`fixed bottom-[calc(64px+env(safe-area-inset-bottom))] left-0 right-0 max-w-[720px] mx-auto h-[56px] bg-white border-t border-[#E0E0E0] px-4 flex items-center gap-2 z-30 transition-transform duration-150 ${
          showStickyCta ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <button
          onClick={toggleFavorite}
          className={`w-[44px] h-[44px] flex items-center justify-center rounded-[8px] border border-[#E0E0E0] ${
            isFavorited ? "text-[#F5A623]" : "text-[#888888]"
          }`}
          aria-label="お気に入り保存"
        >
          <Star className={`w-6 h-6 ${isFavorited ? "fill-current" : ""}`} />
        </button>
        <a
          href={`tel:${shop.tel}`}
          className="flex-1 h-[44px] bg-[#1B2F8F] text-white font-bold text-[15px] rounded-[8px] flex items-center justify-center gap-2 active:bg-[#12206A] transition-colors"
        >
          <Phone className="w-4 h-4" />
          電話で予約する
        </a>
      </div>

      {/* 4.2 Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-[720px] mx-auto h-[64px] bg-white border-t border-[#E0E0E0] pb-[env(safe-area-inset-bottom)] flex items-center justify-around z-40">
        <a href="#" className="flex flex-col items-center gap-0.5 text-[#1B2F8F]">
          <Home className="w-6 h-6" />
          <span className="text-[11px] font-medium">TOP</span>
        </a>
        <a href="#" className="flex flex-col items-center gap-0.5 text-[#888888]">
          <Search className="w-6 h-6" />
          <span className="text-[11px] font-medium">店舗を探す</span>
        </a>
        <a href="#" className="flex flex-col items-center gap-0.5 text-[#888888]">
          <Trophy className="w-6 h-6" />
          <span className="text-[11px] font-medium">ランキング</span>
        </a>
        <a href="#" className="flex flex-col items-center gap-0.5 text-[#888888]">
          <Star className="w-6 h-6" />
          <span className="text-[11px] font-medium">お気に入り</span>
        </a>
        <a href="#" className="flex flex-col items-center gap-0.5 text-[#888888]">
          <User className="w-6 h-6" />
          <span className="text-[11px] font-medium">マイページ</span>
        </a>
      </nav>
    </div>
  );
}