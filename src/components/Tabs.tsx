'use client';

import { useId, useState, type KeyboardEvent, type ReactNode } from 'react';

type Tab = { label: string; panel: ReactNode };

// 4.10 Tabs(ランキング切替など)。横スクロール可 / アクティブは primary 太字 + 下に3pxライン。
export function Tabs({ tabs, label }: { tabs: Tab[]; label: string }) {
  const [active, setActive] = useState(0);
  const baseId = useId();

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = i;
    if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
    else return;
    e.preventDefault();
    setActive(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label={label}
        className="scrollbar-none flex overflow-x-auto border-b border-[var(--color-border)] bg-white"
      >
        {tabs.map((tab, i) => {
          const selected = i === active;
          return (
            <button
              key={tab.label}
              type="button"
              role="tab"
              id={`${baseId}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${i}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`min-h-[44px] flex-1 shrink-0 whitespace-nowrap border-b-[3px] px-4 py-3 text-[13px] font-bold transition-colors ${
                selected
                  ? 'border-[color:var(--color-primary)] text-[var(--color-primary)]'
                  : 'border-transparent text-[var(--color-text-sub)]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab, i) => (
        <div
          key={tab.label}
          role="tabpanel"
          id={`${baseId}-panel-${i}`}
          aria-labelledby={`${baseId}-tab-${i}`}
          hidden={i !== active}
        >
          {tab.panel}
        </div>
      ))}
    </div>
  );
}

export default Tabs;
