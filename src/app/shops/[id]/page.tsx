'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/* ============================================================================
 * 1. 型定義 (§6.6 Data Schema)
 * ============================================================================ */
export type Therapist = {
  id: string;
  name: string;
  age: number;
  image: string;
  reviewCount: number;
  isNew?: boolean;
  hasCoupon?: boolean;
  status: 'available' | 'working' | 'off' | 'full';
  nextSlot?: string;
};

export type Course = {
  id: string;
  name: string;
  minutes: number;
  price: number;
  discountedPrice?: number;
  note?: string;
};

export type ShopDetail = {
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
  notices: { updatedAt: string; message: string };
  therapists: Therapist[];
  courses: Course[];
  legal: { registrationInfo: string };
};

/* ============================================================================
 * 2. モックデータ
 * ============================================================================ */
const MOCK_SHOP: ShopDetail = {
  id: 'precious-shibuya',
  name: 'アロマサロン プレシャス渋谷店',
  heroImages: [
    { src: 'https://via.placeholder.com/640x360/1B2F8F/FFFFFF?text=Precious+Shibuya+Main', alt: 'プレシャス渋谷店 内観' },
    { src: 'https://via.placeholder.com/640x360/12206A/FFFFFF?text=Precious+Shibuya+Room', alt: '完全個室施術ルーム' },
  ],
  area: '渋谷',
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
    { id: '1', name: 'アリス', age: 22, image: 'https://via.placeholder.com/150x200/e0e0e0/333333?text=Alice', reviewCount: 194, isNew: true, status: 'working' },
    { id: '2', name: 'ナナミ', age: 24, image: 'https://via.placeholder.com/150x200/e0e0e0/333333?text=Nanami', reviewCount: 82, hasCoupon: true, status: 'working' },
    { id: '3', name: 'リン', age: 21, image: 'https://via.placeholder.com/150x200/e0e0e0/333333?text=Rin', reviewCount: 45, status: 'available', nextSlot: '17:30' },
    { id: '4', name: 'ミホ', age: 25, image: 'https://via.placeholder.com/150x200/e0e0e0/333333?text=Miho', reviewCount: 110, status: 'off' },
  ],
  courses: [
    { id: 'c1', name: 'スタンダードアロマ', minutes: 60, price: 13000, discountedPrice: 10000 },
    { id: 'c2', name: 'ディープディープリラクゼーション', minutes: 90, price: 16000 },
    { id: 'c3', name: 'プレミアムラグジュアリー', minutes: 120, price: 22000 },
  ],
  legal: { registrationInfo: '風俗営業届出済（届出番号: 第3020XXXX号）' },
};

/* ============================================================================
 * 3. サブコンポーネント (§4 コンポーネント群)
 * ============================================================================ */

// 4.13 Detail App Bar (スクロール検知ヘッダー)
function DetailAppBar({ shopName }: { shopName: string }) {
  const [isSolid, setIsSolid] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSolid(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[720px] h-[56px] flex items-center justify-between px-4 z-[100] transition-colors duration-150 ${
        isSolid ? 'bg-[#1B2F8F]' : 'bg-transparent'
      }`}
    >
      <button
        className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
          isSolid ? 'bg-transparent' : 'bg-[rgba(0,0,0,0.35)]'
        }`}
        aria-label="戻る"
      >
        ‹
      </button>
      <div
        className={`text-white font-bold text-[14px] truncate max-w-[60%] transition-opacity duration-150 ${
          isSolid ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {shopName}
      </div>
      <button
        className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
          isSolid ? 'bg-transparent' : 'bg-[rgba(0,0,0,0.35)]'
        }`}
        aria-label="シェア"
      >
        ⫶
      </button>
    </header>
  );
}

