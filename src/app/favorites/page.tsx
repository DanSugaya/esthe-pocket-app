"use client";

import React, { useState } from "react";
import { 
  Search, 
  Trash2, 
  ThumbsUp, 
  ChevronRight, 
  Home, 
  BookOpen, 
  Library, 
  User, 
  BookMarked,
  MoreHorizontal
} from "lucide-react";

type TabType = "favorites" | "purchases" | "history";

interface FavoriteItem {
  id: string;
  title: string;
  updateInfo: string;
  badgeText?: string;
  badgeDate?: string;
  statusText?: string;
  isCompleted?: boolean;
  imageUrl: string;
  likes: number;
}

const FAVORITE_ITEMS: FavoriteItem[] = [
  {
    id: "1",
    title: "信じていた仲間達にダンジョン奥地で殺されかけたがギフト『無限ガチャ』でレベル9999の仲間達を手に入れて復讐＆ざまぁ！",
    updateInfo: "最新話：毎週火曜 / 無料話：毎週火曜",
    badgeText: "今だけ！3巻分無料！",
    badgeDate: "12/20(日)まで",
    statusText: "チャージ完了！",
    imageUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300&h=200&fit=crop",
    likes: 20527,
  },
  {
    id: "2",
    title: "ハナバス 苔石花江のバスケ論",
    updateInfo: "最新話：毎週木曜 / 無料話：毎週木曜",
    statusText: "あと22時間16分",
    imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=300&h=200&fit=crop",
    likes: 9116,
  },
];

