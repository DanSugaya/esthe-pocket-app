import React from "react";

export const ActionRow = () => {
  return (
    <div className="flex items-center justify-around py-3 border-y border-gray-100 bg-white">
      <button type="button" className="flex flex-col items-center gap-1 text-xs text-gray-600">
        <span>👍</span>
        <span>いいね</span>
      </button>
      <button type="button" className="flex flex-col items-center gap-1 text-xs text-gray-600">
        <span>★</span>
        <span>お気に入り</span>
      </button>
      <button type="button" className="flex flex-col items-center gap-1 text-xs text-gray-600">
        <span>🔗</span>
        <span>シェア</span>
      </button>
    </div>
  );
};