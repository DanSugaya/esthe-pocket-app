import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ButtonLink } from '@/components/Buttons';
import { OutlineChip } from '@/components/Chip';
import { Divider } from '@/components/Divider';
import { ReviewSection } from '@/components/Review';
import { SectionHeader } from '@/components/SectionHeader';
import { StatusBadge } from '@/components/Status';
import { DetailAppBar } from '@/components/detail/DetailAppBar';
import { DetailFloating } from '@/components/detail/DetailFloating';
import { EngagementProvider } from '@/components/detail/EngagementProvider';
import { HeroCarousel } from '@/components/detail/HeroCarousel';
import { PRIMARY_CTA_ID } from '@/components/detail/ids';
import { RecommendRow } from '@/components/detail/RecommendRow';
import { StatActionRow } from '@/components/detail/StatActionRow';
import { THERAPISTS, getTherapistDetail } from '@/lib/mock';
import type { ScheduleDay } from '@/lib/types';
import { formatNumber, therapistNote } from '@/lib/utils';

const CTA_LABEL = '指名して電話で予約する';

export async function generateMetadata({ params }: PageProps<'/therapist/[id]'>): Promise<Metadata> {
  const { id } = await params;
  const t = getTherapistDetail(id);
  if (!t) return { title: 'セラピストが見つかりません' };
  return { title: `${t.name}(${t.shopName})`, description: `${t.shopName}所属のセラピスト「${t.name}」のプロフィール情報です。` };
}

function ScheduleCell({ day }: { day: ScheduleDay }) {
  const tone = day.isToday
    ? 'border-esthe-primary bg-esthe-primary-light'
    : day.status === 'off'
      ? 'border-transparent bg-esthe-sub text-esthe-caption'
      : 'border-esthe-border bg-white';

  return (
    <li
      aria-current={day.isToday ? 'date' : undefined}
      className={`flex min-h-20 w-[84px] shrink-0 flex-col rounded-esthe-md border p-2 text-center ${tone}`}
    >
      <span className="mb-1 border-b border-current pb-1 text-caption font-bold">{day.label}</span>
      {day.isToday && <span className="text-badge font-bold text-esthe-primary">本日</span>}
      <span className="my-auto text-caption">
        {day.status === 'working' ? (
          <>
            <span className="block text-badge font-bold text-esthe-primary">出勤</span>
            <span className="block text-badge tabular-nums">{day.timeSlot}</span>
          </>
        ) : day.status === 'off' ? (
          '休み'
        ) : (
          '未定'
        )}
      </span>
    </li>
  );
}

export default async function TherapistDetailPage({ params }: PageProps<'/therapist/[id]'>) {
  const { id } = await params;
  const t = getTherapistDetail(id);
  if (!t) notFound();

  const others = THERAPISTS.filter((o) => o.shopId === t.shopId && o.id !== t.id);
  const reviewCount = t.reviews.length;
  const average = reviewCount ? t.reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount : 0;

  return (
    <>
      <DetailAppBar title={`${t.shopName} / ${t.name}`} />

      <EngagementProvider initialLikes={t.likes} initialFavorites={t.favorites}>
        <main>
          <HeroCarousel images={t.images} ratio="portrait" />

          {/* 基本情報 */}
          <div className="p-4">
            <div className="mb-2 flex items-center gap-2">
              <StatusBadge status={t.status} nextSlot={t.nextSlot} />
              {t.todayHours && <span className="text-body font-bold">{t.todayHours}</span>}
            </div>
            <h1 className="text-h1 font-bold text-esthe-primary">{t.name}</h1>
            <Link href={`/shops/${t.shopId}`} className="mt-1 inline-flex items-center gap-1 text-body font-bold text-esthe-primary">
              {t.shopName}
              <span aria-hidden="true">›</span>
            </Link>
            {t.specs && <p className="mt-2 text-body tracking-wide text-esthe-caption">{t.specs}</p>}
          </div>

          <div className="px-4 pb-2">
            <ButtonLink id={PRIMARY_CTA_ID} href={`tel:${t.tel}`}>
              {CTA_LABEL}
            </ButtonLink>
          </div>

          <StatActionRow
            notes={[...(t.todayHours ? [`本日の出勤:${t.todayHours}`] : []), `累計指名:${formatNumber(t.nominations)}回`]}
          />

          {/* メッセージ・店舗コメント */}
          <section className="space-y-4 p-4">
            <div>
              <h2 className="mb-1.5 text-title font-bold text-esthe-caption">セラピストメッセージ</h2>
              <p className="whitespace-pre-wrap text-body">{t.introText}</p>
            </div>
            {t.shopComment && (
              <div className="rounded-esthe-md border border-esthe-border bg-esthe-sub p-3">
                <h3 className="mb-1 text-caption font-bold text-esthe-primary">店舗からのコメント</h3>
                <p className="text-caption leading-normal">{t.shopComment}</p>
              </div>
            )}
          </section>

          <ul className="flex flex-wrap gap-2 px-4 pb-4">
            {t.tags.map((tag) => (
              <li key={tag.label}>
                <OutlineChip brand={tag.brand}>{tag.label}</OutlineChip>
              </li>
            ))}
          </ul>

          <Divider level="strong" />

          {/* 出勤スケジュール(7日分を横スクロール) */}
          <section className="pb-4">
            <SectionHeader title="出勤スケジュール" diamond={false} border={false} />
            <ul tabIndex={0} aria-label="出勤スケジュール(横にスクロールできます)" className="scrollbar-none flex gap-2 overflow-x-auto px-4">
              {t.schedule.map((day) => (
                <ScheduleCell key={day.label} day={day} />
              ))}
            </ul>
          </section>

          <Divider />
          <ReviewSection average={average} totalCount={reviewCount} items={t.reviews} />

          {others.length > 0 && (
            <>
              <Divider />
              <RecommendRow
                title="この店舗の他のセラピスト"
                items={others.map((o) => ({ id: o.id, href: `/therapist/${o.id}`, name: o.name, image: o.image, promo: therapistNote(o) }))}
              />
            </>
          )}
        </main>

        <DetailFloating tel={t.tel} ctaLabel={CTA_LABEL} />
      </EngagementProvider>
    </>
  );
}
