// src/app/shops/[id]/ClientInteractiveUI.tsx
"use client";

import React from "react";
import type { Shop } from "./page"; // 必要に応じて型をインポート

export function ClientInteractiveUI({ shop }: { shop: Shop }) {
  const [isHeaderScrolled, setIsHeaderScrolled] = React.useState(false);

  // ヘッダー切り替え、いいね/お気に入り、Sticky CTAなどの状態・対話処理
  return (
    <div>
      {/* Client Component としてのUI処理 */}
    </div>
  );
}