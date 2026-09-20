"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, Share2 } from "lucide-react";

interface DetailAppBarClientProps {
  title: string;
  sentinelRef?: React.RefObject<HTMLDivElement | null>;
  onBack?: () => void;
}

export const DetailAppBarClient: React.FC<DetailAppBarClientProps> = ({
  title,
  sentinelRef,
  onBack,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const fallbackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const targetEl = sentinelRef?.current || fallbackRef.current;
    if (!targetEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "-56px 0px 0px 0px",
        threshold: 0,
      }
    );

    observer.observe(targetEl);

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
      title,
      url: typeof window !== "undefined" ? window.location.href : "",
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // キャンセル処理
      }
    } else {
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
        aria-label="ヘッダー"
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
          {title}
        </div>

        <button
          type="button"
          onClick={handleShare}
          aria-label="情報をシェア"
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

export default DetailAppBarClient;