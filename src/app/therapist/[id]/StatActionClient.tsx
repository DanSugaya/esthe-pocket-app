"use client";

import React, { useState, useTransition } from "react";

interface StatActionClientProps {
  initialLikes: number;
  initialFavorites: number;
  isLikedInitial?: boolean;
  isFavoritedInitial?: boolean;
  isLoggedIn?: boolean;
  onRequireLogin?: () => void;
  onToggleLike?: (nextState: boolean) => Promise<void>;
  onToggleFavorite?: (nextState: boolean) => Promise<void>;
}

export const StatActionClient: React.FC<StatActionClientProps> = ({
  initialLikes,
  initialFavorites,
  isLikedInitial = false,
  isFavoritedInitial = false,
  isLoggedIn = false,
  onRequireLogin,
  onToggleLike,
  onToggleFavorite,
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(isLikedInitial);
  const [likesCount, setLikesCount] = useState<number>(initialLikes);
  const [isFavorited, setIsFavorited] = useState<boolean>(isFavoritedInitial);
  const [favoritesCount, setFavoritesCount] = useState<number>(initialFavorites);

  const [isLikeAnimating, setIsLikeAnimating] = useState<boolean>(false);
  const [isFavAnimating, setIsFavAnimating] = useState<boolean>(false);

  const [, startTransition] = useTransition();

  const handleLikeClick = () => {
    if (!isLoggedIn) {
      onRequireLogin?.();
      return;
    }

    const nextState = !isLiked;
    const prevLiked = isLiked;
    const prevCount = likesCount;

    // 楽観的更新
    setIsLiked(nextState);
    setLikesCount((prev) => (nextState ? prev + 1 : prev - 1));
    setIsLikeAnimating(true);
    setTimeout(() => setIsLikeAnimating(false), 200);

    startTransition(async () => {
      try {
        if (onToggleLike) {
          await onToggleLike(nextState);
        }
      } catch (error) {
        // 失敗時にロールバック
        setIsLiked(prevLiked);
        setLikesCount(prevCount);
      }
    });
  };

  const handleFavoriteClick = () => {
    if (!isLoggedIn) {
      onRequireLogin?.();
      return;
    }

    const nextState = !isFavorited;
    const prevFavorited = isFavorited;
    const prevCount = favoritesCount;

    // 楽観的更新
    setIsFavorited(nextState);
    setFavoritesCount((prev) => (nextState ? prev + 1 : prev - 1));
    setIsFavAnimating(true);
    setTimeout(() => setIsFavAnimating(false), 200);

    startTransition(async () => {
      try {
        if (onToggleFavorite) {
          await onToggleFavorite(nextState);
        }
      } catch (error) {
        // 失敗時にロールバック
        setIsFavorited(prevFavorited);
        setFavoritesCount(prevCount);
      }
    });
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-[#E0E0E0]">
      {/* 左側: 指標表示と補足情報 */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="text-[#D93025] text-[18px]" aria-hidden="true">
              👍
            </span>
            <span className="font-bold text-[18px] text-[#222222] tabular-nums">
              {likesCount.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[#F5A623] text-[18px]" aria-hidden="true">
              ★
            </span>
            <span className="font-bold text-[18px] text-[#222222] tabular-nums">
              {favoritesCount.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="text-[13px] leading-[1.6] text-[#888888] flex flex-col">
          <span>営業時間: 12:00〜翌5:00</span>
          <span>定休日: 年中無休</span>
        </div>
      </div>

      {/* 右側: アクション丸ボタン */}
      <div className="flex items-center gap-2">
        {/* いいねボタン */}
        <button
          type="button"
          aria-pressed={isLiked}
          aria-label={`いいね ${isLiked ? "解除" : "追加"}`}
          onClick={handleLikeClick}
          className={`
            w-[54px] h-[54px] rounded-full bg-white flex items-center justify-center
            shadow-[0_2px_6px_rgba(0,0,0,0.15)] transition-transform duration-100 active:scale-95
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1B2F8F] focus-visible:outline-offset-2
            ${isLikeAnimating ? "scale-115" : "scale-100"}
          `}
        >
          <svg
            className={`w-[26px] h-[26px] transition-colors duration-200 ${
              isLiked ? "text-[#D93025] fill-current" : "text-[#D93025] fill-none"
            }`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
          </svg>
        </button>

        {/* お気に入りボタン (デザインシステム規約により★に統一) */}
        <button
          type="button"
          aria-pressed={isFavorited}
          aria-label={`お気に入り ${isFavorited ? "解除" : "追加"}`}
          onClick={handleFavoriteClick}
          className={`
            w-[54px] h-[54px] rounded-full bg-white flex items-center justify-center
            shadow-[0_2px_6px_rgba(0,0,0,0.15)] transition-transform duration-100 active:scale-95
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1B2F8F] focus-visible:outline-offset-2
            ${isFavAnimating ? "scale-115" : "scale-100"}
          `}
        >
          <svg
            className={`w-[26px] h-[26px] transition-colors duration-200 ${
              isFavorited
                ? "text-[#F5A623] fill-current"
                : "text-[#F5A623] fill-none"
            }`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      </div>

      {/* スクリーンリーダー向けの数値変化通知 */}
      <span className="sr-only" aria-live="polite">
        {`現在のいいね数: ${likesCount}、お気に入り数: ${favoritesCount}`}
      </span>
    </div>
  );
};

export default StatActionClient;