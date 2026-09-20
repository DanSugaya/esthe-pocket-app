"use client";

import React from "react";

export const StickyCtaBar = () => {
  return (
    <div className="fixed bottom-0 left-0 z-40 w-full border-t border-gray-200 bg-white px-4 py-3 pb-[calc(env(safe-area-inset-bottom)+12px)] shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      <div className="mx-auto flex max-w-[720px] gap-3">
        <button
          type="button"
          className="w-full rounded-full bg-[var(--color-primary,#1e3a8a)] py-3.5 text-center font-bold text-white shadow-sm transition-opacity hover:opacity-90 active:opacity-100"
        >
          電話で指名予約する
        </button>
      </div>
    </div>
  );
};