// 4.19 Status Circle
function StatusCircle({ status, nextSlot }: { status: Therapist['status']; nextSlot?: string }) {
  switch (status) {
    case 'working':
      return <div className="w-[52px] h-[52px] rounded-full bg-[#1B2F8F] text-white text-[11px] font-bold flex items-center justify-center shrink-0">出勤中</div>;
    case 'available':
      return (
        <div className="w-[52px] h-[52px] rounded-full bg-[#2E9E5B] text-white text-[11px] font-bold flex flex-col items-center justify-center shrink-0">
          <span>空き</span>
          {nextSlot && <span className="text-[9px] font-normal">{nextSlot}</span>}
        </div>
      );
    case 'off':
      return <div className="w-[52px] h-[52px] rounded-full bg-[#BDBDBD] text-white text-[11px] font-bold flex items-center justify-center shrink-0">休み</div>;
    default:
      return null;
  }
}

// 4.18 List Row (セラピスト行)
function TherapistRow({ therapist }: { therapist: Therapist }) {
  return (
    <div className="flex items-center h-[104px] p-2 border-b border-[#E0E0E0] gap-3">
      <div className="relative w-[72px] aspect-[3/4] rounded overflow-hidden border border-[#E0E0E0] shrink-0">
        {therapist.isNew && (
          <span className="absolute top-0 left-0 bg-[#D93025] text-white text-[10px] font-bold px-[6px] py-[2px] rounded-br">
            UP
          </span>
        )}
        <img src={therapist.image} alt={therapist.name} className="w-full h-full object-cover" />
        {therapist.hasCoupon && (
          <div className="absolute bottom-0 w-full h-5 bg-[#FFE234] text-[#222222] text-[11px] font-bold flex items-center justify-center">
            クーポンあり
          </div>
        )}
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="text-[14px] font-bold truncate">{therapist.name} ({therapist.age})</div>
        <div className="flex items-center gap-1 text-[#888888] text-[13px] font-bold mt-2">
          💬 {therapist.reviewCount}
        </div>
      </div>
      <StatusCircle status={therapist.status} nextSlot={therapist.nextSlot} />
    </div>
  );
}

