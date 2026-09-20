import Link from 'next/link';
import { AppBar } from '@/components/AppBar';
import { TabBar } from '@/components/TabBar';
import { SectionHeader } from '@/components/SectionHeader';
import { Tabs } from '@/components/Tabs';
import { ChevronRight, MapPin, Star, ThumbsUp } from '@/components/Icons';

/* ==========================================
   モックデータ(API接続までの仮置き)
   ========================================== */
const areas = ['渋谷・恵比寿', '新宿・歌舞伎町', '池袋', '銀座・新橋', '六本木', '横浜'];

const popularShops = [
  { id: 'aroma-shibuya', name: 'アロマリラクゼーション 渋谷店', desc: '渋谷 / 90分 12,000円〜', label: 'ポータル限定特典あり' },
  { id: 'spa-shinjuku', name: 'メンズスパ 新宿', desc: '新宿 / 60分 9,000円〜', label: '本日空きあり' },
  { id: 'premium-ikebukuro', name: 'プレミアムサロン 池袋', desc: '池袋 / 120分 18,000円〜' },
  { id: 'healing-ginza', name: 'ヒーリングラグジュアリー', desc: '銀座 / 90分 15,000円〜' },
];

// §8: セラピストの掲載項目は最小限(名前・出勤状況)。年齢などは載せない
const therapists = [
  { id: 1, name: 'あいり', shop: '渋谷店', shopId: 'aroma-shibuya', status: 'available' as const, nextSlot: '17:30' },
  { id: 2, name: 'みお', shop: '新宿', shopId: 'spa-shinjuku', status: 'working' as const },
  { id: 3, name: 'さくら', shop: '池袋', shopId: 'premium-ikebukuro', status: 'working' as const },
  { id: 4, name: 'ゆな', shop: '銀座', shopId: 'healing-ginza', status: 'available' as const, nextSlot: '19:00' },
  { id: 5, name: 'れい', shop: '渋谷店', shopId: 'aroma-shibuya', status: 'working' as const },
];

const ranking = [
  { id: 'ebisu-aroma', name: '極上アロマ 恵比寿本店', desc: '恵比寿 / 完全個室プライベートサロン', promo: '初回限定 2,000円OFF', likes: 2530, favorites: 1204 },
  { id: 'roppongi-spa', name: '高級メンズスパ 六本木', desc: '六本木 / アロマオイルセラピー', promo: 'ポイント5倍キャンペーン中', likes: 1890, favorites: 968 },
  { id: 'asakusa-healing', name: '和風ヒーリング 浅草', desc: '浅草 / 落ち着いた和風空間', promo: '指名料無料特典', likes: 1240, favorites: 702 },
];

// 1〜3位は金・銀・銅(§4.6)。上に置く文字は --color-text
const rankStyle = (rank: number) =>
  rank === 1
    ? 'bg-[var(--color-rank-gold)] text-[var(--color-text)]'
    : rank === 2
      ? 'bg-[var(--color-rank-silver)] text-[var(--color-text)]'
      : rank === 3
        ? 'bg-[var(--color-rank-bronze)] text-[var(--color-text)]'
        : 'bg-[var(--color-primary)] text-white';

const fmt = (n: number) => n.toLocaleString('ja-JP');

/* ==========================================
   ページ
   ========================================== */
