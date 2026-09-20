import React from "react";
import Link from "next/link";
import {
  User,
  Heart,
  History,
  Ticket,
  Coins,
  Settings,
  HelpCircle,
  FileText,
  ShieldCheck,
  ChevronRight,
  LogOut,
  Bell,
  Search,
  MapPin,
  Trophy,
  Home,
} from "lucide-react";

// --- 型定義 ---
interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  badge?: string;
  href: string;
}

// --- サブコンポーネント: アクションカード (グリッド配置用) ---
function ActionCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex h-[60px] items-center rounded-lg bg-[var(--color-bg-sub,#F4F4F4)] px-3 transition-opacity active:opacity-70"
    >
      <div className="mr-3 flex items-center justify-center text-[var(--color-primary,#1B2F8F)]">
        {icon}
      </div>
      <div className="flex flex-1 flex-col justify-center">
        <span className="text-xs font-normal text-[var(--color-text-sub,#888888)]">
          {label}
        </span>
        {value && (
          <span className="text-sm font-bold text-[var(--color-text,#222222)]">
            {value}
          </span>
        )}
      </div>
      <ChevronRight className="h-4 w-4 text-[var(--color-text-sub,#888888)]" />
    </Link>
  );
}

// --- サブコンポーネント: リストメニュー行 ---
function MenuItem({ icon, label, badge, href }: MenuItemProps) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between border-b border-[var(--color-border,#E0E0E0)] px-4 py-3.5 transition-opacity active:opacity-70"
    >
      <div className="flex items-center gap-3">
        <span className="text-[var(--color-primary,#1B2F8F)]">{icon}</span>
        <span className="text-sm font-bold text-[var(--color-text,#222222)]">
          {label}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {badge && (
          <span className="rounded-full bg-[var(--color-accent-promo,#E0407F)] px-2 py-0.5 text-[11px] font-bold text-white">
            {badge}
          </span>
        )}
        <ChevronRight className="h-4 w-4 text-[var(--color-text-sub,#888888)]" />
      </div>
    </Link>
  );
}

