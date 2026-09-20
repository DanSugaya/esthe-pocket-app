"use client";

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

// ダミーデータ（ページ内で使用されているすべてのプロパティを完全定義）
const THERAPIST = {
  id: "1",
  name: "愛沢 みお",
  kanaName: "あいざわ みお",
  shopId: "precious-shibuya",
  shopName: "アロマサロン プレシャス渋谷店",
  todayHours: "14:00〜23:00",
  tel: "03-0000-0000",
  specs: {
    height: 160,
    bust: 85,
    cup: "D",
    waist: 58,
    hip: 86,
  },
  images: [
    { src: "/images/placeholder.jpg", alt: "愛沢 みお" },
  ],
  tags: [
    { label: "ルックス抜群", brand: true },
    { label: "愛嬌〇", brand: false },
    { label: "未経験発掘", brand: false },
  ],
  stats: {
    likes: 1250,
    favorites: 840,
    nominations: 128,
  },
  introText: "はじめまして！愛沢みおです。心を込めて丁寧な施術を心がけています。日々の疲れを癒やしにぜひいらしてくださいね♪",
  shopComment: "ルックス・接客ともに最高水準の大型新人です！丁寧なオイルトリートメントで癒やされること間違いなしです。",
  schedules: [
    { date: "2026-09-21", day: "9/21(月)", time: "14:00〜23:00", status: "open", today: true },
    { date: "2026-09-22", day: "9/22(火)", time: "12:00〜21:00", status: "open", today: false },
    { date: "2026-09-23", day: "9/23(水)", time: "-", status: "off", today: false },
    { date: "2026-09-24", day: "9/24(木)", time: "14:00〜23:00", status: "open", today: false },
    { date: "2026-09-25", day: "9/25(金)", time: "-", status: "undecided", today: false },
  ],
  reviews: [
    {
      id: "r1",
      rating: 5.0,
      date: "2026-09-18",
      content: "非常に気さくな方で、マッサージもとても上手でした。また指名したいと思います！",
      author: "30代 男性",
    },
    {
      id: "r2",
      rating: 4.8,
      date: "2026-09-10",
      content: "笑顔が素敵でとても癒やされました。力加減も絶妙です。",
      author: "40代 男性",
    },
  ],
  otherTherapists: [
    { id: "2", name: "星野 ゆな", image: "/images/placeholder.jpg", statusText: "本日出勤" },
    { id: "3", name: "白石 まい", image: "/images/placeholder.jpg", statusText: "明日出勤" },
  ],
};

// ----------------------------------------------------------------------
// 仮の内部コンポーネント（外部コンポーネントが見つからない場合のエラー防止）
// ----------------------------------------------------------------------

const DetailAppBar = ({ title }: { title: string }) => (
  <header className="sticky top-0 z-50 flex h-12 w-full items-center justify-between border-b border-gray-200 bg-white px-4">
    <button type="button" onClick={() => window.history.back()} aria-label="戻る" className="text-xl">
      ←
    </button>
    <h1 className="text-sm font-bold text-gray-900 truncate">{title}</h1>
    <div className="w-6" />
  </header>
);

const PrimaryButton = ({ children, href, large }: { children: React.ReactNode; href?: string; large?: boolean }) => {
  const className = `block w-full rounded-lg bg-blue-900 text-center font-bold text-white transition-opacity hover:opacity-90 ${
    large ? "py-3.5 text-base" : "py-2.5 text-sm"
  }`;
  if (href) {
    return <a href={href} className={className}>{children}</a>;
  }
  return <button type="button" className={className}>{children}</button>;
};

const OutlineButton = ({ children }: { children: React.ReactNode }) => (
  <button type="button" className="w-full rounded-lg border border-gray-300 py-2.5 text-center text-sm font-bold text-gray-700 hover:bg-gray-50">
    {children}
  </button>
);

const SectionHeader = ({ title, detail }: { title: string; detail?: boolean }) => (
  <div className="flex items-center justify-between font-bold text-gray-900">
    <span className="text-base">{title}</span>
  </div>
);

const ActionRow = ({ initialLikes, initialFavorites, notes }: { initialLikes: number; initialFavorites: number; notes: string[] }) => (
  <div className="flex items-center justify-around border-y border-gray-200 py-3 bg-gray-50 text-xs text-gray-600">
    <button type="button" className="flex items-center gap-1 font-bold text-rose-500">
      👍 {initialLikes}
    </button>
    <button type="button" className="flex items-center gap-1 font-bold text-amber-500">
      ★ {initialFavorites}
    </button>
    {notes.map((note) => (
      <span key={note} className="text-gray-500">{note}</span>
    ))}
  </div>
);

const RecommendRow = ({ title, items }: { title: string; items: Array<{ id: string; name: string; image: string; promoText: string; href: string }> }) => (
  <section className="border-t-2 border-gray-200 p-4">
    <h3 className="text-sm font-bold text-gray-900 mb-3">{title}</h3>
    <div className="flex gap-3 overflow-x-auto">
      {items.map((item) => (
        <Link key={item.id} href={item.href} className="w-24 shrink-0 text-center">
          <div className="relative h-24 w-24 overflow-hidden rounded-full bg-gray-200 mb-1">
            <Image src={item.image} alt={item.name} fill className="object-cover" unoptimized />
          </div>
          <p className="text-xs font-bold text-gray-800 truncate">{item.name}</p>
          <p className="text-[10px] text-blue-600">{item.promoText}</p>
        </Link>
      ))}
    </div>
  </section>
);