// 4.20 Sticky CTA Bar (追従表示)
function StickyCtaBar({ tel }: { tel: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-[64px] left-1/2 -translate-x-1/2 w-full max-w-[720px] h-[56px] bg-white border-t border-[#E0E0E0] flex items-center px-4 gap-2 z-[90]">
      <button className="w-11 h-11 flex items-center justify-center text-[#F5A623] text-[20px]" aria-label="お気に入り">
        ★
      </button>
      <a
        href={`tel:${tel}`}
        className="flex-1 h-11 bg-[#1B2F8F] text-white font-bold text-[15px] rounded-md flex items-center justify-center shadow-md"
      >
        📞 電話で予約する
      </a>
    </div>
  );
}

/* ============================================================================
 * 4. メインページコンポーネント (店舗詳細)
 * ============================================================================ */
export default function ShopDetailPage() {
  const shop = MOCK_SHOP;

  return (
    <div className="max-w-[720px] mx-auto bg-white min-h-screen relative pb-[140px] text-[#222222] font-sans text-[13px]">
      
      {/* 4.13 App Bar */}
      <DetailAppBar shopName={shop.name} />

      {/* 6.3 #1 ヒーロー (16:9) */}
      <div className="relative w-full aspect-[16/9] bg-[#333333]">
        <img src={shop.heroImages[0].src} alt={shop.heroImages[0].alt} className="w-full h-full object-cover" />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-[6px]">
          <div className="w-2 h-2 rounded-full bg-white"></div>
          <div className="w-2 h-2 rounded-full bg-white/50"></div>
        </div>
      </div>

      {/* 4.14 Notice Strip */}
      <div className="h-[40px] px-4 flex items-center justify-between border-b border-[#E0E0E0] bg-white cursor-pointer">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="bg-[#E0407F] text-white text-[11px] font-bold px-[10px] py-[4px] rounded-full whitespace-nowrap">
            更新
          </span>
          <span className="text-[13px] truncate">{shop.notices.message}</span>
        </div>
        <span className="text-[#888888]">›</span>
      </div>

      {/* メイン基本情報エリア */}
      <div className="p-4">
        {/* 6.3 #3 主CTA */}
        <a
          href={`tel:${shop.tel}`}
          className="w-full h-[52px] bg-[#1B2F8F] text-white font-bold text-[16px] rounded-md flex items-center justify-center gap-2 shadow-sm"
        >
          📞 電話で予約する
        </a>

        {/* 4.15 Stat & Action Row */}
        <div className="flex justify-between items-start mt-4">
          <div>
            <div className="flex gap-4 font-bold text-[18px]">
              <span className="text-[#D93025]">👍 {shop.stats.likes.toLocaleString()}</span>
              <span className="text-[#F5A623]">★ {shop.stats.favorites.toLocaleString()}</span>
            </div>
            <div className="text-[13px] text-[#888888] mt-1 leading-tight">
              営業時間: {shop.hours.open}〜{shop.hours.close}<br />
              定休日: {shop.closedDays}
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-[54px] h-[54px] rounded-full bg-white border border-[#E0E0E0] shadow-sm flex items-center justify-center text-[20px]">
              👍
            </button>
            <button className="w-[54px] h-[54px] rounded-full bg-white border border-[#E0E0E0] shadow-sm flex items-center justify-center text-[20px]">
              ★
            </button>
          </div>
        </div>

        {/* 4.16 Title Block */}
        <div className="mt-4">
          <h1 className="text-[20px] font-bold text-[#1B2F8F] leading-snug">{shop.name}</h1>
          <div className="text-[14px] font-bold text-[#222222] mt-2">
            {shop.area} ／ {shop.nearestStation.name} 徒歩{shop.nearestStation.walkMin}分 ／ 運営: {shop.operator}
          </div>
          <a href="#info-section" className="text-[14px] text-[#888888] inline-block mt-1">
            店舗詳細情報 ›
          </a>
        </div>

        {/* 4.17 Outline Chips */}
        <div className="flex flex-wrap gap-2 mt-3">
          {shop.tags.map((tag, i) => (
            <span
              key={i}
              className={`px-[14px] py-[6px] rounded-md text-[14px] leading-tight border-2 ${
                tag.brand
                  ? 'border-[#1B2F8F] text-[#1B2F8F] font-bold'
                  : 'border-[#888888] text-[#888888]'
              }`}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>

      {/* 区切り線（主役コンテンツ開始） */}
      <div className="border-b-4 border-[#1B2F8F]" />

      {/* 6.3 #7 セラピスト一覧 */}
      <div className="flex justify-between items-baseline px-4 pt-4 pb-2">
        <div>
          <span className="text-[17px] font-bold">セラピスト全{shop.therapists.length}名</span>
          <span className="text-[13px] text-[#888888] ml-2">
            本日出勤{shop.therapists.filter((t) => t.status !== 'off').length}名
          </span>
        </div>
      </div>

      <div className="px-2">
        {shop.therapists.map((therapist) => (
          <TherapistRow key={therapist.id} therapist={therapist} />
        ))}
      </div>

      <button className="w-[calc(100%-32px)] mx-4 my-3 h-[52px] border-2 border-[#1B2F8F] text-[#1B2F8F] font-bold text-[16px] rounded-md flex items-center justify-center">
        全{shop.therapists.length}名を表示する ›
      </button>

      {/* 中区切り */}
      <div className="border-b-2 border-[#DADADA]" />

      {/* 4.24 Price Table */}
      <div className="p-4">
        <h2 className="text-[17px] font-bold mb-3">料金・コース</h2>
        <table className="w-full border-collapse">
          <tbody>
            {shop.courses.map((course) => (
              <tr key={course.id} className="border-b border-[#E0E0E0]">
                <td className="py-3">
                  <div className="text-[14px] font-bold">{course.name}</div>
                  <div className="text-[13px] text-[#888888]">{course.minutes}分</div>
                </td>
                <td className="py-3 text-right text-[14px] font-bold">
                  {course.discountedPrice ? (
                    <>
                      <span className="line-through text-[#888888] text-[11px] mr-1">
                        ¥{course.price.toLocaleString()}
                      </span>
                      <span className="text-[#E0407F]">¥{course.discountedPrice.toLocaleString()}</span>
                    </>
                  ) : (
                    `¥${course.price.toLocaleString()}`
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-[11px] text-[#888888] mt-2">※表示価格はすべて税込です。本指名料は別途かかります。</div>
      </div>

      {/* 中区切り */}
      <div className="border-b-2 border-[#DADADA]" />

      {/* 4.23 Info Table */}
      <div className="p-4" id="info-section">
        <h2 className="text-[17px] font-bold mb-3">店舗情報</h2>
        <table className="w-full border-collapse text-[13px]">
          <tbody>
            <tr className="border-b border-[#E0E0E0]">
              <th className="w-[96px] text-left font-normal text-[#888888] py-3 vertical-top">住所</th>
              <td className="py-3">東京都渋谷区道玄坂1-XX-XX</td>
            </tr>
            <tr className="border-b border-[#E0E0E0]">
              <th className="w-[96px] text-left font-normal text-[#888888] py-3 vertical-top">アクセス</th>
              <td className="py-3">{shop.nearestStation.name} 徒歩{shop.nearestStation.walkMin}分</td>
            </tr>
            <tr className="border-b border-[#E0E0E0]">
              <th className="w-[96px] text-left font-normal text-[#888888] py-3 vertical-top">営業時間</th>
              <td className="py-3">{shop.hours.open}〜{shop.hours.close}（{shop.hours.note}）</td>
            </tr>
            <tr className="border-b border-[#E0E0E0]">
              <th className="w-[96px] text-left font-normal text-[#888888] py-3 vertical-top">届出情報</th>
              <td className="py-3">{shop.legal.registrationInfo}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 4.11 Footer */}
      <footer className="bg-[#12206A] text-white p-6 mt-6">
        <div className="grid grid-cols-2 gap-2 mb-6">
          <div className="bg-[#F4F4F4] text-[#222222] h-[60px] rounded-lg flex items-center px-3 font-bold">公式SNS</div>
          <div className="bg-[#F4F4F4] text-[#222222] h-[60px] rounded-lg flex items-center px-3 font-bold">利用ガイド</div>
        </div>
        <div className="text-[11px] text-white/70 leading-relaxed">
          当店は風営法および関係法令を順守して運営されているポータルサイトです。18歳未満の方のご利用は固くお断りいたします。<br /><br />
          © 2026 Portal Site Name All Rights Reserved.
        </div>
      </footer>

      {/* 4.22 Coupon FAB */}
      <div className="fixed right-0 bottom-[140px] w-[80px] h-[72px] bg-[#FFE234] text-[#222222] rounded-l-full shadow-lg flex flex-col items-center justify-center font-bold text-[11px] z-[80]">
        <span className="text-[18px]">🎁</span>
        <span>クーポン</span>
      </div>

      {/* 4.20 Sticky CTA */}
      <StickyCtaBar tel={shop.tel} />

      {/* 4.2 Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[720px] h-[64px] bg-white border-t border-[#E0E0E0] flex justify-around items-center z-[100] pb-[env(safe-area-inset-bottom)]">
        <Link href="/" className="flex flex-col items-center text-[#888888] text-[11px]">
          <span className="text-[20px]">🏠</span>
          <span>TOP</span>
        </Link>
        <Link href="/search" className="flex flex-col items-center text-[#1B2F8F] font-bold text-[11px]">
          <span className="text-[20px]">🔍</span>
          <span>店舗を探す</span>
        </Link>
        <Link href="/ranking" className="flex flex-col items-center text-[#888888] text-[11px]">
          <span className="text-[20px]">🏆</span>
          <span>ランキング</span>
        </Link>
        <Link href="/favorites" className="flex flex-col items-center text-[#888888] text-[11px]">
          <span className="text-[20px]">★</span>
          <span>お気に入り</span>
        </Link>
      </nav>

    </div>
  );
}