"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  ChevronRight,
  ChevronLeft,
  MapPin,
  SlidersHorizontal,
  X,
  RotateCcw,
  Star,
  ThumbsUp,
  Gift,
  Home,
  BookOpen,
  User,
  BookMarked,
  Layers,
  Sparkles,
  Building2,
  Clock,
  ShieldCheck,
} from "lucide-react";

// --- モックデータ定義 ---
interface Shop {
  id: string;
  name: string;
  thumbnail: string;
  area: string;
  station: string;
  walkMin: number;
  minPrice: number;
  minMinutes: number;
  tags: { label: string; brand?: boolean }[];
  likes: number;
  stars: number;
  isWorkingToday: boolean;
  hasCoupon: boolean;
  isPR?: boolean;
}

const PREFECTURES = ["東京都", "神奈川県", "埼玉県", "千葉県"];

const TOKYO_AREAS = [
  "指定なし",
  "渋谷・恵比寿・代官山",
  "新宿・歌舞伎町",
  "池袋",
  "品川・五反田",
  "銀座・新橋",
  "六本木・赤坂",
];

const KANAGAWA_AREAS = ["指定なし", "横浜", "川崎", "関内・関内元町"];

const CONDITIONAL_TAGS = [
  "ポータル限定",
  "新店",
  "完全個室",
  "駅近(徒歩3分以内)",
  "深夜営業(24時以降)",
  "カード決済可",
  "シャワー完備",
  "新人多数",
];

const MOCK_SHOPS: Shop[] = [
  {
    id: "1",
    name: "アロマセラピーサロン 渋谷本店",
    thumbnail: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    area: "渋谷",
    station: "渋谷駅",
    walkMin: 3,
    minPrice: 12000,
    minMinutes: 90,
    tags: [
      { label: "ポータル限定", brand: true },
      { label: "完全個室" },
      { label: "駅近" },
    ],
    likes: 20527,
    stars: 9116,
    isWorkingToday: true,
    hasCoupon: true,
    isPR: true,
  },
  {
    id: "2",
    name: "リラクゼーションSPA 新宿イースト",
    thumbnail: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=600&q=80",
    area: "新宿",
    station: "新宿駅",
    walkMin: 5,
    minPrice: 10000,
    minMinutes: 60,
    tags: [
      { label: "新店", brand: true },
      { label: "深夜営業" },
    ],
    likes: 14200,
    stars: 6830,
    isWorkingToday: true,
    hasCoupon: true,
  },
  {
    id: "3",
    name: "プライベートサロン 池袋WEST",
    thumbnail: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80",
    area: "池袋",
    station: "池袋駅",
    walkMin: 2,
    minPrice: 15000,
    minMinutes: 90,
    tags: [
      { label: "完全個室" },
      { label: "カード決済可" },
      { label: "シャワー完備" },
    ],
    likes: 8940,
    stars: 4210,
    isWorkingToday: false,
    hasCoupon: false,
  },
  {
    id: "4",
    name: "プレミアムエステ 五反田ル・シエル",
    thumbnail: "https://images.unsplash.com/photo-1591343393572-370433370438?auto=format&fit=crop&w=600&q=80",
    area: "品川・五反田",
    station: "五反田駅",
    walkMin: 4,
    minPrice: 13000,
    minMinutes: 80,
    tags: [
      { label: "ポータル限定", brand: true },
      { label: "新人多数" },
    ],
    likes: 11050,
    stars: 5320,
    isWorkingToday: true,
    hasCoupon: true,
  },
];

