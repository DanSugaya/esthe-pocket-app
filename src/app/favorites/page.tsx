"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AppBar } from "@/components/AppBar";
import { TabBar } from "@/components/TabBar";

// 仮の画像関数
const image = (id: string) => "/images/placeholder.jpg";

// エステサロン仕様のお気に入りダミーデータ
const favoriteShops = [
  {
    id: "aroma-shibuya",
    title: "アロマセラピーサロン 渋谷本店",
    badgeText: "初回限定 30%OFF!",
    badgeSubText: "9/30(水)まで",
    label: "完全個室アロマ",
    latestInfo: "空き枠情報：本日 18:00〜 空きあり",
    statusText: "クーポン獲得済み！",
    statusColor: "text-pink-600",
    hasLike: true,
  },
  {
    id: "spa-shinjuku",
    title: "リラクゼーションSPA 新宿イースト",
    badgeText: "",
    label: "メンズセラピー",
    latestInfo: "空き枠情報：明日 14:00〜 空きあり",
    statusText: "次回予約可能まで あと22時間",
    statusColor: "text-emerald-600",
    hasLike: true,
  },
];

export default function FavoritesPage() {
  const [activeTab, setActiveTab] = useState("お気に入り");

  const tabs = ["お気に入り", "予約済み", "閲覧履歴"];

  return (
    <div className="min-h-screen bg-gray-50 pb-[calc(var(--tabbar-total)+16px)]">
      <AppBar />
      <main className="mx-auto max-w-[720px] bg-white">
        {/* ヘッダータイトル */}
        <div className="flex h-12 items-center justify-between border-b border-gray-200 px-4 bg-[var(--color-primary,#1e3a8a)] text-white font-bold">
          <span>お気に入りサロン</span>
          <button type="button" aria-label="検索" className="p-1">
            🔍
          </button>
        </div>

        {/* タブ切替 */}
        <div className="flex border-b border-gray-200 text-xs font-bold text-gray-600">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-center transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* サロンリスト表示 */}
        <div className="divide-y divide-gray-100">
          {favoriteShops.map((item) => (
            <div key={item.id} className="p-3">
              <Link href={`/shops/${item.id}`} className="flex gap-3">
                {/* サムネイル画像エリア */}
                <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded bg-gray-200">
                  <Image
                    src={image(item.id)}
                    alt={item.title}
                    fill
                    sizes="112px"
                    className="object-cover"
                    unoptimized
                  />
                  {/* キャンペーン・クーポンバッジ */}
                  {item.badgeText && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-rose-600/90 text-center text-white p-1">
                      <span className="text-[10px] font-bold leading-tight">{item.badgeText}</span>
                      {item.badgeSubText && (
                        <span className="text-[8px] opacity-90">{item.badgeSubText}</span>
                      )}
                    </div>
                  )}
                  {/* サロンカテゴリ（左下黒ラベル） */}
                  {item.label && (
                    <span className="absolute bottom-0 inset-x-0 bg-black/70 py-0.5 text-center text-[8px] text-white">
                      {item.label}
                    </span>
                  )}
                </div>

                {/* 右側詳細情報 */}
                <div className="flex flex-1 flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h2 className="line-clamp-2 text-xs font-bold text-gray-900 leading-snug">
                        {item.title}
                      </h2>
                      <button type="button" aria-label="メニュー" className="text-gray-400 hover:text-gray-600 px-1 text-xs">
                        •••
                      </button>
                    </div>
                    <p className="mt-1 text-[10px] text-gray-500">
                      {item.latestInfo}
                    </p>
                  </div>

                  {/* ステータス & いいねボタン */}
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-[11px] font-bold ${item.statusColor}`}>
                      ● {item.statusText}
                    </span>
                    <button type="button" aria-label="お気に入り解除" className="text-rose-500 text-sm">
                      👍
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
      <TabBar />
    </div>
  );
}