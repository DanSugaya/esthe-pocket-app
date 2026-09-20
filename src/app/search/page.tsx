"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AppBar } from "@/components/AppBar";
import { TabBar } from "@/components/TabBar";
import { SectionHeader } from "@/components/SectionHeader";

// 仮の画像関数
const image = (area: string) => "/images/placeholder.jpg";

// 画像の表示内容に合わせたダミーデータ
const shops = [
  {
    id: "aroma-shibuya",
    name: "アロマセラピーサロン 渋谷本店",
    area: "渋谷",
    station: "渋谷駅 徒歩3分",
    time: 90,
    price: 12000,
    likes: 20527,
    favorites: 9116,
    tags: ["ポータル限定", "完全個室", "駅近"],
    isPR: true,
    isBranch: false,
    isOpen: true,
    hasCoupon: true,
  },
  {
    id: "relaxation-shinjuku",
    name: "リラクゼーションSPA 新宿イースト",
    area: "新宿",
    station: "新宿駅 徒歩5分",
    time: 60,
    price: 10000,
    likes: 14200,
    favorites: 6830,
    tags: ["新店", "深夜営業"],
    isPR: false,
    isBranch: false,
    isOpen: true,
    hasCoupon: true,
  },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("すべて");

  const areas = ["東京都", "渋谷・恵比寿・代官山", "新宿・歌舞伎町", "池袋", "品川・五反田", "銀座・新橋"];

  const filtered = useMemo(
    () =>
      shops.filter(
        (shop) =>
          (area === "すべて" || shop.area === area) &&
          shop.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [area, query],
  );

  return (
    <div className="min-h-screen bg-[var(--color-bg-sub,#f5f5f5)] pb-[calc(var(--tabbar-total)+16px)]">
      <AppBar />
      <main className="mx-auto max-w-[720px] bg-white">
        <SectionHeader title="店舗を探す" />
        
        {/* 検索・絞り込みエリア */}
        <div className="space-y-3 p-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="店舗名・エリア・駅名で検索"
            aria-label="店舗名・エリア・駅名で検索"
            className="h-11 w-full rounded-full bg-[#f0f2f5] px-4 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
          <div className="flex gap-2 overflow-x-auto scrollbar-none text-xs">
            {areas.map((item, idx) => (
              <button
                key={item}
                type="button"
                className={`shrink-0 rounded-full border border-gray-200 px-3 py-1.5 font-medium ${
                  idx === 0 ? "bg-blue-50 text-blue-600 border-blue-200" : "bg-white text-gray-700"
                }`}
              >
                {item} {idx === 0 && "›"}
              </button>
            ))}
          </div>
        </div>

        {/* ソートタブ */}
        <div className="flex border-b border-gray-200 text-xs text-gray-600">
          <button type="button" className="border-b-2 border-blue-600 px-4 py-2.5 font-bold text-blue-600">おすすめ順</button>
          <button type="button" className="px-4 py-2.5">いいね順</button>
          <button type="button" className="px-4 py-2.5">★評価順</button>
          <button type="button" className="px-4 py-2.5">料金が安い順</button>
        </div>

        {/* 検索結果件数 */}
        <div className="flex justify-between px-4 py-3 text-xs text-gray-500">
          <span className="font-bold">◆ 検索結果</span>
          <span>該当 {filtered.length}件</span>
        </div>

        {/* カード一覧 */}
        <div className="space-y-4 px-4 pb-4">
          {filtered.map((shop) => (
            <div key={shop.id} className="relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <Link href={`/shops/${shop.id}`} className="flex flex-col sm:flex-row">
                {/* 左側: サムネイル画像 */}
                <div className="relative h-48 w-full shrink-0 sm:h-auto sm:w-44 bg-gray-100">
                  <Image
                    src={image(shop.area)}
                    alt={shop.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 176px"
                    className="object-cover"
                    unoptimized
                  />
                  {/* PRバッジ */}
                  {shop.isPR && (
                    <span className="absolute left-2 top-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white">
                      PR
                    </span>
                  )}
                  {/* クーポンタグ */}
                  {shop.hasCoupon && (
                    <div className="absolute bottom-0 inset-x-0 bg-amber-400 py-1 text-center text-[10px] font-bold text-gray-900">
                      👍 クーポン利用可能
                    </div>
                  )}
                </div>

                {/* 右側: 詳細情報 */}
                <div className="flex flex-1 flex-col justify-between p-3">
                  <div>
                    {/* カテゴリタグ */}
                    <div className="flex flex-wrap gap-1 mb-1.5">
                      {shop.tags.map((tag) => (
                        <span key={tag} className="rounded border border-blue-200 bg-blue-50 px-1.5 py-0.5 text-[10px] text-blue-600">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* 店舗名 */}
                    <h2 className="text-sm font-bold text-blue-700 hover:underline">
                      {shop.name}
                    </h2>

                    {/* エリア・最寄り駅 */}
                    <p className="mt-1 text-[11px] text-gray-500">
                      {shop.area} / {shop.station}
                    </p>

                    {/* 価格 */}
                    <p className="mt-2 text-xs font-bold text-gray-900">
                      {shop.time}分 <span className="text-sm font-extrabold text-blue-600">{shop.price.toLocaleString()}円〜</span>
                      <span className="text-[10px] font-normal text-gray-500">（税込）</span>
                    </p>
                  </div>

                  {/* 下部ステータス（いいね・★・営業状態） */}
                  <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-2 text-[11px] text-gray-500">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-0.5 text-rose-500">
                        👍 {shop.likes.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-0.5 text-amber-500">
                        ★ {shop.favorites.toLocaleString()}
                      </span>
                    </div>

                    {shop.isOpen && (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                        営業中
                      </span>
                    )}
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