export default function FavoritesPage() {
  const [activeTab, setActiveTab] = useState<TabType>("favorites");

  return (
    <div className="min-h-screen bg-white text-[#222222] pb-[calc(64px+env(safe-area-inset-bottom))] max-w-[720px] mx-auto relative shadow-sm">
      {/* App Bar */}
      <header className="sticky top-0 z-40 h-[56px] bg-[#1B2F8F] text-white flex items-center justify-between px-4">
        <h1 className="text-[20px] font-bold tracking-wide">本棚</h1>
        <button 
          type="button" 
          aria-label="検索" 
          className="w-11 h-11 flex items-center justify-end text-white hover:opacity-80 transition-opacity"
        >
          <Search className="w-6 h-6" />
        </button>
      </header>

      {/* Tabs */}
      <nav aria-label="本棚カテゴリー" className="border-b border-[#E0E0E0] bg-white sticky top-[56px] z-30">
        <ul className="flex h-[48px]">
          <li className="flex-1">
            <button
              type="button"
              onClick={() => setActiveTab("favorites")}
              className={`w-full h-full text-[14px] font-bold flex items-center justify-center relative transition-colors ${
                activeTab === "favorites" ? "text-[#1B2F8F]" : "text-[#888888]"
              }`}
            >
              お気に入り
              {activeTab === "favorites" && (
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#1B2F8F]" />
              )}
            </button>
          </li>
          <li className="flex-1">
            <button
              type="button"
              onClick={() => setActiveTab("purchases")}
              className={`w-full h-full text-[14px] font-bold flex items-center justify-center relative transition-colors ${
                activeTab === "purchases" ? "text-[#1B2F8F]" : "text-[#888888]"
              }`}
            >
              購入作品
              {activeTab === "purchases" && (
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#1B2F8F]" />
              )}
            </button>
          </li>
          <li className="flex-1">
            <button
              type="button"
              onClick={() => setActiveTab("history")}
              className={`w-full h-full text-[14px] font-bold flex items-center justify-center relative transition-colors ${
                activeTab === "history" ? "text-[#1B2F8F]" : "text-[#888888]"
              }`}
            >
              閲覧履歴
              {activeTab === "history" && (
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#1B2F8F]" />
              )}
            </button>
          </li>
        </ul>
      </nav>

      {/* Tab Content */}
      <main>
        {activeTab === "favorites" && (
          <section aria-label="お気に入り一覧">
            <ul className="divide-y divide-[#E0E0E0]">
              {FAVORITE_ITEMS.map((item) => (
                <li key={item.id} className="p-3">
                  <div className="flex gap-3">
                    {/* Thumbnail Block */}
                    <div className="relative w-[134px] h-[80px] flex-shrink-0 rounded-[4px] overflow-hidden border border-[#E0E0E0] bg-[#F4F4F4]">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {/* Campaign Overlay Badge */}
                      {item.badgeText && (
                        <div className="absolute inset-x-0 bottom-6 bg-[#D93025] text-white text-[11px] font-bold py-0.5 px-1 text-center leading-none">
                          {item.badgeText}
                          {item.badgeDate && (
                            <span className="block text-[9px] font-normal scale-90">
                              {item.badgeDate}
                            </span>
                          )}
                        </div>
                      )}
                      {/* Label Strip */}
                      <div className="absolute inset-x-0 bottom-0 bg-[#1B2F8F] text-white text-[10px] font-bold py-0.5 text-center leading-none">
                        マガポケ オリジナル
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h2 className="text-[14px] font-bold text-[#222222] truncate leading-tight">
                            {item.title}
                          </h2>
                          <button
                            type="button"
                            aria-label="メニュー"
                            className="text-[#888888] hover:text-[#222222] p-0.5 -mr-1"
                          >
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                        </div>
                        <p className="text-[12px] text-[#888888] truncate mt-1">
                          {item.updateInfo}
                        </p>
                      </div>

                      {/* Bottom Status & Like Row */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1.5 text-[12px] text-[#222222]">
                          {item.statusText && (
                            <span className="inline-flex items-center font-bold text-[#2E9E5B]">
                              <span className="w-2 h-2 rounded-full bg-[#2E9E5B] mr-1 inline-block" />
                              {item.statusText}
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          aria-label="いいね"
                          className="w-9 h-9 rounded-full border border-[#E0E0E0] bg-white flex items-center justify-center text-[#D93025] shadow-[0_2px_6px_rgba(0,0,0,0.15)] active:scale-95 transition-transform"
                        >
                          <ThumbsUp className="w-5 h-5 fill-current" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {activeTab === "purchases" && (
          <section aria-label="購入作品一覧" className="py-20 text-center">
            <p className="text-[14px] text-[#888888]">購入履歴はありません。</p>
          </section>
        )}

        {activeTab === "history" && (
          <section aria-label="閲覧履歴一覧">
            <div className="flex justify-end px-4 py-2 border-b border-[#E0E0E0]">
              <button 
                type="button" 
                aria-label="履歴を削除" 
                className="text-[#888888] hover:text-[#D93025] transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            <ul className="divide-y divide-[#E0E0E0]">
              {FAVORITE_ITEMS.map((item) => (
                <li key={item.id} className="p-3">
                  <div className="flex gap-3">
                    <div className="relative w-[134px] h-[80px] flex-shrink-0 rounded-[4px] overflow-hidden border border-[#E0E0E0] bg-[#F4F4F4]">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div>
                        <h2 className="text-[14px] font-bold text-[#222222] truncate leading-tight">
                          {item.title}
                        </h2>
                        <p className="text-[12px] text-[#888888] mt-1">2026/09/20 閲覧</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      {/* Bottom Tab Bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E0E0E0] h-[64px] pb-[env(safe-area-inset-bottom)] max-w-[720px] mx-auto">
        <ul className="flex h-full items-center justify-around">
          <li>
            <a href="#" className="flex flex-col items-center gap-0.5 text-[#888888] hover:text-[#1B2F8F]">
              <Home className="w-6 h-6" />
              <span className="text-[11px] font-medium">TOP</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex flex-col items-center gap-0.5 text-[#888888] hover:text-[#1B2F8F]">
              <BookOpen className="w-6 h-6" />
              <span className="text-[11px] font-medium">連載</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex flex-col items-center gap-0.5 text-[#1B2F8F]">
              <Library className="w-6 h-6" />
              <span className="text-[11px] font-medium font-bold">本棚</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex flex-col items-center gap-0.5 text-[#888888] hover:text-[#1B2F8F]">
              <User className="w-6 h-6" />
              <span className="text-[11px] font-medium">マイページ</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex flex-col items-center gap-0.5 text-[#888888] hover:text-[#1B2F8F]">
              <BookMarked className="w-6 h-6" />
              <span className="text-[11px] font-medium">マガジン</span>
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}