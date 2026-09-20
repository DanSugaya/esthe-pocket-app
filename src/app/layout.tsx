import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  // 店舗ページは「{店舗名}|{エリア}のメンズエステ」を返せば template で「|エステポケット」が付く(§6.7)
  title: {
    default: "エステポケット|メンズエステのポータルサイト",
    template: "%s|エステポケット",
  },
  description: "メンズエステの店舗・出勤情報・料金・口コミを探せるポータルサイトです。",
};

export const viewport: Viewport = {
  themeColor: "#1B2F8F", // §4.1 ステータスバーをヘッダーと同色に
  viewportFit: "cover", // env(safe-area-inset-*) を有効にする。maximum-scale は付けない(§10)
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
