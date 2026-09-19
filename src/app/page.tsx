import { AppBar } from '@/components/AppBar';
import { TabBar } from '@/components/TabBar';
import { SectionHeader } from '@/components/SectionHeader';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-sub)] max-w-[720px] mx-auto pb-[80px] pt-[56px] font-sans text-[var(--color-text)]">
      {/* 4.1 App Bar (固定ヘッダー) */}
      <AppBar />

      <main className="bg-white">
        {/* 4.8 Hero Carousel (メインバナー領域) */}
        <section className="relative w-full aspect-[16/10] bg-slate-800 text-white flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          <div className="z-20 text-center px-4">
            <span className="bg-[var(--color-accent-promo)] text-white text-[11px] font-bold px-2 py-0.5 rounded-[var(--radius-sm)] mb-2 inline-block">
              期間限定キャンペーン
            </span>
            <h1 className="text-xl font-bold">新規オープン店舗 特集</h1>
            <p className="text-xs mt-1 text-slate-200">初回利用で使える限定クーポン配布中！</p>
          </div>
          {/* ドットインジケーター */}
          <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white" />
            <span className="w-2 h-2 rounded-full bg-white/50" />
            <span className="w-2 h-2 rounded-full bg-white/50" />
          </div>
        </section>

        {/* 4.8 ショートカットバナー (エリア選択 / 横スクロール) */}
        <section className="p-4 bg-white border-b border-[var(--color-border)]">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {['渋谷・恵比寿', '新宿・歌舞伎町', '池袋', '銀座・新橋', '六本木', '横浜'].map((area, i) => (
              <button
                key={i}
                className="flex-shrink-0 bg-[var(--color-bg-sub)] hover:bg-[var(--color-primary-light)] text-[var(--color-text)] hover:text-[var(--color-primary)] px-4 py-2 rounded-[var(--radius-pill)] text-xs font-bold border border-[var(--color-border)] transition-colors"
              >
                📍 {area}
              </button>
            ))}
          </div>
        </section>

        {/* セクション区切り太線 (4px primary) */}
        <div className="h-1 bg-[var(--color-primary)]" />

        {/* 4.3 & 4.4 セクション1: 大人気の店舗 (2列グリッド) */}
        <section>
          <SectionHeader title="大人気の店舗" />
          <div className="p-4 grid grid-cols-2 gap-3">
            {/* 店舗カード 1 */}
            <div className="border border-[var(--color-border)] rounded-[var(--radius-md)] overflow-hidden bg-white hover:opacity-90 transition-opacity cursor-pointer">
              <div className="relative w-full aspect-[16/9] bg-slate-300 flex items-center justify-center text-xs text-slate-500">
                店舗画像
                {/* オーバーレイラベル */}
                <div className="absolute bottom-0 left-0 right-0 bg-[var(--color-overlay)] text-white text-[11px] font-bold py-0.5 text-center">
                  ポータル限定特典あり
                </div>
              </div>
              <div className="p-2">
                <div className="font-bold text-[14px] truncate">アロマリラクゼーション 渋谷店</div>
                <div className="text-[12px] text-[var(--color-text-sub)] truncate mt-1">渋谷 / 90分 12,000円〜</div>
              </div>
            </div>

            {/* 店舗カード 2 */}
            <div className="border border-[var(--color-border)] rounded-[var(--radius-md)] overflow-hidden bg-white hover:opacity-90 transition-opacity cursor-pointer">
              <div className="relative w-full aspect-[16/9] bg-slate-300 flex items-center justify-center text-xs text-slate-500">
                店舗画像
                <div className="absolute bottom-0 left-0 right-0 bg-[var(--color-overlay)] text-white text-[11px] font-bold py-0.5 text-center">
                  本日空きあり
                </div>
              </div>
              <div className="p-2">
                <div className="font-bold text-[14px] truncate">メンズスパ 新宿</div>
                <div className="text-[12px] text-[var(--color-text-sub)] truncate mt-1">新宿 / 60分 9,000円〜</div>
              </div>
            </div>

            {/* 店舗カード 3 */}
            <div className="border border-[var(--color-border)] rounded-[var(--radius-md)] overflow-hidden bg-white hover:opacity-90 transition-opacity cursor-pointer">
              <div className="relative w-full aspect-[16/9] bg-slate-300 flex items-center justify-center text-xs text-slate-500">
                店舗画像
              </div>
              <div className="p-2">
                <div className="font-bold text-[14px] truncate">プレミアムサロン 池袋</div>
                <div className="text-[12px] text-[var(--color-text-sub)] truncate mt-1">池袋 / 120分 18,000円〜</div>
              </div>
            </div>

            {/* 店舗カード 4 */}
            <div className="border border-[var(--color-border)] rounded-[var(--radius-md)] overflow-hidden bg-white hover:opacity-90 transition-opacity cursor-pointer">
              <div className="relative w-full aspect-[16/9] bg-slate-300 flex items-center justify-center text-xs text-slate-500">
                店舗画像
              </div>
              <div className="p-2">
                <div className="font-bold text-[14px] truncate">ヒーリングラグジュアリー</div>
                <div className="text-[12px] text-[var(--color-text-sub)] truncate mt-1">銀座 / 90分 15,000円〜</div>
              </div>
            </div>
          </div>
        </section>

        {/* セクション区切り太線 */}
        <div className="h-1 bg-[var(--color-primary)]" />

        {/* 4.5 セクション2: 本日の出勤セラピスト (横スクロール Compactカード) */}
        <section>
          <SectionHeader title="本日の出勤セラピスト" />
          <div className="p-4 flex gap-3 overflow-x-auto scrollbar-none">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex-shrink-0 w-[108px]">
                <div className="w-[108px] h-[108px] bg-slate-200 rounded-[var(--radius-md)] border border-[var(--color-border)] flex items-center justify-center text-xs text-slate-500 relative">
                  セラピスト
                  <span className="absolute top-1 left-1 bg-[var(--color-success)] text-white text-[10px] px-1 rounded-[var(--radius-sm)] font-bold">
                    出勤中
                  </span>
                </div>
                <div className="font-bold text-[13px] truncate mt-1.5 text-center">あいり (22)</div>
                <div className="text-[11px] text-[var(--color-text-sub)] truncate text-center">渋谷店</div>
              </div>
            ))}
          </div>
        </section>

        {/* セクション区切り太線 */}
        <div className="h-1 bg-[var(--color-primary)]" />

        {/* 4.6 セクション3: アクセスランキング (リスト形式) */}
        <section>
          <SectionHeader title="月間人気ランキング" />
          
          {/* 4.10 ランキング切替タブ */}
          <div className="flex border-b border-[var(--color-border)] text-center text-xs font-bold bg-white">
            <button className="flex-1 py-3 text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]">総合</button>
            <button className="flex-1 py-3 text-[var(--color-text-sub)]">新店</button>
            <button className="flex-1 py-3 text-[var(--color-text-sub)]">エリア別</button>
            <button className="flex-1 py-3 text-[var(--color-text-sub)]">口コミ順</button>
          </div>

          <div className="divide-y divide-[var(--color-border)]">
            {/* 1位 */}
            <div className="p-4 flex gap-3 items-center">
              <div className="relative w-[130px] h-[88px] bg-slate-300 rounded-[var(--radius-md)] flex-shrink-0 flex items-center justify-center text-xs text-slate-500">
                <span className="absolute top-0 left-0 bg-[#F5A623] text-white font-bold text-xs w-6 h-6 flex items-center justify-center rounded-tl-[var(--radius-md)] rounded-br-[var(--radius-md)]">
                  1
                </span>
                画像
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-[14px] truncate">極上アロマ 恵比寿本店</div>
                <div className="text-[12px] text-[var(--color-text-sub)] truncate mt-0.5">恵比寿 / 完全個室プライベートサロン</div>
                <div className="text-[12px] text-[var(--color-accent-promo)] font-bold mt-1 truncate">初回限定 2,000円OFF</div>
                <div className="flex items-center justify-end gap-3 mt-1 text-[12px] font-bold">
                  <span className="text-[var(--color-accent-like)]">👍 2,530</span>
                  <span className="text-[var(--color-accent-star)]">★ 4.9</span>
                </div>
              </div>
            </div>

            {/* 2位 */}
            <div className="p-4 flex gap-3 items-center">
              <div className="relative w-[130px] h-[88px] bg-slate-300 rounded-[var(--radius-md)] flex-shrink-0 flex items-center justify-center text-xs text-slate-500">
                <span className="absolute top-0 left-0 bg-slate-400 text-white font-bold text-xs w-6 h-6 flex items-center justify-center rounded-tl-[var(--radius-md)] rounded-br-[var(--radius-md)]">
                  2
                </span>
                画像
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-[14px] truncate">高級メンズスパ 六本木</div>
                <div className="text-[12px] text-[var(--color-text-sub)] truncate mt-0.5">六本木 / アロマオイルセラピー</div>
                <div className="text-[12px] text-[var(--color-accent-promo)] font-bold mt-1 truncate">ポイント5倍キャンペーン中</div>
                <div className="flex items-center justify-end gap-3 mt-1 text-[12px] font-bold">
                  <span className="text-[var(--color-accent-like)]">👍 1,890</span>
                  <span className="text-[var(--color-accent-star)]">★ 4.8</span>
                </div>
              </div>
            </div>

            {/* 3位 */}
            <div className="p-4 flex gap-3 items-center">
              <div className="relative w-[130px] h-[88px] bg-slate-300 rounded-[var(--radius-md)] flex-shrink-0 flex items-center justify-center text-xs text-slate-500">
                <span className="absolute top-0 left-0 bg-[#B87333] text-white font-bold text-xs w-6 h-6 flex items-center justify-center rounded-tl-[var(--radius-md)] rounded-br-[var(--radius-md)]">
                  3
                </span>
                画像
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-[14px] truncate">和風ヒーリング 浅草</div>
                <div className="text-[12px] text-[var(--color-text-sub)] truncate mt-0.5">浅草 / 落ち着いた和風空間</div>
                <div className="text-[12px] text-[var(--color-accent-promo)] font-bold mt-1 truncate">指名料無料特典</div>
                <div className="flex items-center justify-end gap-3 mt-1 text-[12px] font-bold">
                  <span className="text-[var(--color-accent-like)]">👍 1,240</span>
                  <span className="text-[var(--color-accent-star)]">★ 4.7</span>
                </div>
              </div>
            </div>
          </div>

          {/* 全幅CTAボタン */}
          <div className="p-4 bg-white">
            <button className="w-full h-12 bg-[var(--color-primary)] text-white font-bold text-sm rounded-[var(--radius-md)] flex items-center justify-center gap-1 hover:opacity-90">
              ランキングの続きを見る ＞
            </button>
          </div>
        </section>

        {/* 4.11 フッター */}
        <footer className="bg-[var(--color-primary-dark)] text-white p-6 mt-6">
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="bg-white/10 p-3 rounded-[var(--radius-lg)] text-xs font-bold text-center border border-white/20">
              公式SNSはこちら
            </button>
            <button className="bg-white/10 p-3 rounded-[var(--radius-lg)] text-xs font-bold text-center border border-white/20">
              ご利用ガイド
            </button>
            <button className="bg-white/10 p-3 rounded-[var(--radius-lg)] text-xs font-bold text-center border border-white/20">
              店舗掲載のお問合せ
            </button>
            <button className="bg-white/10 p-3 rounded-[var(--radius-lg)] text-xs font-bold text-center border border-white/20">
              ヘルプ・FAQ
            </button>
          </div>
          
          <div className="text-[11px] text-white/70 text-center space-y-2 border-t border-white/20 pt-4">
            <p>※当サイトは18歳未満の方のご利用・閲覧を固く禁じます。</p>
            <p>© エステポケット All Rights Reserved.</p>
          </div>
        </footer>
      </main>

      {/* 4.2 下部タブバー */}
      <TabBar />
    </div>
  );
}