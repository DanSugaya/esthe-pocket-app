import { Gift } from 'lucide-react';
import type { TherapistStatus } from '@/lib/types';

/* §4.19 Status Circle と同じ色・文言。色だけでなく必ずテキストを併記する */

const STATUS: Record<TherapistStatus, { label: string; color: string }> = {
  available: { label: '空き', color: 'bg-esthe-success' },
  working: { label: '出勤中', color: 'bg-esthe-primary' },
  full: { label: '満席', color: 'bg-esthe-off' },
  off: { label: '休み', color: 'bg-esthe-off' },
};

/** リスト行の右端に置く 52px の丸 */
export function StatusCircle({ status, nextSlot }: { status: TherapistStatus; nextSlot?: string }) {
  const { label, color } = STATUS[status];
  return (
    <span
      className={`flex h-[var(--size-status)] w-[var(--size-status)] shrink-0 flex-col items-center justify-center rounded-full text-center text-badge font-bold leading-tight text-white ${color}`}
    >
      <span>{label}</span>
      {status === 'available' && nextSlot && <span>{nextSlot}</span>}
    </span>
  );
}

/** カード上・見出し横に置く小さなピル */
export function StatusBadge({ status, nextSlot }: { status: TherapistStatus; nextSlot?: string }) {
  const { label, color } = STATUS[status];
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-badge font-bold text-white ${color}`}>
      {status === 'available' && nextSlot ? `${label} ${nextSlot}` : label}
    </span>
  );
}

/** 店舗の営業状況(営業中 = success / 受付終了 = グレー) */
export function OpenBadge({ isOpen }: { isOpen: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-badge font-bold text-white ${
        isOpen ? 'bg-esthe-success' : 'bg-esthe-off'
      }`}
    >
      {isOpen ? '営業中' : '受付終了'}
    </span>
  );
}

/** サムネイル下端の黄帯(§4.18)。Thumb の children に置く */
export function CouponBand({ label = 'クーポンあり' }: { label?: string }) {
  return (
    <span className="absolute inset-x-0 bottom-0 flex h-5 items-center justify-center gap-1 bg-esthe-point text-badge font-bold text-esthe-text">
      <Gift size={12} aria-hidden="true" />
      {label}
    </span>
  );
}