export default function SearchPage() {
  // フィルター状態
  const [selectedPref, setSelectedPref] = useState("東京都");
  const [selectedArea, setSelectedArea] = useState("指定なし");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [keyword, setKeyword] = useState("");
  const [sortOption, setSortOption] = useState<"recommend" | "likes" | "stars" | "price_asc">("recommend");

  // ボトムシート開閉
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // タグトグル処理
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // 条件リセット
  const resetFilters = () => {
    setSelectedPref("東京都");
    setSelectedArea("指定なし");
    setSelectedTags([]);
    setKeyword("");
    setSortOption("recommend");
  };

  // エリア選択肢の動的切替
  const areaOptions = selectedPref === "東京都" ? TOKYO_AREAS : selectedPref === "神奈川県" ? KANAGAWA_AREAS : ["指定なし"];

  // 適用済みアクティブフィルター件数
  const activeFilterCount =
    (selectedArea !== "指定なし" ? 1 : 0) +
    selectedTags.length +
    (keyword.trim() !== "" ? 1 : 0);

  return (
    <div className="min-h-screen bg-white text-[#222222] font-sans pb-[100px] md:pb-12 pt-[56px] antialiased">
      {/* 4.1 App Bar (固定・primary) */}
      <header className="fixed top-0 left-0 right-0 h-[56px] bg-[#1B2F8F] text-white z-40 flex items-center justify-between px-4 shadow-sm">
        <div className="flex items-center space-x-2">
          <Link href="/" className="p-1 -ml-1 text-white hover:opacity-80 transition-opacity">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="font-bold text-[18px] tracking-wide">店舗を探す</h1>
        </div>
        <button
          onClick={() => setIsBottomSheetOpen(true)}
          className="relative p-2 text-white hover:opacity-80 transition-opacity"
          aria-label="条件絞り込み"
        >
          <SlidersHorizontal size={22} />
          {activeFilterCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#E0407F] rounded-full border-2 border-[#1B2F8F]" />
          )}
        </button>
      </header>

      {/* メインコンテンツコンテナ */}
      <main className="max-w-[720px] mx-auto px-4 pt-4">
        {/* 4.12 Form / Search - キーワード＆クイック検索バー */}
        <section className="mb-4">
          <div className="relative flex items-center">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="店舗名・エリア・駅名で検索"
              className="w-full h-[44px] bg-[#F4F4F4] text-[#222222] text-[14px] rounded-full pl-11 pr-10 focus:outline-none focus:ring-2 focus:ring-[#1B2F8F] transition-all placeholder:text-[#888888]"
            />
            <Search className="absolute left-4 text-[#888888] pointer-events-none" size={18} />
            {keyword && (
              <button
                onClick={() => setKeyword("")}
                className="absolute right-3 p-1 text-[#888888] hover:text-[#222222]"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </section>

        {/* クイックエリア選択 (チップ横スクロール) */}
        <section className="mb-4">
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setIsBottomSheetOpen(true)}
              className="flex-shrink-0 flex items-center space-x-1 h-[34px] px-3 bg-[#E8ECFA] text-[#1B2F8F] rounded-full text-[13px] font-bold border border-[#1B2F8F]/20"
            >
              <MapPin size={14} />
              <span>{selectedArea === "指定なし" ? `${selectedPref}` : selectedArea}</span>
              <ChevronRight size={14} />
            </button>
            {areaOptions
              .filter((a) => a !== "指定なし")
              .map((area) => {
                const isSelected = selectedArea === area;
                return (
                  <button
                    key={area}
                    onClick={() => setSelectedArea(isSelected ? "指定なし" : area)}
                    className={`flex-shrink-0 h-[34px] px-3.5 rounded-full text-[13px] transition-colors ${
                      isSelected
                        ? "bg-[#1B2F8F] text-white font-bold"
                        : "bg-[#F4F4F4] text-[#222222] hover:bg-[#E0E0E0]"
                    }`}
                  >
                    {area}
                  </button>
                );
              })}
          </div>
        </section>

        {/* 絞り込み条件チップ表示 (アクティブ条件がある場合) */}
        {activeFilterCount > 0 && (
          <section className="mb-4 pb-3 border-b border-[#E0E0E0]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#888888] font-bold">現在の検索条件</span>
              <button
                onClick={resetFilters}
                className="flex items-center text-[12px] text-[#1B2F8F] font-bold hover:underline"
              >
                <RotateCcw size={12} className="mr-1" />
                条件をクリア
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedArea !== "指定なし" && (
                <span className="inline-flex items-center h-[28px] px-3 bg-[#E8ECFA] text-[#1B2F8F] text-[12px] font-bold rounded-full">
                  {selectedPref} › {selectedArea}
                  <button onClick={() => setSelectedArea("指定なし")} className="ml-1.5 hover:opacity-75">
                    <X size={12} />
                  </button>
                </span>
              )}
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center h-[28px] px-3 bg-[#E8ECFA] text-[#1B2F8F] text-[12px] font-bold rounded-full"
                >
                  {tag}
                  <button onClick={() => toggleTag(tag)} className="ml-1.5 hover:opacity-75">
                    <X size={12} />
                  </button>
                </span>
              ))}
              {keyword.trim() !== "" && (
                <span className="inline-flex items-center h-[28px] px-3 bg-[#E8ECFA] text-[#1B2F8F] text-[12px] font-bold rounded-full">
                  キーワード: {keyword}
                  <button onClick={() => setKeyword("")} className="ml-1.5 hover:opacity-75">
                    <X size={12} />
                  </button>
                </span>
              )}
            </div>
          </section>
        )}

        {/* 4.10 Tabs / ソート順選択 */}
        <section className="mb-4 border-b border-[#E0E0E0]">
          <div className="flex items-center space-x-6 overflow-x-auto no-scrollbar">
            {[
              { id: "recommend", label: "おすすめ順" },
              { id: "likes", label: "いいね順" },
              { id: "stars", label: "★評価順" },
              { id: "price_asc", label: "料金が安い順" },
            ].map((tab) => {
              const isActive = sortOption === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSortOption(tab.id as typeof sortOption)}
                  className={`pb-2.5 text-[14px] whitespace-nowrap transition-colors relative ${
                    isActive
                      ? "font-bold text-[#1B2F8F]"
                      : "text-[#888888] hover:text-[#222222]"
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#1B2F8F] rounded-t-full" />
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* 4.3 Section Header - 件数表示 */}
        <div className="flex items-center justify-between mb-3 pb-1 border-b border-[#E0E0E0]">
          <div className="flex items-center space-x-1.5">
            <span className="text-[#1B2F8F] text-[16px]">◆</span>
            <h2 className="font-bold text-[17px] text-[#222222]">検索結果</h2>
          </div>
          <span className="text-[13px] text-[#888888]">
            該当 <strong className="text-[#1B2F8F] text-[15px] tabular-nums">{MOCK_SHOPS.length}</strong> 件
          </span>
        </div>

        {/* 店舗一覧リスト (4.18 / 4.6 準拠レイアウト) */}
        <section className="space-y-4">
          {MOCK_SHOPS.map((shop) => (
            <article
              key={shop.id}
              className="relative bg-white border border-[#E0E0E0] rounded-[12px] overflow-hidden hover:border-[#1B2F8F] transition-all group"
            >
              {/* 4.28 PR表記 */}
              {shop.isPR && (
                <div className="absolute top-2 left-2 z-10 bg-black/60 text-white font-bold text-[10px] px-1.5 py-0.5 rounded-[4px]">
                  PR
                </div>
              )}

              <Link href={`/shops/${shop.id}`} className="block">
                <div className="flex flex-col sm:flex-row">
                  {/* サムネイル画像 (16:9 相当) */}
                  <div className="relative w-full sm:w-[220px] h-[140px] sm:h-auto flex-shrink-0 bg-[#F4F4F4]">
                    <img
                      src={shop.thumbnail}
                      alt={shop.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    {shop.hasCoupon && (
                      <div className="absolute bottom-0 left-0 right-0 bg-[#FFE234] text-[#222222] font-bold text-[11px] h-[20px] flex items-center justify-center space-x-1">
                        <Gift size={12} />
                        <span>クーポン利用可能</span>
                      </div>
                    )}
                  </div>

                  {/* 店舗コンテンツ詳細 */}
                  <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* 4.17 Outline Chips */}
                      <div className="flex flex-wrap gap-1.5 mb-1.5">
                        {shop.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className={`text-[11px] px-2 py-0.5 rounded-[4px] border ${
                              tag.brand
                                ? "border-[#1B2F8F] text-[#1B2F8F] font-bold"
                                : "border-[#888888] text-[#888888]"
                            }`}
                          >
                            {tag.label}
                          </span>
                        ))}
                      </div>

                      {/* 4.16 店舗名 (青・太字) */}
                      <h3 className="font-bold text-[16px] text-[#1B2F8F] line-clamp-1 mb-1 group-hover:underline">
                        {shop.name}
                      </h3>

                      {/* メタ情報 (エリア / 最寄駅 / 料金) */}
                      <p className="text-[13px] text-[#888888] mb-2 line-clamp-1">
                        {shop.area} ／ {shop.station} 徒歩{shop.walkMin}分
                      </p>

                      <div className="text-[14px] text-[#222222] font-bold">
                        {shop.minMinutes}分{" "}
                        <span className="text-[#1B2F8F] text-[16px] tabular-nums">
                          {shop.minPrice.toLocaleString()}円〜
                        </span>
                        <span className="text-[11px] text-[#888888] font-normal ml-1">(税込)</span>
                      </div>
                    </div>

                    {/* 下段: ステータス & 指標 (いいね / ★) */}
                    <div className="mt-3 pt-2 border-t border-[#E0E0E0] flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-[12px] text-[#888888]">
                        <span className="flex items-center font-bold text-[#D93025]">
                          <ThumbsUp size={13} className="mr-1" />
                          <span className="tabular-nums">{shop.likes.toLocaleString()}</span>
                        </span>
                        <span className="flex items-center font-bold text-[#F5A623]">
                          <Star size={13} className="mr-1 fill-[#F5A623]" />
                          <span className="tabular-nums">{shop.stars.toLocaleString()}</span>
                        </span>
                      </div>

                      {/* 4.19 Status Circle (小バッジ表示) */}
                      <div>
                        {shop.isWorkingToday ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#2E9E5B] text-white text-[11px] font-bold">
                            営業中
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#BDBDBD] text-white text-[11px] font-bold">
                            受付終了
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </section>

        {/* 4.9 Primary Button - もっと読み込む */}
        <div className="mt-8">
          <button className="w-full h-[52px] bg-[#1B2F8F] hover:bg-[#12206A] text-white font-bold text-[16px] rounded-[8px] flex items-center justify-center transition-colors">
            さらに店舗を表示する
            <ChevronRight size={20} className="ml-1" />
          </button>
        </div>
      </main>

      {/* 4.12 ボトムシート (絞り込みモーダル) */}
      {isBottomSheetOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 transition-opacity">
          <div className="w-full max-w-[720px] bg-white rounded-t-[16px] max-h-[85vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-250">
            {/* ヘッダー */}
            <div className="h-[56px] px-4 border-b border-[#E0E0E0] flex items-center justify-between flex-shrink-0">
              <h3 className="font-bold text-[17px] text-[#222222]">絞り込み検索</h3>
              <button
                onClick={() => setIsBottomSheetOpen(false)}
                className="p-2 text-[#888888] hover:text-[#222222]"
              >
                <X size={20} />
              </button>
            </div>

            {/* モーダルコンテンツ */}
            <div className="p-4 overflow-y-auto space-y-6 flex-1">
              {/* 都道府県選択 */}
              <div>
                <label className="block text-[13px] font-bold text-[#888888] mb-2">エリア (都道府県)</label>
                <div className="grid grid-cols-2 gap-2">
                  {PREFECTURES.map((pref) => (
                    <button
                      key={pref}
                      onClick={() => {
                        setSelectedPref(pref);
                        setSelectedArea("指定なし");
                      }}
                      className={`h-[40px] rounded-[8px] text-[14px] font-bold transition-colors ${
                        selectedPref === pref
                          ? "bg-[#1B2F8F] text-white"
                          : "bg-[#F4F4F4] text-[#222222] hover:bg-[#E0E0E0]"
                      }`}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </div>

              {/* 詳細エリア選択 */}
              <div>
                <label className="block text-[13px] font-bold text-[#888888] mb-2">詳細エリア ({selectedPref})</label>
                <div className="grid grid-cols-2 gap-2">
                  {areaOptions.map((area) => (
                    <button
                      key={area}
                      onClick={() => setSelectedArea(area)}
                      className={`h-[40px] px-2 rounded-[8px] text-[13px] transition-colors truncate ${
                        selectedArea === area
                          ? "bg-[#E8ECFA] border-2 border-[#1B2F8F] text-[#1B2F8F] font-bold"
                          : "bg-[#F4F4F4] text-[#222222] hover:bg-[#E0E0E0]"
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              {/* こだわり条件 (タグ) */}
              <div>
                <label className="block text-[13px] font-bold text-[#888888] mb-2">こだわり条件</label>
                <div className="flex flex-wrap gap-2">
                  {CONDITIONAL_TAGS.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`h-[36px] px-3.5 rounded-full text-[13px] transition-colors ${
                          isSelected
                            ? "bg-[#1B2F8F] text-white font-bold"
                            : "bg-[#F4F4F4] text-[#222222] border border-[#E0E0E0] hover:bg-[#E0E0E0]"
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* フッターアクション */}
            <div className="p-4 border-t border-[#E0E0E0] flex items-center space-x-3 flex-shrink-0 bg-white">
              <button
                onClick={resetFilters}
                className="w-1/3 h-[48px] bg-[#F4F4F4] text-[#222222] font-bold text-[14px] rounded-[8px] hover:bg-[#E0E0E0] transition-colors"
              >
                クリア
              </button>
              <button
                onClick={() => setIsBottomSheetOpen(false)}
                className="w-2/3 h-[48px] bg-[#1B2F8F] text-white font-bold text-[15px] rounded-[8px] hover:bg-[#12206A] transition-colors"
              >
                この条件で検索
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4.2 Bottom Tab Bar (固定・64px) */}
      <nav className="fixed bottom-0 left-0 right-0 h-[64px] bg-white border-t border-[#E0E0E0] z-40 flex items-center justify-around px-2 pb-[env(safe-area-inset-bottom)]">
        <Link href="/" className="flex flex-col items-center justify-center text-[#888888] hover:text-[#1B2F8F]">
          <Home size={22} />
          <span className="text-[11px] font-medium mt-1">TOP</span>
        </Link>
        <Link href="/search" className="flex flex-col items-center justify-center text-[#1B2F8F]">
          <Search size={22} />
          <span className="text-[11px] font-medium mt-1">店舗を探す</span>
        </Link>
        <Link href="/ranking" className="flex flex-col items-center justify-center text-[#888888] hover:text-[#1B2F8F]">
          <BookOpen size={22} />
          <span className="text-[11px] font-medium mt-1">ランキング</span>
        </Link>
        <Link href="/favorites" className="flex flex-col items-center justify-center text-[#888888] hover:text-[#1B2F8F]">
          <Star size={22} />
          <span className="text-[11px] font-medium mt-1">お気に入り</span>
        </Link>
        <Link href="/mypage" className="flex flex-col items-center justify-center text-[#888888] hover:text-[#1B2F8F]">
          <User size={22} />
          <span className="text-[11px] font-medium mt-1">マイページ</span>
        </Link>
      </nav>
    </div>
  );
}