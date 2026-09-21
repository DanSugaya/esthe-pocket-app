'use client';

import { useId, useState, type KeyboardEvent, type ReactNode } from 'react';

/* §4.10 Tabs。アクティブは primary 太字 + 下に3pxライン。←→キーで切替 */

type TabItem = { id: string; label: string };

/** 制御コンポーネント版。並び替え・表示切替など、パネルを自前で描画する場合に使う */
export function TabList({
  label,
  items,
  value,
  onChange,
  fill = false,
  className = '',
  idBase,
}: {
  label: string;
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  /** 全タブを等幅にする */
  fill?: boolean;
  className?: string;
  /** Tabs から渡される。パネルとの aria 関連付け用 */
  idBase?: string;
}) {
  const ownId = useId();
  const base = idBase ?? ownId;

  const onKeyDown = (e: KeyboardEvent, index: number) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = items[(index + step + items.length) % items.length];
    onChange(next.id);
    document.getElementById(`${base}-tab-${next.id}`)?.focus();
  };

  return (
    <div role="tablist" aria-label={label} className={`scrollbar-none flex overflow-x-auto border-b border-esthe-border bg-white ${className}`}>
      {items.map((item, i) => {
        const selected = item.id === value;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`${base}-tab-${item.id}`}
            aria-selected={selected}
            aria-controls={`${base}-panel-${item.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(item.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`relative h-12 shrink-0 whitespace-nowrap px-4 text-title font-bold ${fill ? 'flex-1' : ''} ${
              selected ? 'text-esthe-primary' : 'text-esthe-caption'
            }`}
          >
            {item.label}
            {selected && <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] bg-esthe-primary" />}
          </button>
        );
      })}
    </div>
  );
}

/** タブ + パネルの組み合わせ版(ランキング切替など) */
export function Tabs({ label, tabs }: { label: string; tabs: { label: string; panel: ReactNode }[] }) {
  const idBase = useId();
  const [index, setIndex] = useState(0);

  return (
    <>
      <TabList
        label={label}
        idBase={idBase}
        items={tabs.map((t, i) => ({ id: String(i), label: t.label }))}
        value={String(index)}
        onChange={(id) => setIndex(Number(id))}
      />
      <div role="tabpanel" id={`${idBase}-panel-${index}`} aria-labelledby={`${idBase}-tab-${index}`}>
        {tabs[index].panel}
      </div>
    </>
  );
}
