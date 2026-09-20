import { cache } from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import DetailAppBarClient from './DetailAppBarClient';
import StatActionClient from './StatActionClient';
import StickyCtaClient from './StickyCtaClient';
import { TherapistActionsProvider } from './TherapistActionsProvider';

type TherapistStatus = 'available' | 'working' | 'off';

type TherapistDetail = {
  id: string;
  name: string;
  kanaName?: string;
  shopId: string;
  shopName: string;
  tel: string;
  images: { src: string; alt: string }[];
  status: TherapistStatus;
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

// generateMetadata と Page で2回呼ばれるため、リクエスト内でキャッシュする
const getTherapist = cache(async (id: string): Promise<TherapistDetail | null> => {
  if (id === 'not-found') return null;

  return {
    id,
    name: '愛沢 みなみ',
    kanaName: 'あいざわ みなみ',
    shopId: 'shop-001',
    shopName: 'アロマプレミアム 渋谷店',
    tel: '0300000000',
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
    // 「No.1」は根拠の明示がない限り使わない(designsystem §9)
    shopComment:
      '技術力と細やかな心配りで、リピートのお客様が多い人気セラピストです。初心者の方も安心してご指名ください。',
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
      { id: 'th-04', name: '桐谷 遥', image: '/images/therapists/sample5.jpg', statusText: '明日出勤' },
    ],
  };
});

// 4.19 Status Circle と同じ色・文言(色だけに頼らずテキストを併記)
const STATUS_LABEL: Record<TherapistStatus, string> = {
  available: '空きあり',
  working: '出勤中',
  off: '休み',
};
const STATUS_STYLE: Record<TherapistStatus, string> = {
  available: 'bg-[var(--color-success)]',
  working: 'bg-[var(--color-primary)]',
  off: 'bg-[#BDBDBD]',
};

// 4.9 Primary Large
const PRIMARY_CTA =
  'w-full h-[var(--btn-h-lg)] bg-[var(--color-primary)] text-white text-[16px] font-bold ' +
  'rounded-[var(--radius-md)] flex items-center justify-center gap-2 transition-colors ' +
  'hover:bg-[var(--color-primary-dark)] active:bg-[var(--color-primary-dark)] ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'focus-visible:outline-[color:var(--color-primary)]';

const CTA_LABEL = '指名して電話で予約する';

// スクロールバー非表示(プラグイン不要の書き方)
const HIDE_SCROLLBAR = '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const therapist = await getTherapist(id);
  if (!therapist) return { title: 'セラピストが見つかりません' };

  return {
    title: `${therapist.name}（${therapist.shopName}）| エステポケット`,
    description: `${therapist.shopName}所属のセラピスト「${therapist.name}」のプロフィール情報です。`,
  };
}

