"use client";

import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/**
 * いいね / お気に入りの状態を、StatActionClient(丸ボタン)と
 * StickyCtaClient(追従バーの★)で共有するための Provider。
 *
 * - 楽観的更新 + 失敗時ロールバック(designsystem 4.15)
 * - 未ログイン時はログイン誘導シートを表示
 * - onToggleLike / onToggleFavorite には Server Action を渡せる
 *   (Server Component から Client Component へ渡せる関数は Server Action のみ)
 */

type ToggleAction = (nextState: boolean) => Promise<void>;

type ToggleState = {
  active: boolean;
  count: number;
  /** トグル直後 200ms だけ true(1.0 → 1.15 → 1.0 のバウンド用) */
  bounce: boolean;
  toggle: () => void;
};

type TherapistActions = {
  like: ToggleState;
  favorite: ToggleState;
};

const TherapistActionsContext = createContext<TherapistActions | null>(null);

export function useTherapistActions(): TherapistActions {
  const ctx = useContext(TherapistActionsContext);
  if (!ctx) {
    throw new Error(
      "useTherapistActions は <TherapistActionsProvider> の内側で使用してください"
    );
  }
  return ctx;
}

function useOptimisticToggle(
  initialActive: boolean,
  initialCount: number,
  action?: ToggleAction
): ToggleState {
  const [state, setState] = useState({ active: initialActive, count: initialCount });
  const [bounce, setBounce] = useState(false);
  const pending = useRef(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const run = async () => {
    // 通信中の連打を無視(ロールバック時に状態が食い違うのを防ぐ)
    if (pending.current) return;
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
      setState(prev); // 失敗時にロールバック
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

type ProviderProps = {
  initialLikes: number;
  initialFavorites: number;
  isLikedInitial?: boolean;
  isFavoritedInitial?: boolean;
  isLoggedIn?: boolean;
  loginHref?: string;
  onToggleLike?: ToggleAction;
  onToggleFavorite?: ToggleAction;
  children: ReactNode;
};

export function TherapistActionsProvider({
  initialLikes,
  initialFavorites,
  isLikedInitial = false,
  isFavoritedInitial = false,
  isLoggedIn = false,
  loginHref = "/login",
  onToggleLike,
  onToggleFavorite,
  children,
}: ProviderProps) {
  const like = useOptimisticToggle(isLikedInitial, initialLikes, onToggleLike);
  const favorite = useOptimisticToggle(isFavoritedInitial, initialFavorites, onToggleFavorite);
  const [loginOpen, setLoginOpen] = useState(false);
  const closeLogin = useCallback(() => setLoginOpen(false), []);

  const guard = (t: ToggleState): ToggleState => ({
    ...t,
    toggle: () => (isLoggedIn ? t.toggle() : setLoginOpen(true)),
  });

  return (
    <TherapistActionsContext.Provider value={{ like: guard(like), favorite: guard(favorite) }}>
      {children}
      {loginOpen && <LoginSheet href={loginHref} onClose={closeLogin} />}
    </TherapistActionsContext.Provider>
  );
}

function LoginSheet({ href, onClose }: { href: string; onClose: () => void }) {
  const [entered, setEntered] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);

  // 開く前にフォーカスしていた要素へ、閉じたときに戻す
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    linkRef.current?.focus();
    return () => prev?.focus();
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setEntered(true));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        tabIndex={-1}
        aria-label="閉じる"
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-[250ms] motion-reduce:transition-none ${
          entered ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-sheet-title"
        className={`absolute inset-x-0 bottom-0 mx-auto max-w-[720px] rounded-t-[var(--radius-lg)] bg-[var(--color-bg)] p-4 transition-transform duration-[250ms] ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:transition-none ${
          entered ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ paddingBottom: "calc(16px + env(safe-area-inset-bottom))" }}
      >
        <h2 id="login-sheet-title" className="text-[17px] font-bold leading-[1.4]">
          ログインが必要です
        </h2>
        <p className="mt-2 text-[13px] leading-[1.6] text-[color:var(--color-text-sub)]">
          いいね・お気に入りの登録はログイン後にご利用いただけます。閲覧は会員登録なしでもできます。
        </p>
        <div className="mt-4 flex flex-col gap-2">
          <Link
            ref={linkRef}
            href={href}
            className="flex h-[var(--btn-h-lg,52px)] w-full items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary)] text-[16px] font-bold text-white active:bg-[var(--color-primary-dark)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-primary)]"
          >
            ログイン・会員登録する
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="flex h-[var(--btn-h-lg,52px)] w-full items-center justify-center rounded-[var(--radius-md)] border-2 border-[color:var(--color-primary)] bg-[var(--color-bg)] text-[16px] font-bold text-[color:var(--color-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-primary)]"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
