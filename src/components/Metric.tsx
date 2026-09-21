import { Star, ThumbsUp } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

const META = {
  like: { Icon: ThumbsUp, color: 'text-esthe-like', label: 'いいね' },
  favorite: { Icon: Star, color: 'text-esthe-star', label: 'お気に入り' },
} as const;

/** いいね(赤)/ お気に入り(オレンジ)の指標。size="lg" は詳細ページの指標行(§4.15) */
export function Metric({ kind, value, size = 'sm' }: { kind: keyof typeof META; value: number; size?: 'sm' | 'lg' }) {
  const { Icon, color, label } = META[kind];
  const lg = size === 'lg';

  return (
    <span className={`inline-flex items-center gap-1 font-bold leading-none tabular-nums ${color} ${lg ? 'text-stat' : 'text-title'}`}>
      <Icon size={lg ? 20 : 16} fill={kind === 'favorite' ? 'currentColor' : 'none'} aria-hidden="true" />
      <span className="sr-only">{label}</span>
      <span className={lg ? 'text-esthe-text' : ''}>{formatNumber(value)}</span>
    </span>
  );
}