export default async function TherapistDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const therapist = await getTherapist(id);

  if (!therapist) {
    notFound();
  }

  const specParts: string[] = [];
  if (therapist.specs.height) specParts.push(`T${therapist.specs.height}`);
  if (therapist.specs.bust)
    specParts.push(
      `B${therapist.specs.bust}${therapist.specs.cup ? `(${therapist.specs.cup})` : ''}`
    );
  if (therapist.specs.waist) specParts.push(`W${therapist.specs.waist}`);
  if (therapist.specs.hip) specParts.push(`H${therapist.specs.hip}`);
  const specText = specParts.join(' / ');

  // 口コミ平均は実データから算出する(固定値の「5.0」表示をやめる)
  const reviewCount = therapist.reviews.length;
  const avgRating =
    reviewCount > 0
      ? therapist.reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
      : null;

  // 4.15 の補足行(最大2行)
  const statNotes = [
    therapist.todayHours ? `本日の出勤: ${therapist.todayHours}` : null,
    `累計指名: ${therapist.stats.nominations.toLocaleString()}回`,
  ].filter((v): v is string => v !== null);

  return (
    <TherapistActionsProvider
      initialLikes={therapist.stats.likes}
      initialFavorites={therapist.stats.favorites}
      loginHref="/login"
      // 認証・API を用意したら isLoggedIn と Server Action(onToggleLike / onToggleFavorite)を渡す
    >
      <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] pb-[calc(var(--tabbar-h,64px)+var(--sticky-cta-h,56px)+16px+env(safe-area-inset-bottom))] lg:pb-8">
        {/* 4.13 Detail App Bar(ヒーロー下端の番兵 #hero-sentinel を監視) */}
        <DetailAppBarClient title={`${therapist.shopName} / ${therapist.name}`} />

        {/* PC版 2カラムレイアウトコンテナ */}
        <div className="max-w-[1024px] mx-auto lg:px-4 lg:pt-4 lg:flex lg:gap-8">
          {/* メインカラム */}
          <main className="lg:w-[68%] flex-1 min-w-0">
            {/* 4.25 Profile Header Block */}
            <section>
              {/* メイン写真 */}
              <div className="relative w-full aspect-[3/4] lg:aspect-[4/3] bg-[var(--color-bg-sub)]">
                <Image
                  src={therapist.images[0].src}
                  alt={therapist.images[0].alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 680px"
                  className="object-cover"
                />
                {/* DetailAppBarClient が監視する番兵 */}
                <div
                  id="hero-sentinel"
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px"
                />
              </div>

              {/* 基本情報 */}
              <div className="p-4 bg-[var(--color-bg)]">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`inline-flex items-center rounded-[var(--radius-pill)] px-2.5 py-1 text-[11px] font-bold leading-none text-white ${STATUS_STYLE[therapist.status]}`}
                  >
                    {STATUS_LABEL[therapist.status]}
                  </span>
                  {therapist.todayHours && (
                    <span className="text-[13px] font-bold">{therapist.todayHours}</span>
                  )}
                </div>

                <h1 className="text-[20px] font-bold text-[var(--color-primary)] leading-[1.4]">
                  {therapist.name}
                </h1>
                {therapist.kanaName && (
                  <p className="text-[12px] text-[var(--color-text-sub)] mt-0.5">
                    {therapist.kanaName}
                  </p>
                )}

                <div className="mt-1">
                  <Link
                    href={`/shops/${therapist.shopId}`}
                    className="text-[13px] font-bold text-[var(--color-primary)] hover:underline inline-flex items-center gap-1"
                  >
                    <span>{therapist.shopName}</span>
                    <span className="text-[11px]" aria-hidden="true">›</span>
                  </Link>
                </div>

                {specText && (
                  <p className="mt-2 text-[13px] text-[var(--color-text-sub)] tracking-wide">
                    {specText}
                  </p>
                )}
              </div>
            </section>

            {/* モバイル用主CTA(StickyCtaClient がこの id を監視) */}
            <section className="px-4 py-2 lg:hidden">
              <a id="primary-cta" href={`tel:${therapist.tel}`} className={PRIMARY_CTA}>
                <span>{CTA_LABEL}</span>
              </a>
            </section>

            {/* 4.15 Stat & Action Row(余白・下線はコンポーネント側が持つ) */}
            <section>
              <StatActionClient notes={statNotes} />
            </section>

            {/* 自己紹介 & 店舗コメント */}
            <section className="p-4 space-y-4">
              <div>
                <h2 className="text-[14px] font-bold text-[var(--color-text-sub)] mb-1.5">
                  セラピストメッセージ
                </h2>
                <p className="text-[13px] leading-[1.6] whitespace-pre-wrap">
                  {therapist.introText}
                </p>
              </div>

              {therapist.shopComment && (
                <div className="p-3 bg-[var(--color-bg-sub)] rounded-[var(--radius-md)] border border-[var(--color-border)]">
                  <h3 className="text-[12px] font-bold text-[var(--color-primary)] mb-1">
                    店舗からのコメント
                  </h3>
                  <p className="text-[12px] leading-[1.5] text-[var(--color-text)]">
                    {therapist.shopComment}
                  </p>
                </div>
              )}
            </section>

            {/* 4.17 特徴タグ */}
            {therapist.tags.length > 0 && (
              <section className="px-4 pb-4 flex flex-wrap gap-2">
                {therapist.tags.map((tag) => (
                  <span
                    key={tag.label}
                    className={`inline-flex items-center px-[14px] py-[6px] rounded-[var(--radius-md)] text-[14px] leading-none ${
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

            {/* 強区切り(4px primary)。余白は前後セクションの padding に任せる */}
            <div aria-hidden="true" className="h-[4px] bg-[var(--color-primary)] w-full" />

            {/* スケジュール(7日分を横スクロールにして、時間帯が潰れないようにする) */}
            <section className="py-4">
              <h2 className="text-[17px] font-bold mb-3 px-4">出勤スケジュール</h2>
              <ul
                tabIndex={0}
                aria-label="出勤スケジュール(横にスクロールできます)"
                className={`flex gap-2 overflow-x-auto px-4 ${HIDE_SCROLLBAR}`}
              >
                {therapist.schedules.map((sched) => (
                  <li
                    key={sched.date}
                    aria-current={sched.isToday ? 'date' : undefined}
                    className={`flex-none w-[84px] min-h-[80px] p-2 rounded-[var(--radius-md)] border text-center flex flex-col ${
                      sched.isToday
                        ? 'bg-[var(--color-primary-light)] border-[var(--color-primary)]'
                        : sched.status === 'off'
                        ? 'bg-[var(--color-bg-sub)] border-transparent text-[var(--color-text-sub)]'
                        : 'bg-white border-[var(--color-border)]'
                    }`}
                  >
                    <span className="block text-[12px] font-bold border-b border-current pb-1 mb-1">
                      {sched.dayOfWeek}
                    </span>
                    {sched.isToday && (
                      <span className="block text-[11px] font-bold text-[var(--color-primary)]">
                        本日
                      </span>
                    )}
                    {sched.status === 'working' ? (
                      <span className="my-auto">
                        <span className="block text-[11px] font-bold text-[var(--color-primary)]">
                          出勤
                        </span>
                        <span className="block text-[11px] leading-tight tabular-nums">
                          {sched.timeSlot}
                        </span>
                      </span>
                    ) : sched.status === 'off' ? (
                      <span className="my-auto text-[12px]">休み</span>
                    ) : (
                      <span className="my-auto text-[12px] text-[var(--color-text-sub)]">未定</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            {/* 中区切り */}
            <div aria-hidden="true" className="border-t-2 border-[var(--color-divider-strong)]" />

            {/* 口コミ */}
            <section className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-[17px] font-bold">口コミ・評価</h2>
                {avgRating !== null && (
                  <span className="text-[14px] font-bold text-[var(--color-accent-star)] flex items-center gap-1">
                    <span aria-hidden="true">★</span>
                    <span>{avgRating.toFixed(1)}</span>
                    <span className="text-[12px] text-[var(--color-text-sub)] font-normal">
                      ({reviewCount}件)
                    </span>
                  </span>
                )}
              </div>

              {reviewCount === 0 ? (
                <p className="text-[13px] leading-[1.6] text-[var(--color-text-sub)]">
                  まだ口コミがありません。最初の投稿者になりませんか?
                </p>
              ) : (
                <div className="space-y-3">
                  {therapist.reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-3 bg-white border border-[var(--color-border)] rounded-[var(--radius-md)] text-[13px]"
                    >
                      <div className="flex justify-between items-center mb-1 text-[12px]">
                        <span
                          role="img"
                          aria-label={`5点満点中${rev.rating.toFixed(1)}点`}
                          className="text-[var(--color-accent-star)] font-bold"
                        >
                          {'★'.repeat(Math.round(rev.rating))} {rev.rating.toFixed(1)}
                        </span>
                        <span className="text-[var(--color-text-sub)]">{rev.date}</span>
                      </div>
                      <div className="text-[11px] text-[var(--color-text-sub)] mb-1.5">
                        投稿者: {rev.author}
                      </div>
                      <p className="line-clamp-3 leading-[1.5] text-[var(--color-text)]">
                        {rev.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* 中区切り */}
            <div aria-hidden="true" className="border-t-2 border-[var(--color-divider-strong)]" />

            {/* 関連セラピスト(4.21 Recommend Row) */}
            <section className="py-4">
              <h2 className="text-[17px] font-bold px-4 mb-3">この店舗の他のセラピスト</h2>
              <div
                className={`flex gap-2.5 overflow-x-auto px-4 snap-x snap-proximity ${HIDE_SCROLLBAR}`}
              >
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
                        className="object-cover motion-safe:group-hover:scale-105 transition-transform duration-200"
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

          {/* PC版 サイド追従 */}
          <aside className="hidden lg:block lg:w-[32%]">
            <div className="sticky top-[72px] p-4 border border-[var(--color-border)] rounded-[var(--radius-lg)] bg-white space-y-4">
              <div>
                <div className="text-[12px] text-[var(--color-text-sub)]">所属店舗</div>
                <Link
                  href={`/shops/${therapist.shopId}`}
                  className="text-[16px] font-bold text-[var(--color-primary)] hover:underline"
                >
                  {therapist.shopName}
                </Link>
              </div>

              <div className="border-t border-[var(--color-border)] pt-3">
                <a href={`tel:${therapist.tel}`} className={PRIMARY_CTA}>
                  <span>{CTA_LABEL}</span>
                </a>
              </div>

              <div className="text-[12px] text-[var(--color-text-sub)] space-y-1 bg-[var(--color-bg-sub)] p-3 rounded-[var(--radius-md)]">
                <div>
                  本日の出勤:{' '}
                  <span className="font-bold text-[var(--color-text)]">
                    {therapist.todayHours || '休み'}
                  </span>
                </div>
                <div>
                  指名料:{' '}
                  <span className="font-bold text-[var(--color-text)]">
                    店舗にてご確認ください
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* モバイル用追従CTA(#primary-cta が画面外のときだけ表示) */}
        <StickyCtaClient tel={therapist.tel} />
      </div>
    </TherapistActionsProvider>
  );
}
