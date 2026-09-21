import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import type { Therapist } from '@/lib/types';
import { CouponBand, StatusBadge, StatusCircle } from './Status';
import { Thumb } from './Thumb';

/** §4.5 コンパクトカード(横スクロール用 108px) */
export function TherapistCompactCard({ therapist, shopName }: { therapist: Therapist; shopName: string }) {
  return (
    <Link href={`/therapist/${therapist.id}`} className="press block w-[108px]">
      <Thumb src={therapist.image} alt="" sizes="108px" className="h-[108px] w-[108px]">
        <span className="absolute left-1 top-1">
          <StatusBadge status={therapist.status} nextSlot={therapist.nextSlot} />
        </span>
      </Thumb>
      <p className="mt-2 truncate text-title font-bold">{therapist.name}</p>
      <p className="truncate text-caption text-esthe-caption">{shopName}</p>
    </Link>
  );
}

/** §4.18 リスト行(人物: 3:4 サムネ)+ §4.19 ステータス丸 */
export function TherapistRow({ therapist }: { therapist: Therapist }) {
  return (
    <Link
      href={`/therapist/${therapist.id}`}
      className="press flex h-[104px] items-center gap-3 border-b border-esthe-border px-2 py-2"
    >
      <Thumb src={therapist.image} alt="" sizes="72px" radius="sm" className="aspect-[3/4] w-[72px] shrink-0">
        {/* §4.7 UPリボン */}
        {therapist.isNew && (
          <span className="absolute left-0 top-0 rounded-br-esthe-sm bg-esthe-like px-1.5 py-0.5 text-badge font-bold text-white">
            UP
          </span>
        )}
        {therapist.hasCoupon && <CouponBand />}
      </Thumb>
      <div className="min-w-0 flex-1">
        <p className="truncate text-title font-bold">{therapist.name}</p>
        <p className="mt-3 flex items-center gap-1 text-btn font-bold tabular-nums text-esthe-caption">
          <MessageCircle size={16} fill="currentColor" aria-hidden="true" />
          <span className="sr-only">口コミ</span>
          {therapist.reviewCount}
        </p>
      </div>
      <StatusCircle status={therapist.status} nextSlot={therapist.nextSlot} />
    </Link>
  );
}
