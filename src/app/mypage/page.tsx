import Link from "next/link";
import { ChevronRight, History, Settings, Ticket, User } from "lucide-react";
import { AppBar } from "@/components/AppBar";
import { SectionHeader } from "@/components/SectionHeader";
import { TabBar } from "@/components/TabBar";

const menu = [
  { label: "プロフィール", href: "#", icon: User },
  { label: "閲覧履歴", href: "#", icon: History },
  { label: "クーポン", href: "#", icon: Ticket },
  { label: "設定", href: "#", icon: Settings },
];

export default function MyPage() {
  return (
    <div className="min-h-screen pb-[calc(var(--tabbar-total)+16px)]">
      <AppBar />
      <main className="mx-auto max-w-[720px]">
        <SectionHeader title="マイページ" />
        <section className="p-4">
          <div className="rounded-[var(--radius-lg)] bg-[var(--color-bg-sub)] p-4">
            <div className="text-[17px] font-bold">ゲストさん</div>
            <p className="mt-1 text-[12px] text-[var(--color-text-caption)]">
              会員登録するとお気に入りや履歴を保存できます。
            </p>
          </div>
        </section>
        <div className="border-t-4 border-[var(--color-primary)]">
          {menu.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.label} href={item.href} className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-4">
                <span className="flex items-center gap-3 text-[14px] font-bold">
                  <Icon size={22} className="text-[var(--color-primary)]" />
                  {item.label}
                </span>
                <ChevronRight size={20} className="text-[var(--color-text-sub)]" />
              </Link>
            );
          })}
        </div>
      </main>
      <TabBar />
    </div>
  );
}
