import Link from "next/link";
import Image from "next/image";
import { AppBar } from "@/components/AppBar";
import { SectionHeader } from "@/components/SectionHeader";
import { TabBar } from "@/components/TabBar";
import { image } from "@/components/data";

const ranking = [
  { id: "1", name: "極上アロマ 恵比寿本店", area: "恵比寿", likes: 2530, favorites: 1204 },
  { id: "2", name: "高級メンズスパ 六本木", area: "六本木", likes: 1890, favorites: 968 },
  { id: "3", name: "和風ヒーリング 浅草", area: "浅草", likes: 1240, favorites: 702 },
];

export default function RankingPage() {
  return (
    <div className="min-h-screen pb-[calc(var(--tabbar-total)+16px)]">
      <AppBar />
      <main className="mx-auto max-w-[720px]">
        <SectionHeader title="ランキング" />
        <div className="px-4 py-3 text-[13px] text-[var(--color-text-caption)]">
          人気指標をもとにしたランキングです。
        </div>
        <ol>
          {ranking.map((item, index) => (
            <li key={item.id} className="border-b border-[var(--color-border)] px-4 py-3">
              <Link href={`/shops/${item.id}`} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[var(--color-primary)] text-sm font-bold text-white">
                  {index + 1}
                </span>
                <div className="relative h-[88px] w-[130px] shrink-0 overflow-hidden rounded-[var(--radius-md)]">
                  <Image src={image(item.area)} alt="" fill sizes="130px" className="object-cover" unoptimized />
                </div>
                <div className="min-w-0">
                  <h2 className="truncate text-[14px] font-bold">{item.name}</h2>
                  <p className="mt-1 text-[12px] text-[var(--color-text-caption)]">{item.area}</p>
                  <p className="mt-2 text-[12px] text-[var(--color-text-caption)]">
                    いいね {item.likes.toLocaleString()} ・ ★ {item.favorites.toLocaleString()}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </main>
      <TabBar />
    </div>
  );
}
