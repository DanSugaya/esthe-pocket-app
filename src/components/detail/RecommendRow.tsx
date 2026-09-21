import Link from 'next/link';
import { SectionHeader } from '../SectionHeader';
import { Thumb } from '../Thumb';

export type RecommendItem = { id: string; href: string; name: string; image: string; promo?: string };

/** §4.21 おすすめ横スクロール(3枚目が見切れる幅) */
export function RecommendRow({ title, items }: { title: string; items: RecommendItem[] }) {
  return (
    <section className="pb-4">
      <SectionHeader title={title} diamond={false} border={false} />
      <ul className="scrollbar-none flex snap-x snap-proximity scroll-px-4 gap-2.5 overflow-x-auto px-4">
        {items.map((item) => (
          <li key={item.id} className="w-[134px] shrink-0 snap-start">
            <Link href={item.href} className="press block">
              <Thumb src={item.image} alt="" sizes="134px" radius="lg" className="h-[134px] w-[134px]" />
              <p className="mt-2 truncate text-title font-bold">{item.name}</p>
              {item.promo && <p className="mt-0.5 truncate text-caption font-bold text-esthe-promo">{item.promo}</p>}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
