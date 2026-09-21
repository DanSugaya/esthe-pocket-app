'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { X } from 'lucide-react';

/** §11 ボトムシート(250ms)。絞り込み・ログイン誘導・クーポン一覧で共通利用 */
export function BottomSheet({
  title,
  onClose,
  footer,
  children,
}: {
  title: string;
  onClose: () => void;
  footer?: ReactNode;
  children: ReactNode;
}) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  // 開いている間: 背面のスクロールを止め、閉じたら元のフォーカス位置へ戻す
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = overflow;
      opener?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        tabIndex={-1}
        aria-label="閉じる"
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 transition-opacity duration-[250ms] motion-reduce:transition-none ${
          entered ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`absolute inset-x-0 bottom-0 mx-auto flex max-h-[85vh] max-w-[720px] flex-col rounded-t-esthe-lg bg-white outline-none transition-transform duration-[250ms] ease-sheet motion-reduce:transition-none ${
          entered ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-esthe-border pl-4 pr-1">
          <h2 id={titleId} className="text-h2 font-bold">
            {title}
          </h2>
          <button type="button" aria-label="閉じる" onClick={onClose} className="flex h-11 w-11 items-center justify-center text-esthe-caption">
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
        {footer && <div className="shrink-0 border-t border-esthe-border p-4 pb-[calc(16px+env(safe-area-inset-bottom))]">{footer}</div>}
      </div>
    </div>
  );
}
