import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// クライアントコンポーネントのインポート
import DetailAppBarClient from './DetailAppBarClient';
import StatActionClient from './StatActionClient';
import StickyCtaClient from './StickyCtaClient';

// 型定義
type TherapistDetail = {
  id: string;
  name: string;
  kanaName?: string;
  shopId: string;
  shopName: string;
  images: { src: string; alt: string }[];
  status: 'available' | 'working' | 'off';
  todayHours?: string;
  specs: {
    height?: number;
    bust?: number;
    cup?: string;
    waist?: number;
    hip?: number;
  };
  stats: {
    nominations: number;
    likes: number;
    favorites: number;
  };
  introText: string;
  shopComment?: string;
  tags: { label: string; brand?: boolean }[];
  schedules: {
    date: string;
    dayOfWeek: string;
    status: 'working' | 'off' | 'undecided';
    timeSlot?: string;
    isToday?: boolean;
  }[];
  reviews: {
    id: string;
    rating: number;
    date: string;
    author: string;
    content: string;
  }[];
  otherTherapists: {
    id: string;
    name: string;
    image: string;
    statusText?: string;
  }[];
};

// ダミーデータ取得関数 (実装時は API / DB 呼び出しに置き換え)
async function getTherapist(id: string): Promise<TherapistDetail | null> {
  if (id === 'not-found') return null;

  return {
    id,
    name: '愛沢 みなみ',
    kanaName: 'あいざわ みなみ',
    shopId: 'shop-001',
    shopName: 'アロマプレミアム 渋谷店',
    images: [
      { src: '/images/therapists/sample1.jpg', alt: '愛沢みなみ メイン写真' },
      { src: '/images/therapists/sample2.jpg', alt: '愛沢みなみ サブ写真1' },
    ],
    status: 'working',
    todayHours: '13:00〜21:00 (空き枠あり)',
    specs: {
      height: 162,
      bust: 85,
      cup: 'D',
      waist: 58,
      hip: 86,
    },
    stats: {
      nominations: 342,
      likes: 1250,
      favorites: 480,
    },
    introText:
      '初めまして、愛沢みなみです！心を込めた丁寧な施術で、日頃の疲れやストレスをしっかりほぐします。まったりした空間で一緒に癒やされましょう。お待ちしております♪',
    shopComment:
      '店長推薦！圧倒的な技術力と、細やかな心配りでリピート率No.1の人気セラピストです。初心者の方も安心してご指名ください。',
    tags: [
      { label: 'ポータル限定', brand: true },
      { label: '癒やし系' },
      { label: '施術重視' },
      { label: '接客定評' },
    ],
    schedules: [
      { date: '2026-09-20', dayOfWeek: '9/20(日)', status: 'working', timeSlot: '13:00~21:00', isToday: true },
      { date: '2026-09-21', dayOfWeek: '9/21(月)', status: 'working', timeSlot: '14:00~22:00' },
      { date: '2026-09-22', dayOfWeek: '9/22(火)', status: 'off' },
      { date: '2026-09-23', dayOfWeek: '9/23(水)', status: 'working', timeSlot: '12:00~20:00' },
      { date: '2026-09-24', dayOfWeek: '9/24(木)', status: 'off' },
      { date: '2026-09-25', dayOfWeek: '9/25(金)', status: 'working', timeSlot: '15:00~23:00' },
      { date: '2026-09-26', dayOfWeek: '9/26(土)', status: 'undecided' },
    ],
    reviews: [
      {
        id: 'rev-1',
        rating: 5.0,
        date: '2026-09-18',
        author: 'ゲストさん',
        content: '笑顔がとても素敵で、最初のカウンセリングから安心できました。オイルトリートメントの手圧が絶妙で、肩こりが一気に楽になりました。また必ず指名します！',
      },
      {
        id: 'rev-2',
        rating: 4.8,
        date: '2026-09-10',
        author: 'K.Tさん',
        content: '評判通り素晴らしい接客と技術でした。会話のペースも心地よく、リフレッシュできる時間を過ごせました。',
      },
    ],
    otherTherapists: [
      { id: 'th-02', name: '白石 つばさ', image: '/images/therapists/sample3.jpg', statusText: '本日出勤中' },
      { id: 'th-03', name: '七瀬 あおい', image: '/images/therapists/sample4.jpg', statusText: '18時〜空きあり' },
      { id: 'th-04', name: '桐谷 遥', image: '/images/therapists/sample5.jpg', statusText: '明月出勤' },
    ],
  };
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const therapist = await getTherapist(params.id);
  if (!therapist) return { title: 'セラピストが見つかりません' };

  return {
    title: `${therapist.name}（${therapist.shopName}）| メンズエステポータル`,
    description: `${therapist.shopName}所属のセラピスト「${therapist.name}」のプロフィール、出勤スケジュール、口コミ評価情報です。`,
  };
}

