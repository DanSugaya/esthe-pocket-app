import Link from 'next/link';

/* §4.11 Footer。全ページ共通(layout.tsx から表示) */

const CARDS = [
  { label: '公式SNSはこちら', href: '#' /* TODO: SNSのURL */ },
  { label: 'ご利用ガイド', href: '/guide' },
  { label: '店舗掲載のお問合せ', href: '/contact' },
  { label: 'ヘルプ・FAQ', href: '/help' },
];

const LINKS = [
  { label: '運営会社', href: '/company' },
  { label: '利用規約', href: '/terms' },
  { label: 'プライバシーポリシー', href: '/privacy' },
  { label: '口コミ投稿規約', href: '/review-policy' },
];

export function Footer() {
  return (
    <footer className="mt-6 bg-esthe-primary-dark p-6 text-white">
      {/* §4.9 Secondary(ボタンカード)2列 */}
      <ul className="mb-6 grid grid-cols-2 gap-3">
        {CARDS.map((card) => (
          <li key={card.label}>
            <Link
              href={card.href}
              className="press flex h-[60px] items-center justify-center rounded-esthe-lg bg-esthe-sub px-2 text-center text-body font-bold text-esthe-text"
            >
              {card.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="space-y-3 border-t border-white/20 pt-4 text-center text-badge leading-[1.6] text-white/70">
        <p>※当サイトは18歳未満の方のご利用・閲覧を固く禁じます。掲載店舗の届出状況は、各店舗ページの「店舗情報」でご確認ください。</p>
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          {LINKS.map((l) => (
            <li key={l.label}>
              <Link href={l.href} className="underline underline-offset-2 focus-visible:outline-white">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <p>© エステポケット All Rights Reserved.</p>
      </div>
    </footer>
  );
}
