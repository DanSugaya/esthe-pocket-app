import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Phone } from 'lucide-react';
import { ButtonLink } from '@/components/Buttons';
import { OutlineChip } from '@/components/Chip';
import { Divider } from '@/components/Divider';
import { ReviewSection } from '@/components/Review';
import { SectionHeader } from '@/components/SectionHeader';
import { TherapistRow } from '@/components/TherapistCard';
import { DetailAppBar } from '@/components/detail/DetailAppBar';
import { DetailFloating } from '@/components/detail/DetailFloating';
import { EngagementProvider } from '@/components/detail/EngagementProvider';
import { HeroCarousel } from '@/components/detail/HeroCarousel';
import { PRIMARY_CTA_ID } from '@/components/detail/ids';
import { RecommendRow } from '@/components/detail/RecommendRow';
import { StatActionRow } from '@/components/detail/StatActionRow';
import { SHOPS, getShopDetail } from '@/lib/mock';
import type { ShopSummary } from '@/lib/types';
import { formatYen, sortTherapists } from '@/lib/utils';

const toRecommendItems = (shops: ShopSummary[]) =>
  shops.slice(0, 3).map((s) => ({ id: s.id, href: `/shops/${s.id}`, name: s.name, image: s.image, promo: s.promo }));

export async function generateMetadata({ params }: PageProps<'/shops/[id]'>): Promise<Metadata> {
  const { id } = await params;
  const shop = getShopDetail(id);
  if (!shop) return { title: '店舗が見つかりません' };
  // §6.7 「{店舗名}|{エリア}のメンズエステ|{サイト名}」(サイト名は layout の template が付ける)
  return { title: `${shop.name}|${shop.area}のメンズエステ`, description: `${shop.name}の出勤情報・料金・口コミをご案内します。` };
}