const StickyCtaBar = ({ tel, label }: { tel: string; label: string }) => (
  <div className="fixed bottom-0 left-0 z-40 w-full border-t border-gray-200 bg-white p-3 shadow-md">
    <div className="mx-auto max-w-[720px]">
      <a href={`tel:${tel}`} className="block w-full rounded-full bg-blue-600 py-3 text-center text-sm font-bold text-white">
        📞 {label}
      </a>
    </div>
  </div>
);

const TabBar = () => null; // 既存の共通TabBarが存在する場合は適宜入れ替えてください

// ----------------------------------------------------------------------
// メインページコンポーネント
// ----------------------------------------------------------------------

export default function TherapistPage() {
  const person = THERAPIST;

  return (
    <div className="min-h-screen bg-white pb-24">
      <DetailAppBar title={person.name} />
      <main className="mx-auto max-w-[720px]">
        <div id="detail-hero-sentinel" className="h-0" />

        {/* ヒーロー画像 */}
        <section className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
          <Image
            src={person.images[0].src}
            alt={person.images[0].alt}
            fill
            priority
            sizes="(max-width: 720px) 100vw, 720px"
            className="object-cover"
            unoptimized
          />
        </section>

        {/* セラピスト基本情報 */}
        <section className="p-4">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-blue-600 px-3 py-1 text-[11px] font-bold text-white">
              出勤中
            </span>
            <span className="text-[13px] text-gray-600">{person.todayHours}</span>
          </div>

          <h2 className="mt-3 text-[20px] font-bold text-blue-900">{person.name}</h2>
          <p className="text-[13px] text-gray-500">{person.kanaName}</p>

          <Link href={`/shops/${person.shopId}`} className="mt-2 inline-flex items-center text-[14px] font-bold text-blue-600 hover:underline">
            {person.shopName}
          </Link>

          <p className="mt-3 text-[13px] text-gray-700">
            T{person.specs.height} / B{person.specs.bust}({person.specs.cup}) / W{person.specs.waist} / H{person.specs.hip}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {person.tags.map((tag) => (
              <span
                key={tag.label}
                className={`rounded-md border-2 px-3 py-1.5 text-[14px] font-bold ${
                  tag.brand
                    ? "border-blue-600 text-blue-600"
                    : "border-gray-400 text-gray-600"
                }`}
              >
                {tag.label}
              </span>
            ))}
          </div>
        </section>

        <div className="px-4">
          <PrimaryButton large href={`tel:${person.tel}`}>このセラピストを指名して電話予約</PrimaryButton>
        </div>

        <ActionRow
          initialLikes={person.stats.likes}
          initialFavorites={person.stats.favorites}
          notes={[`累計指名: ${person.stats.nominations}件`]}
        />

        {/* 自己紹介 & コメント */}
        <section className="border-t-2 border-gray-100 p-4">
          <SectionHeader title="自己紹介" detail />
          <p className="mt-3 text-[13px] leading-6 text-gray-700">{person.introText}</p>
          {person.shopComment && (
            <>
              <h3 className="mt-6 text-[15px] font-bold text-gray-900">店舗からのコメント</h3>
              <p className="mt-2 text-[13px] leading-6 text-gray-700">{person.shopComment}</p>
            </>
          )}
        </section>

        {/* 出勤スケジュール */}
        <section className="border-t-2 border-gray-100">
          <div className="p-4 pb-2">
            <SectionHeader title="出勤スケジュール" detail />
          </div>
          <div className="flex overflow-x-auto border-t border-gray-200">
            {person.schedules.map((item) => (
              <div
                key={item.date}
                className={`min-w-[96px] border-r border-gray-200 px-2 py-3 text-center ${
                  item.today ? "bg-blue-50" : ""
                }`}
              >
                <div className="text-[12px] font-bold text-gray-800">{item.day}</div>
                <div className="mt-2 text-[12px] text-gray-600">
                  {item.status === "off" ? "休み" : item.status === "undecided" ? "未定" : item.time}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 口コミ・評価 */}
        <section className="border-t-2 border-gray-100">
          <div className="p-4 pb-2">
            <SectionHeader title="口コミ・評価" detail />
          </div>
          {person.reviews.map((review) => (
            <article key={review.id} className="border-b border-gray-100 px-4 py-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 font-bold text-amber-500">
                  <Star size={16} fill="currentColor" /> {review.rating.toFixed(1)}
                </span>
                <time className="text-[12px] text-gray-400">{review.date}</time>
              </div>
              <p className="mt-2 line-clamp-3 text-[13px] leading-6 text-gray-700">{review.content}</p>
              <div className="mt-1 text-[12px] text-gray-400">{review.author}</div>
            </article>
          ))}
          <div className="p-4">
            <OutlineButton>口コミをすべて見る</OutlineButton>
          </div>
        </section>

        {/* おすすめコンポーネント */}
        <RecommendRow
          title="同じ店舗のセラピスト"
          items={person.otherTherapists.map((item) => ({
            id: item.id,
            name: item.name,
            image: item.image,
            promoText: item.statusText,
            href: `/therapist/${item.id}`,
          }))}
        />
      </main>

      <StickyCtaBar
        tel={person.tel}
        label="指名して電話で予約する"
      />
      <TabBar />
    </div>
  );
}