export default function Home() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-[720px] bg-white pt-[var(--header-total)] pb-[var(--tabbar-total)] text-[var(--color-text)]">
      {/* 4.1 App Bar (固定ヘッダー) */}
      <AppBar />

      <main>
        {/* 4.8 Hero Carousel (メインバナー領域)
            isolate: 内側の z-index をこの中に閉じ込め、固定ヘッダーの上に被さらないようにする */}
        <section
          aria-label="特集"
          className="relative isolate flex aspect-[16/10] w-full flex-col items-center justify-center overflow-hidden bg-slate-800 text-white"
        >
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="z-20 px-4 text-center">
            <span className="mb-2 inline-block rounded-[var(--radius-sm)] bg-[var(--color-accent-promo)] px-2 py-0.5 text-[11px] font-bold text-white">
              期間限定キャンペーン
            </span>
            <h1 className="text-[20px] font-bold leading-[1.4]">新規オープン店舗 特集</h1>
            <p className="mt-1 text-[12px] text-slate-200">初回利用で使える限定クーポン配布中！</p>
          </div>
          {/* ドットインジケーター(カルーセル実装までは装飾) */}
          <div className="absolute inset-x-0 bottom-3 z-20 flex justify-center gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-white" />
            <span className="h-2 w-2 rounded-full bg-white/50" />
            <span className="h-2 w-2 rounded-full bg-white/50" />
          </div>
        </section>

        {/* エリア選択(チップ / 横スクロール) */}
        <nav aria-label="エリアから探す" className="border-b border-[var(--color-border)] bg-white p-4">
          <ul className="scrollbar-none flex gap-2 overflow-x-auto pb-1">
            {areas.map((area) => (
              <li key={area} className="shrink-0">
                <Link
                  href={`/search?area=${encodeURIComponent(area)}`}
                  className="inline-flex min-h-[44px] items-center gap-1 rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-bg-sub)] px-4 text-[13px] font-bold text-[var(--color-text)] transition-colors hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)] active:bg-[var(--color-primary-light)]"
                >
                  <MapPin className="h-4 w-4" />
                  {area}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* セクション区切り太線 (4px primary) */}
        <div className="h-1 bg-[var(--color-primary)]" aria-hidden="true" />

        {/* 4.3 & 4.4 セクション1: 大人気の店舗 (2列グリッド) */}
        <section>
          <SectionHeader title="大人気の店舗" href="/search?sort=popular" />
          <ul className="grid grid-cols-2 gap-3 p-4">
            {popularShops.map((shop) => (
              <li key={shop.id}>
                <Link href={`/shops/${shop.id}`} className="block transition-opacity duration-100 active:opacity-70">
                  {/* サムネイル 16:9 / radius-md / 枠線。カード全体には枠を付けない(§4.4) */}
                  <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-sub)]">
                    <span className="absolute inset-0 flex items-center justify-center text-[12px] text-[var(--color-text-caption)]" aria-hidden="true">
                      店舗画像
                    </span>
                    {/* オーバーレイラベル: 白85% 背景 + primary 太字 11px(§4.7) */}
                    {shop.label && (
                      <span className="absolute inset-x-0 bottom-0 bg-white/85 py-0.5 text-center text-[11px] font-bold leading-[1.4] text-[var(--color-primary)]">
                        {shop.label}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 truncate text-[14px] font-bold leading-[1.4]">{shop.name}</p>
                  <p className="mt-1 truncate text-[12px] leading-[1.4] text-[var(--color-text-caption)]">{shop.desc}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="h-1 bg-[var(--color-primary)]" aria-hidden="true" />

        {/* 4.5 セクション2: 本日の出勤セラピスト (横スクロール Compactカード) */}
        <section>
          <SectionHeader title="本日の出勤セラピスト" href="/search?today=1" />
          <ul className="scrollbar-none flex snap-x snap-proximity gap-3 overflow-x-auto p-4">
            {therapists.map((t) => (
              <li key={t.id} className="w-[108px] shrink-0 snap-start">
                <Link href={`/shops/${t.shopId}`} className="block transition-opacity duration-100 active:opacity-70">
                  <div className="relative h-[108px] w-[108px] overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-sub)]">
                    <span className="absolute inset-0 flex items-center justify-center text-[12px] text-[var(--color-text-caption)]" aria-hidden="true">
                      セラピスト
                    </span>
                    {/* §4.19: 出勤中 = primary / 空き = success(緑は「空き」専用)。必ずテキストを併記 */}
                    <span
                      className={`absolute left-1 top-1 rounded-[var(--radius-sm)] px-1.5 py-0.5 text-[11px] font-bold leading-none text-white ${
                        t.status === 'available' ? 'bg-[var(--color-success)]' : 'bg-[var(--color-primary)]'
                      }`}
                    >
                      {t.status === 'available' ? `空き ${t.nextSlot}` : '出勤中'}
                    </span>
                  </div>
                  <p className="mt-2 truncate text-[14px] font-bold leading-[1.4]">{t.name}</p>
                  <p className="truncate text-[12px] leading-[1.4] text-[var(--color-text-caption)]">{t.shop}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="h-1 bg-[var(--color-primary)]" aria-hidden="true" />

        {/* 4.6 セクション3: 月間人気ランキング (タブ + リスト) */}
        <section>
          <SectionHeader title="月間人気ランキング" />

          <Tabs
            label="ランキングの種類"
            tabs={[
              {
                label: '総合',
                panel: (
                  <ol className="divide-y divide-[var(--color-border)]">
                    {ranking.map((shop, i) => (
                      <li key={shop.id}>
                        <Link
                          href={`/shops/${shop.id}`}
                          className="flex items-center gap-3 px-4 py-3 transition-opacity duration-100 active:opacity-70"
                        >
                          <div className="relative h-[88px] w-[130px] shrink-0 overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-sub)]">
                            <span className="absolute inset-0 flex items-center justify-center text-[12px] text-[var(--color-text-caption)]" aria-hidden="true">
                              画像
                            </span>
                            {/* ランクバッジ 24×24 */}
                            <span
                              className={`absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-br-[var(--radius-md)] text-[12px] font-bold ${rankStyle(i + 1)}`}
                            >
                              <span className="sr-only">第</span>
                              {i + 1}
                              <span className="sr-only">位</span>
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[14px] font-bold leading-[1.4]">{shop.name}</p>
                            <p className="mt-0.5 truncate text-[12px] leading-[1.4] text-[var(--color-text-caption)]">{shop.desc}</p>
                            <p className="mt-1 truncate text-[12px] font-bold leading-[1.4] text-[var(--color-accent-promo)]">{shop.promo}</p>
                            {/* 指標: いいね(赤) / お気に入り(オレンジ)。4.15 と同じ意味で統一 */}
                            <div className="mt-1 flex items-center justify-end gap-3 text-[14px] font-bold tabular-nums leading-none">
                              <span className="inline-flex items-center gap-1 text-[var(--color-accent-like)]">
                                <ThumbsUp className="h-4 w-4" />
                                <span className="sr-only">いいね</span>
                                {fmt(shop.likes)}
                              </span>
                              <span className="inline-flex items-center gap-1 text-[var(--color-accent-star)]">
                                <Star className="h-4 w-4" />
                                <span className="sr-only">お気に入り</span>
                                {fmt(shop.favorites)}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ol>
                ),
              },
              // 以下は API 接続までの仮パネル
              ...['新店', 'エリア別', '口コミ順'].map((label) => ({
                label,
                panel: (
                  <p className="px-4 py-10 text-center text-[13px] text-[var(--color-text-caption)]">
                    このランキングは準備中です。
                  </p>
                ),
              })),
            ]}
          />

          {/* 全幅CTAボタン (4.9 Primary) */}
          <div className="bg-white p-4">
            <Link
              href="/ranking"
              className="relative flex h-12 w-full items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary)] text-[14px] font-bold text-white transition-colors active:bg-[var(--color-primary-dark)]"
            >
              ランキングの続きを見る
              <ChevronRight className="absolute right-3 h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>

      {/* 4.11 フッター(main の外) */}
      <footer className="bg-[var(--color-primary-dark)] p-6 text-white">
        {/* ボタンカード 2列(§4.9 Secondary / §4.11) */}
        <ul className="mb-6 grid grid-cols-2 gap-3">
          {[
            { label: '公式SNSはこちら', href: '#' /* TODO: SNSのURL */ },
            { label: 'ご利用ガイド', href: '/guide' },
            { label: '店舗掲載のお問合せ', href: '/contact' },
            { label: 'ヘルプ・FAQ', href: '/help' },
          ].map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="flex h-[60px] items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-bg-sub)] px-2 text-center text-[13px] font-bold text-[var(--color-text)] transition-opacity duration-100 active:opacity-70"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="space-y-3 border-t border-white/20 pt-4 text-center text-[11px] leading-[1.6] text-white/70">
          <p>※当サイトは18歳未満の方のご利用・閲覧を固く禁じます。</p>
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            {[
              { label: '運営会社', href: '/company' },
              { label: '利用規約', href: '/terms' },
              { label: 'プライバシーポリシー', href: '/privacy' },
              { label: '口コミ投稿規約', href: '/review-policy' },
            ].map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="underline underline-offset-2">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p>© エステポケット All Rights Reserved.</p>
        </div>
      </footer>

      {/* 4.2 下部タブバー */}
      <TabBar />
    </div>
  );
}
