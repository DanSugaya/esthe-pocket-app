import { AppBar } from '@/components/AppBar';
import { TabBar } from '@/components/TabBar';
import { SectionHeader } from '@/components/SectionHeader';

export default function Home() {
  return (
    <div className="min-h-screen bg-white max-w-[720px] mx-auto pb-[80px] pt-[56px]">
      {/* ヘッダー */}
      <AppBar />

      {/* メインコンテンツエリア */}
      <main>
        {/* ヒーロー領域（ダミーバナー） */}
        <div className="w-full h-[200px] bg-slate-200 flex items-center justify-center text-slate-500 font-bold border-b border-[var(--color-border)]">
          メインバナー領域 (16:10)
        </div>

        {/* セクション区切り太線 (4px primary) */}
        <div className="h-1 bg-[var(--color-primary)]" />

        {/* セクション1: おすすめ店舗 */}
        <SectionHeader title="大人気の店舗" />
        <div className="p-4 grid grid-cols-2 gap-3">
          {/* ダミー店舗カード 1 */}
          <div className="border border-[var(--color-border)] rounded-[var(--radius-md)] overflow-hidden bg-white">
            <div className="w-full aspect-[16/9] bg-slate-300 flex items-center justify-center text-xs text-slate-500">
              店舗画像
            </div>
            <div className="p-2">
              <div className="font-bold text-[14px] truncate">アロマリラクゼーション 渋谷店</div>
              <div className="text-[12px] text-[var(--color-text-sub)] truncate mt-1">渋谷 / 90分 12,000円〜</div>
            </div>
          </div>

          {/* ダミー店舗カード 2 */}
          <div className="border border-[var(--color-border)] rounded-[var(--radius-md)] overflow-hidden bg-white">
            <div className="w-full aspect-[16/9] bg-slate-300 flex items-center justify-center text-xs text-slate-500">
              店舗画像
            </div>
            <div className="p-2">
              <div className="font-bold text-[14px] truncate">メンズスパ 新宿</div>
              <div className="text-[12px] text-[var(--color-text-sub)] truncate mt-1">新宿 / 60分 9,000円〜</div>
            </div>
          </div>
        </div>

        {/* セクション区切り太線 */}
        <div className="h-1 bg-[var(--color-primary)]" />

        {/* セクション2: 本日の出勤 */}
        <SectionHeader title="本日の出勤セラピスト" />
        <div className="p-4 text-sm text-[var(--color-text-sub)] text-center py-8">
          ここにセラピストの横スクロールリストが入ります
        </div>
      </main>

      {/* 下部タブバー */}
      <TabBar />
    </div>
  );
}