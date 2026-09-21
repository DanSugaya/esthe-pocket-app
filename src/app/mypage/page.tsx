import Link from 'next/link';
import { ChevronRight, History, Settings, Ticket, User, type LucideIcon } from 'lucide-react';
import { AppBar } from '@/components/AppBar';
import { Divider } from '@/components/Divider';

// TODO: 遷移先ページができたら href を差し替える
const MENU: { label: string; href: string; Icon: LucideIcon }[] = [
  { label: 'プロフィール', href: '#', Icon: User },
  { label: '閲覧履歴', href: '#', Icon: History },
  { label: 'クーポン', href: '#', Icon: Ticket },
  { label: '設定', href: '#', Icon: Settings },
];

export default function MyPage() {
  return (
    <>
      <AppBar title="マイページ" />

      <main>
        <section className="p-4">
          <div className="rounded-esthe-lg bg-esthe-sub p-4">
            <p className="text-h2 font-bold">ゲストさん</p>
            <p className="mt-1 text-caption text-esthe-caption">会員登録するとお気に入りや履歴を保存できます。</p>
          </div>
        </section>

        <Divider level="strong" />

        <ul>
          {MENU.map(({ label, href, Icon }) => (
            <li key={label}>
              <Link href={href} className="press flex items-center gap-3 border-b border-esthe-border px-4 py-4">
                <Icon size={22} aria-hidden="true" className="text-esthe-primary" />
                <span className="flex-1 text-title font-bold">{label}</span>
                <ChevronRight size={20} aria-hidden="true" className="text-esthe-muted" />
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