export default async function TherapistDetailPage({ params }: { params: { id: string } }) {
  const therapist = await getTherapist(params.id);

  if (!therapist) {
    notFound();
  }

  // スペック文字列の生成
  const specParts = [];
  if (therapist.specs.height) specParts.push(`T${therapist.specs.height}`);
  if (therapist.specs.bust) specParts.push(`B${therapist.specs.bust}${therapist.specs.cup ? `(${therapist.specs.cup})` : ''}`);
  if (therapist.specs.waist) specParts.push(`W${therapist.specs.waist}`);
  if (therapist.specs.hip) specParts.push(`H${therapist.specs.hip}`);
  const specText = specParts.join(' / ');

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] pb-[calc(var(--tabbar-h)+16px)]">
      {/* 4.13 Detail App Bar (スクロール固定・背景連動) */}
      <DetailAppBarClient title={`${therapist.shopName} / ${therapist.name}`} />

      {/* PC版(lg: 1024px) 2カラムレイアウトコンテナ */}
      <div className="max-w-[1024px] mx-auto lg:px-4 lg:pt-4 lg:flex lg:gap-8">
        
        {/* 【メインカラム】(スマホ時 100% / PC時 幅 68%) */}
        <main className="lg:w-[68%] flex-1">
          
          {/* 4.25 Profile Header Block */}
          <section className="relative">
            {/* メイン写真 (比率 3:4) */}
            <div className="relative w-full aspect-[3/4] bg-[var(--color-bg-sub)]">
              <Image
                src={therapist.images[0].src}
                alt={therapist.images[0].alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 680px"
                className="object-cover"
              />
            </div>

            {/* プロフィール基本情報 */}
            <div className="p-4 bg-[var(--color-bg)]">
              {/* 出勤状況バッジ (4.19拡張) */}
              {therapist.todayHours && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-pill)] bg-[var(--color-primary-light)] text-[var(--color-primary)] text-[12px] font-bold mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-success)] animate-pulse" />
                  <span>[出勤中] {therapist.todayHours}</span>
                </div>
              )}

              {/* 名前表記 */}
              <h1 className="text-[20px] font-bold text-[var(--color-primary)] leading-tight">
                {therapist.name}
                {therapist.kanaName && (
                  <span className="block text-[12px] font-normal text-[var(--color-text-sub)] mt-0.5">
                    {therapist.kanaName}
                  </span>
                )}
              </h1>

              {/* 所属店舗リンク */}
              <div className="mt-1">
                <Link
                  href={`/shops/${therapist.shopId}`}
                  className="text-[13px] font-bold text-[var(--color-primary)] hover:underline inline-flex items-center gap-1"
                >
                  <span>{therapist.shopName}</span>
                  <span className="text-[11px]">›</span>
                </Link>
              </div>

              {/* スペック表記 */}
              {specText && (
                <p className="mt-2 text-[13px] text-[var(--color-text-sub)] tracking-wide">
                  {specText}
                </p>
              )}
            </div>
          </section>

          {/* 4.9 Primary Large Button (スマホ用主CTA) */}
          <section className="px-4 py-2 lg:hidden">
            <a
              href={`tel:0000000000`}
              className="w-full h-[var(--btn-h-lg)] bg-[var(--color-primary)] text-white text-[16px] font-bold rounded-[var(--radius-md)] flex items-center justify-center gap-2 shadow-md active:bg-[var(--color-primary-dark)] transition-colors"
            >
              <span>このセラピストを指名して電話予約</span>
            </a>
          </section>

          {/* 4.15 Stat & Action Row */}
          <section className="px-4 py-3 border-b border-[var(--color-border)]">
            <StatActionClient
              nominations={therapist.stats.nominations}
              likes={therapist.stats.likes}
              favorites={therapist.stats.favorites}
            />
          </section>

          {/* 自己紹介 & 店舗コメント */}
          <section className="p-4 space-y-4">
            <div>
              <h2 className="text-[14px] font-bold text-[var(--color-text-sub)] mb-1.5">セラピストメッセージ</h2>
              <p className="text-[13px] leading-[1.6] whitespace-pre-wrap">{therapist.introText}</p>
            </div>

            {therapist.shopComment && (
              <div className="p-3 bg-[var(--color-bg-sub)] rounded-[var(--radius-md)] border border-[var(--color-border)]">
                <h3 className="text-[12px] font-bold text-[var(--color-primary)] mb-1">店舗からのコメント</h3>
                <p className="text-[12px] leading-[1.5] text-[var(--color-text)]">{therapist.shopComment}</p>
              </div>
            )}
          </section>

          {/* 4.17 Outline Chip (特徴タグ) */}
          {therapist.tags.length > 0 && (
            <section className="px-4 pb-4 flex flex-wrap gap-2">
              {therapist.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className={`inline-flex items-center px-3 py-1.5 rounded-[var(--radius-md)] text-[14px] leading-none ${
                    tag.brand
                      ? 'border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-bold'
                      : 'border-2 border-[#888888] text-[var(--color-text-sub)]'
                  }`}
                >
                  {tag.label}
                </span>
              ))}
            </section>
          )}

          {/* 太線区切り（強: 4px primary） */}
          <div className="h-[4px] bg-[var(--color-primary)] w-full my-2" />

          {/* 4.26 Schedule Calendar Grid (出勤スケジュール) */}
          <section className="p-4">
            <h2 className="text-[17px] font-bold mb-3">出勤スケジュール</h2>
            <div className="grid grid-cols-7 gap-1 text-center text-[12px]">
              {therapist.schedules.map((sched, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-[var(--radius-sm)] flex flex-col items-center justify-between min-h-[72px] border ${
                    sched.isToday
                      ? 'bg-[var(--color-primary-light)] border-[var(--color-primary)] font-bold'
                      : sched.status === 'off'
                      ? 'bg-[var(--color-bg-sub)] border-transparent text-[var(--color-text-sub)]'
                      : 'bg-white border-[var(--color-border)]'
                  }`}
                >
                  <span className="text-[11px] font-medium border-b border-current pb-0.5 mb-1 w-full">
                    {sched.dayOfWeek}
                  </span>
                  {sched.status === 'working' ? (
                    <div className="my-auto">
                      <span className="block text-[var(--color-primary)] text-[10px] font-bold">出勤</span>
                      <span className="block text-[10px] leading-tight">{sched.timeSlot}</span>
                    </div>
                  ) : sched.status === 'off' ? (
                    <span className="my-auto text-[11px]">休み</span>
                  ) : (
                    <span className="my-auto text-[11px] text-[var(--color-text-sub)]">未定</span>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* 中区切り (--border-section: 2px) */}
          <div className="border-t-2 border-[var(--color-divider-strong)] my-2" />

          {/* 4.27 Voice / Review Card (口コミ・評価) */}
          <section className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[17px] font-bold">口コミ・評価</h2>
              <span className="text-[14px] font-bold text-[var(--color-accent-star)] flex items-center gap-1">
                ★ 5.0 <span className="text-[12px] text-[var(--color-text-sub)] font-normal">({therapist.reviews.length}件)</span>
              </span>
            </div>

            <div className="space-y-3">
              {therapist.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-3 bg-white border border-[var(--color-border)] rounded-[var(--radius-md)] text-[13px]"
                >
                  <div className="flex justify-between items-center mb-1 text-[12px]">
                    <span className="text-[var(--color-accent-star)] font-bold">
                      {'★'.repeat(Math.round(rev.rating))} {rev.rating.toFixed(1)}
                    </span>
                    <span className="text-[var(--color-text-sub)]">{rev.date}</span>
                  </div>
                  <div className="text-[11px] text-[var(--color-text-sub)] mb-1.5">投稿者: {rev.author}</div>
                  <p className="line-clamp-3 leading-[1.5] text-[var(--color-text)]">{rev.content}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 中区切り (--border-section: 2px) */}
          <div className="border-t-2 border-[var(--color-divider-strong)] my-2" />

          {/* 4.21 Recommend Row (この店舗の他のセラピスト) */}
          <section className="py-4">
            <h2 className="text-[17px] font-bold px-4 mb-3">この店舗の他のセラピスト</h2>
            <div className="flex gap-2.5 overflow-x-auto px-4 snap-x snap-mandatory scrollbar-none">
              {therapist.otherTherapists.map((other) => (
                <Link
                  key={other.id}
                  href={`/therapist/${other.id}`}
                  className="flex-none w-[134px] snap-start group"
                >
                  <div className="relative w-[134px] h-[134px] rounded-[var(--radius-lg)] overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-sub)] mb-1.5">
                    <Image
                      src={other.image}
                      alt={other.name}
                      fill
                      sizes="134px"
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="text-[14px] font-bold truncate">{other.name}</div>
                  {other.statusText && (
                    <div className="text-[12px] font-bold text-[var(--color-accent-promo)] truncate">
                      {other.statusText}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </section>
        </main>

        {/* 【PC版 サイド追従カラム】(PC時のみ表示 幅 32%) */}
        <aside className="hidden lg:block lg:w-[32%]">
          <div className="sticky top-[72px] p-4 border border-[var(--color-border)] rounded-[var(--radius-lg)] bg-white space-y-4 shadow-sm">
            <div>
              <div className="text-[12px] text-[var(--color-text-sub)]">所属店舗</div>
              <Link href={`/shops/${therapist.shopId}`} className="text-[16px] font-bold text-[var(--color-primary)] hover:underline">
                {therapist.shopName}
              </Link>
            </div>

            <div className="border-t border-[var(--color-border)] pt-3">
              <a
                href={`tel:0000000000`}
                className="w-full h-[var(--btn-h-lg)] bg-[var(--color-primary)] text-white text-[16px] font-bold rounded-[var(--radius-md)] flex items-center justify-center gap-2 shadow hover:bg-[var(--color-primary-dark)] transition-colors"
              >
                <span>このセラピストを指名して電話予約</span>
              </a>
            </div>

            <div className="text-[12px] text-[var(--color-text-sub)] space-y-1 bg-[var(--color-bg-sub)] p-3 rounded-[var(--radius-md)]">
              <div>本日の出勤: <span className="font-bold text-[var(--color-text)]">{therapist.todayHours || '休み'}</span></div>
              <div>指名料: <span className="font-bold text-[var(--color-text)]">店舗にてご確認ください</span></div>
            </div>
          </div>
        </aside>
      </div>

      {/* 4.20 Sticky CTA Bar (モバイル用画面下部追従) */}
      <StickyCtaClient therapistName={therapist.name} />
    </div>
  );
}