export default function MyPage() {
  // 疑似ユーザーデータ (実際にはセッションやAPIから取得)
  const user = {
    isLoggedIn: true,
    name: "XX OOO",
    rank: "ゴールド会員",
    points: "1,250",
    couponsCount: "3",
    favoritesCount: "12",
    historyCount: "8",
  };

  return (
    <div className="min-h-screen bg-white pb-[calc(var(--tabbar-h,64px)+24px)] text-[var(--color-text,#222222)]">
      {/* 4.1 App Bar (固定ヘッダー) */}
      <header className="sticky top-0 z-40 flex h-[56px] w-full items-center justify-between bg-[var(--color-primary,#1B2F8F)] px-4 text-white">
        <h1 className="text-lg font-bold tracking-wide">マイページ</h1>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full active:bg-[var(--color-primary-dark,#12206A)]"
            aria-label="お知らせ"
          >
            <Bell className="h-6 w-6" />
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[720px]">
        {/* ユーザープロフィール概要ブロック */}
        <section className="bg-gradient-to-b from-[var(--color-primary-light,#E8ECFA)] to-white px-4 pb-5 pt-6">
          {user.isLoggedIn ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary,#1B2F8F)] text-white">
                  <User className="h-8 w-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-[var(--color-text,#222222)]">
                      {user.name}
                    </h2>
                    <span className="rounded bg-[var(--color-primary,#1B2F8F)] px-1.5 py-0.5 text-[10px] font-bold text-white">
                      {user.rank}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-[var(--color-text-sub,#888888)]">
                    会員ID: 84920418
                  </p>
                </div>
              </div>
              <Link
                href="/mypage/profile"
                className="rounded-md border border-[var(--color-primary,#1B2F8F)] px-3 py-1.5 text-xs font-bold text-[var(--color-primary,#1B2F8F)] active:bg-[var(--color-primary-light,#E8ECFA)]"
              >
                編集
              </Link>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-sm text-[var(--color-text-sub,#888888)] mb-3">
                ログインするとお気に入りやポイント機能が利用できます
              </p>
              <Link
                href="/login"
                className="inline-flex h-12 w-full items-center justify-center rounded-md bg-[var(--color-primary,#1B2F8F)] text-base font-bold text-white"
              >
                ログイン・新規会員登録
              </Link>
            </div>
          )}
        </section>

        {/* 4.9 クイックアクション (2列グリッド: 4.9 Secondary ボタンカード相当) */}
        <section className="px-4 py-2">
          <div className="grid grid-cols-2 gap-3">
            <ActionCard
              icon={<Coins className="h-6 w-6" />}
              label="保有ポイント"
              value={`${user.points} pt`}
              href="/mypage/points"
            />
            <ActionCard
              icon={<Ticket className="h-6 w-6 text-[var(--color-accent-promo,#E0407F)]" />}
              label="所持クーポン"
              value={`${user.couponsCount} 枚`}
              href="/mypage/coupons"
            />
            <ActionCard
              icon={<Heart className="h-6 w-6 text-[var(--color-accent-star,#F5A623)]" />}
              label="お気に入り"
              value={`${user.favoritesCount} 件`}
              href="/favorites"
            />
            <ActionCard
              icon={<History className="h-6 w-6" />}
              label="閲覧履歴"
              value={`${user.historyCount} 件`}
              href="/mypage/history"
            />
          </div>
        </section>

        {/* セクション区切り太線 (4px --color-primary) */}
        <div className="my-4 h-1 w-full bg-[var(--color-primary,#1B2F8F)]" />

        {/* メイン機能・利用履歴メニュー */}
        <section>
          <div className="flex items-center px-4 py-2">
            <span className="mr-1.5 text-xs text-[var(--color-primary,#1B2F8F)]">◆</span>
            <h2 className="text-base font-bold text-[var(--color-text,#222222)]">
              ご利用・アクティビティ
            </h2>
          </div>
          <div className="mt-1">
            <MenuItem
              icon={<Ticket className="h-5 w-5" />}
              label="獲得済みクーポン一覧"
              badge="NEW"
              href="/mypage/coupons"
            />
            <MenuItem
              icon={<History className="h-5 w-5" />}
              label="予約・来店履歴"
              href="/mypage/reservations"
            />
            <MenuItem
              icon={<Heart className="h-5 w-5" />}
              label="お気に入り店舗・セラピスト"
              href="/favorites"
            />
          </div>
        </section>

        {/* セクション区切り太線 (4px --color-primary) */}
        <div className="my-4 h-1 w-full bg-[var(--color-primary,#1B2F8F)]" />

        {/* アカウント設定・サポート */}
        <section>
          <div className="flex items-center px-4 py-2">
            <span className="mr-1.5 text-xs text-[var(--color-primary,#1B2F8F)]">◆</span>
            <h2 className="text-base font-bold text-[var(--color-text,#222222)]">
              設定・その他
            </h2>
          </div>
          <div className="mt-1">
            <MenuItem
              icon={<Settings className="h-5 w-5" />}
              label="会員情報の変更・設定"
              href="/mypage/settings"
            />
            <MenuItem
              icon={<ShieldCheck className="h-5 w-5" />}
              label="年齢確認ステータス"
              href="/mypage/age-verification"
            />
            <MenuItem
              icon={<HelpCircle className="h-5 w-5" />}
              label="ヘルプ・お問い合わせ"
              href="/help"
            />
            <MenuItem
              icon={<FileText className="h-5 w-5" />}
              label="利用規約・プライバシーポリシー"
              href="/terms"
            />
          </div>
        </section>

        {/* ログアウトボタン */}
        {user.isLoggedIn && (
          <div className="px-4 py-8">
            <button
              type="button"
              className="flex h-[48px] w-full items-center justify-center gap-2 rounded-md border border-[var(--color-border,#E0E0E0)] bg-white text-sm font-bold text-[var(--color-text-sub,#888888)] transition-opacity active:opacity-70"
            >
              <LogOut className="h-4 w-4" />
              ログアウト
            </button>
          </div>
        )}
      </main>

      {/* 4.2 Bottom Tab Bar (固定下部タブバー) */}
      <nav className="fixed bottom-0 left-0 z-40 flex h-[calc(64px+env(safe-area-inset-bottom))] w-full items-center justify-around border-t border-[var(--color-border,#E0E0E0)] bg-white pb-[env(safe-area-inset-bottom)]">
        <Link
          href="/"
          className="flex flex-col items-center justify-center text-[var(--color-text-sub,#888888)]"
        >
          <Home className="h-6 w-6" />
          <span className="mt-1 text-[11px] font-medium">TOP</span>
        </Link>
        <Link
          href="/search"
          className="flex flex-col items-center justify-center text-[var(--color-text-sub,#888888)]"
        >
          <Search className="h-6 w-6" />
          <span className="mt-1 text-[11px] font-medium">店舗を探す</span>
        </Link>
        <Link
          href="/ranking"
          className="flex flex-col items-center justify-center text-[var(--color-text-sub,#888888)]"
        >
          <Trophy className="h-6 w-6" />
          <span className="mt-1 text-[11px] font-medium">ランキング</span>
        </Link>
        <Link
          href="/favorites"
          className="flex flex-col items-center justify-center text-[var(--color-text-sub,#888888)]"
        >
          <Heart className="h-6 w-6" />
          <span className="mt-1 text-[11px] font-medium">お気に入り</span>
        </Link>
        <Link
          href="/mypage"
          className="flex flex-col items-center justify-center text-[var(--color-primary,#1B2F8F)]"
        >
          <User className="h-6 w-6" />
          <span className="mt-1 text-[11px] font-bold">マイページ</span>
        </Link>
      </nav>
    </div>
  );
}