"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

// ダミーデータ
const recommendTherapists = [
  { id: "1", name: "セラピスト A", store: "渋谷店" },
  { id: "2", name: "セラピスト B", store: "新宿店" },
  { id: "3", name: "セラピスト C", store: "池袋店" },
];

export const RecommendRow = () => {
  return (
    <div className="py-4">
      <h3 className="px-4 text-xs font-bold text-gray-500 mb-3">おすすめのセラピスト</h3>
      <div className="flex gap-3 overflow-x-auto px-4 scrollbar-none">
        {recommendTherapists.map((item) => (
          <Link
            key={item.id}
            href={`/therapist/${item.id}`}
            className="flex-shrink-0 w-24 text-center"
          >
            <div className="relative h-24 w-24 rounded-full overflow-hidden bg-gray-200 mb-1 border border-gray-100">
              <Image
                src="/images/placeholder.jpg"
                alt={item.name}
                fill
                sizes="96px"
                className="object-cover"
                unoptimized
              />
            </div>
            <p className="text-xs font-bold text-gray-800 truncate">{item.name}</p>
            <p className="text-[10px] text-gray-400 truncate">{item.store}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};