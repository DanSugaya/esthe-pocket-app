'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { BottomSheet } from '../BottomSheet';
import { Button, ButtonLink } from '../Buttons';

/**
 * いいね / お気に入りの状態を、指標行(StatActionRow)と追従バーの★(DetailFloating)で共有する。
 * - 楽観的更新 + 失敗時ロールバック(§4.15)
 * - 未ログイン時はログイン誘導シートを表示
 * onToggleLike / onToggleFavorite には Server Action を渡せる
 * (Server Component から Client Component へ渡せる関数は Server Action のみ)
 */

type ToggleAction = (nextState: boolean) => Promise<void>;

type Toggle = {
  active: boolean;
  count: number;
  /** トグル直後の 200ms だけ true(1.0 → 1.15 → 1.0 のバウンド用) */
  bounce: boolean;
  toggle: () => void;
};

type Engagement = { like: Toggle; favorite: Toggle };

const EngagementContext = createContext<Engagement | null>(null);

export function useEngagement(): Engagement {
  const ctx = useContext(EngagementContext);
  if (!ctx) throw new Error('useEngagement は <EngagementProvider> の内側で使用してください');
  return ctx;
}

function useOptimisticToggle(initialActive: boolean, initialCount: number, action?: ToggleAction): Toggle {
  const [state, setState] = useState({ active: initialActive, count: initialCount });
  const [bounce, setBounce] = useState(false);
  const pending = useRef(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const run = async () => {
    if (pending.current) return; // 通信中の連打は無視(ロールバック時に状態が食い違うのを防ぐ)
    pending.current = true;

    const prev = state;
    const nextActive = !prev.active;
    setState({ active: nextActive, count: prev.count + (nextActive ? 1 : -1) });
    setBounce(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setBounce(false), 200);

    try {
      await action?.(nextActive);
    } catch {
      setState(prev);
    } finally {
      pending.current = false;
    }
  };

  return {
    ...state,
    bounce,
    toggle: () => {
      void run();
    },
  };
}

export function EngagementProvider({
  initialLikes,
  initialFavorites,
  isLoggedIn = false,
  loginHref = '/login',
  onToggleLike,
  onToggleFavorite,
  children,
}: {
  initialLikes: number;
  initialFavorites: number;
  isLoggedIn?: boolean;
  loginHref?: string;
  onToggleLike?: ToggleAction;
  onToggleFavorite?: ToggleAction;
  children: ReactNode;
}) {
  const like = useOptimisticToggle(false, initialLikes, onToggleLike);
  const favorite = useOptimisticToggle(false, initialFavorites, onToggleFavorite);
  const [loginOpen, setLoginOpen] = useState(false);
  const closeLogin = useCallback(() => setLoginOpen(false), []);

  const guard = (t: Toggle): Toggle => ({ ...t, toggle: () => (isLoggedIn ? t.toggle() : setLoginOpen(true)) });

  return (
    <EngagementContext.Provider value={{ like: guard(like), favorite: guard(favorite) }}>
      {children}
      {loginOpen && (
        <BottomSheet
          title="ログインが必要です"
          onClose={closeLogin}
          footer={
            <div className="flex flex-col gap-2">
              <ButtonLink href={loginHref}>ログイン・会員登録する</ButtonLink>
              <Button variant="outline" onClick={closeLogin}>
                閉じる
              </Button>
            </div>
          }
        >
          <p className="text-body text-esthe-caption">
            いいね・お気に入りの登録はログイン後にご利用いただけます。閲覧は会員登録なしでもできます。
          </p>
        </BottomSheet>
      )}
    </EngagementContext.Provider>
  );
}
