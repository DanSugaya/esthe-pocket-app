import { Star } from 'lucide-react';
import type { Review } from '@/lib/types';
import { ButtonLink } from './Buttons';
import { SectionHeader } from './SectionHeader';

function StarRating({ value }: { value: number }) {
  return (
    <span role="img" aria-label={`5点満点中${value}点`} className="flex text-esthe-star">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} size={14} fill={i < Math.round(value) ? 'currentColor' : 'none'} aria-hidden="true" />
      ))}
    </span>
  );
}

/** 口コミ(店舗・セラピスト共通)。平均星 + 件数 + 最新の口コミ(本文は3行省略) */
export function ReviewSection({
  average,
  totalCount,
  items,
  moreHref,
}: {
  average: number;
  totalCount: number;
  items: Review[];
  /** 掲載件数より多く口コミがある場合の「すべて見る」リンク先 */
  moreHref?: string;
}) {
  return (
    <section className="pb-4">
      <SectionHeader title="口コミ" diamond={false} border={false}>
        {totalCount > 0 && (
          <span className="flex items-center gap-1 text-title font-bold">
            <Star size={16} className="text-esthe-star" fill="currentColor" aria-hidden="true" />
            <span>{average.toFixed(1)}</span>
            <span className="text-caption font-normal text-esthe-caption">({totalCount}件)</span>
          </span>
        )}
      </SectionHeader>

      {items.length === 0 ? (
        <p className="px-4 text-body text-esthe-caption">まだ口コミがありません。最初の投稿者になりませんか?</p>
      ) : (
        <ul className="px-4">
          {items.map((review) => (
            <li key={review.id} className="border-b border-esthe-border py-3">
              <div className="flex items-center justify-between text-caption text-esthe-caption">
                <span className="font-bold text-esthe-text">{review.userName}</span>
                <span>{review.date}</span>
              </div>
              <div className="my-1">
                <StarRating value={review.rating} />
              </div>
              <p className="line-clamp-3 text-body">{review.comment}</p>
            </li>
          ))}
        </ul>
      )}

      {moreHref && totalCount > items.length && (
        <div className="px-4 pt-3">
          <ButtonLink href={moreHref} variant="outline" chevron>
            口コミをすべて見る
          </ButtonLink>
        </div>
      )}
    </section>
  );
}
