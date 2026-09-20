"use client";

import React from "react";
import { useRouter } from "next/navigation";

export const DetailAppBar = ({ title }: { title?: string }) => {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 flex h-12 w-full items-center justify-between border-b border-gray-200 bg-white px-4">
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="戻る"
        className="flex items-center text-gray-700 hover:text-gray-900"
      >
        <span className="text-xl">←</span>
      </button>
      {title && <h1 className="text-sm font-bold text-gray-900 truncate">{title}</h1>}
      <div className="w-6" /> {/* 左右のバランスを保つための空枠 */}
    </header>
  );
};