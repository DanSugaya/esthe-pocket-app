"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, Share2 } from "lucide-react";

interface DetailAppBarClientProps {
  shopName: string;
  sentinelRef: React.RefObject<HTMLDivElement>;
  onBack?: () => void;
}

export const DetailAppBarClient: React.FC<DetailAppBarClientProps> = ({
  shopName,
  sentinelRef,
  onBack,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const sentinelEl = sentinelRef.current;
    if (!sentinelEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // 番兵要素が画面外（上部）に消えたらヘッダー背景を有効化
        setIsScrolled(!entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "-56px 0px 0px 0px", // ヘッダー高さ(56px)分ずらして判定
        threshold: 0,
      }
    );

    observer.observe(sentinelEl);

    return () => {
      observer.disconnect();
    };
  }, [sentinelRef]);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: shopName,
      url: typeof window !== "undefined" ? window.location.href : "",
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // ユーザーキャンセルなどの例外ハンドリング（必要に応じて拡張）
      }
    } else {
      // フォールバック: URLコピー
      try {
        await navigator.clipboard.writeText(shareData.url);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      } catch (err) {
        console.error("Failed to copy URL:", err);
      }
    }
  };

  return (
    <>
      <header
        aria-label="店舗ヘッダー"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "var(--header-h, 56px)",
          zIndex: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: "var(--space-4, 16px)",
          paddingRight: "var(--space-4, 16px)",
          backgroundColor: isScrolled ? "var(--color-primary, #1B2F8F)" : "transparent",
          transition: "background-color 150ms ease",
        }}
      >
        {/* 戻るボタン */}
        <button
          type="button"
          onClick={handleBack}
          aria-label="前のページへ戻る"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "var(--radius-circle, 50%)",
            backgroundColor: isScrolled ? "transparent" : "var(--color-scrim, rgba(0,0,0,0.35))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            color: "#FFFFFF",
            cursor: "pointer",
            transition: "background-color 150ms ease",
          }}
        >
          <ChevronLeft size={24} aria-hidden="true" />
        </button>

        {/* 店舗名 (スクロール時のみフェードイン表示) */}
        <div
          style={{
            flex: 1,
            marginLeft: "var(--space-3, 12px)",
            marginRight: "var(--space-3, 12px)",
            textAlign: "center",
            opacity: isScrolled ? 1 : 0,
            transition: "opacity 150ms ease",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            color: "#FFFFFF",
            fontSize: "14px",
            lineHeight: "1.4",
            fontWeight: 700,
          }}
        >
          {shopName}
        </div>

        {/* シェアボタン */}
        <button
          type="button"
          onClick={handleShare}
          aria-label="この店舗情報をシェア"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "var(--radius-circle, 50%)",
            backgroundColor: isScrolled ? "transparent" : "var(--color-scrim, rgba(0,0,0,0.35))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            color: "#FFFFFF",
            cursor: "pointer",
            transition: "background-color 150ms ease",
          }}
        >
          <Share2 size={22} aria-hidden="true" />
        </button>
      </header>

      {/* URLコピー時のトースト通知 */}
      {showToast && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: "fixed",
            bottom: "calc(var(--tabbar-h, 64px) + 24px)",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "rgba(34, 34, 34, 0.9)",
            color: "#FFFFFF",
            padding: "8px 16px",
            borderRadius: "var(--radius-pill, 999px)",
            fontSize: "13px",
            fontWeight: 500,
            zIndex: 50,
            pointerEvents: "none",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          URLをコピーしました
        </div>
      )}
    </>
  );
};