export default async function ShopDetailPage({ params }: PageProps<'/shops/[id]'>) {
  const { id } = await params;
  const shop = getShopDetail(id);
  if (!shop) notFound();

  const others = SHOPS.filter((s) => s.id !== shop.id);
  const sameArea = others.filter((s) => s.area === shop.area);
  const therapists = sortTherapists(shop.therapists);
  const workingCount = therapists.filter((t) => t.status !== 'off').length;

  const infoRows = [
    { label: '住所', value: shop.address },
    { label: 'アクセス', value: `${shop.station} 徒歩${shop.walkMin}分` },
    { label: '営業時間', value: `${shop.hours.open}〜${shop.hours.close}${shop.hours.note ? `(${shop.hours.note})` : ''}` },
    { label: '定休日', value: shop.closedDays },
    {
      label: '電話番号',
      value: (
        <a href={`tel:${shop.tel}`} className="font-bold text-esthe-primary">
          {shop.tel}
        </a>
      ),
    },
    { label: '届出情報', value: shop.registrationInfo },
  ];

  return (
    <>
      <DetailAppBar title={shop.name} />

      <EngagementProvider initialLikes={shop.likes} initialFavorites={shop.favorites}>
        <main>
          <HeroCarousel images={shop.heroImages} />

          {/* §4.14 お知らせ帯 */}
          <Link href="#therapists" className="flex h-10 items-center justify-between gap-2 border-b border-esthe-border px-4">
            <span className="flex min-w-0 items-center gap-2">
              <span className="shrink-0 rounded-full bg-esthe-promo px-2.5 py-1 text-badge font-bold text-white">更新</span>
              <span className="truncate text-body">{shop.notice}</span>
            </span>
            <ChevronRight size={20} aria-hidden="true" className="shrink-0 text-esthe-muted" />
          </Link>

          {/* 主CTA(DetailFloating がこの id を監視して追従バーを出し入れする) */}
          <div className="space-y-2 px-4 pt-4">
            <ButtonLink id={PRIMARY_CTA_ID} href={`tel:${shop.tel}`} icon={<Phone size={20} aria-hidden="true" />}>
              電話で予約する
            </ButtonLink>
            {shop.webReservationUrl && (
              <ButtonLink href={shop.webReservationUrl} variant="outline">
                Web予約
              </ButtonLink>
            )}
          </div>

          <StatActionRow notes={[`営業時間:${shop.hours.open}〜${shop.hours.close}`, `定休日:${shop.closedDays}`]} />

          {/* §4.16 店舗名・メタ情報 + §4.17 特徴タグ */}
          <div className="px-4 pb-4">
            <h1 className="text-h1 font-bold text-esthe-primary">{shop.name}</h1>
            <p className="mt-2 text-title font-bold">
              {shop.area} ／ {shop.station} 徒歩{shop.walkMin}分{shop.operator && ` ／ 運営:${shop.operator}`}
            </p>
            <Link href="#info-section" className="mt-1 inline-flex items-center text-title text-esthe-caption">
              店舗詳細情報
              <ChevronRight size={16} aria-hidden="true" />
            </Link>
            <ul className="mt-3 flex flex-wrap gap-2">
              {shop.tags.map((tag) => (
                <li key={tag.label}>
                  <OutlineChip brand={tag.brand}>{tag.label}</OutlineChip>
                </li>
              ))}
            </ul>
          </div>

          <Divider level="strong" />

          {/* セラピスト一覧(最大4行) */}
          {therapists.length > 0 && (
            <section id="therapists">
              <SectionHeader title={`セラピスト全${therapists.length}名`} sub={`本日出勤${workingCount}名`} diamond={false} />
              <ul>
                {therapists.slice(0, 4).map((t) => (
                  <li key={t.id}>
                    <TherapistRow therapist={t} />
                  </li>
                ))}
              </ul>
              {therapists.length > 4 && (
                <div className="px-4 py-3">
                  <ButtonLink href={`/shops/${shop.id}/therapists`} variant="outline" chevron>
                    全{therapists.length}名を表示する
                  </ButtonLink>
                </div>
              )}
              <Divider />
            </section>
          )}

          {/* §4.24 料金表 */}
          <section id="price-section" className="pb-4">
            <SectionHeader title="料金・コース" diamond={false} border={false} />
            <table className="w-full border-collapse px-4">
              <caption className="sr-only">コース料金一覧</caption>
              <tbody>
                {shop.courses.map((course) => (
                  <tr key={course.id} className="border-b border-esthe-border">
                    <th scope="row" className="py-3 pl-4 text-left align-top font-normal">
                      <span className="block text-title font-bold">{course.name}</span>
                      <span className="block text-caption text-esthe-caption">{course.minutes}分</span>
                    </th>
                    <td className="py-3 pr-4 text-right align-top text-title font-bold tabular-nums">
                      {course.discountedPrice ? (
                        <>
                          <span className="mr-1 text-badge font-normal text-esthe-muted line-through">{formatYen(course.price)}</span>
                          <span className="text-esthe-promo">{formatYen(course.discountedPrice)}</span>
                        </>
                      ) : (
                        formatYen(course.price)
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-2 px-4 text-badge text-esthe-caption">※表示価格はすべて税込です。指名料は別途かかります。</p>
          </section>

          <Divider />
          <ReviewSection {...shop.reviews} moreHref={`/shops/${shop.id}/reviews`} />
          <Divider />

          {/* §4.23 店舗情報 */}
          <section id="info-section" className="pb-4">
            <SectionHeader title="店舗情報" diamond={false} border={false} />
            <table className="w-full border-collapse text-body">
              <tbody>
                {infoRows.map((row) => (
                  <tr key={row.label} className="border-b border-esthe-border">
                    <th scope="row" className="w-24 py-3 pl-4 text-left align-top font-normal text-esthe-caption">
                      {row.label}
                    </th>
                    <td className="py-3 pr-4">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <Divider />
          <RecommendRow title="この店舗を見た人はこちらも" items={toRecommendItems(others)} />
          {sameArea.length > 0 && (
            <>
              <Divider />
              <RecommendRow title="同じエリアの店舗" items={toRecommendItems(sameArea)} />
            </>
          )}
        </main>

        <DetailFloating tel={shop.tel} coupons={shop.coupons} />
      </EngagementProvider>
    </>
  );
}
