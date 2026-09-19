import React from 'react';

interface Props {
  title: string;
  moreText?: string;
  onMoreClick?: () => void;
}

export const SectionHeader: React.FC<Props> = ({ title, moreText = '一覧 >', onMoreClick }) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-[var(--color-border)]">
      <div className="flex items-center gap-1.5">
        <span className="text-[var(--color-primary)] font-bold text-sm">◆</span>
        <h2 className="font-bold text-[17px] text-[var(--color-text)]">{title}</h2>
      </div>
      <button onClick={onMoreClick} className="text-xs font-bold text-[var(--color-primary)] hover:underline">
        {moreText}
      </button>
    </div>
  );
};