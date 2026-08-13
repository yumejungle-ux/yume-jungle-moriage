import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");

  return {
    metadataBase: new URL(`${protocol}://${host}`),
    title: "夢のジャングル｜森上交流会",
    description:
      "想いを言葉に、夢を挑戦に。挑戦・応援・ご縁が連鎖する体験型コネクトライブ。",
    openGraph: {
      title: "夢のジャングル｜森上交流会",
      description: "想いは言葉に。夢は挑戦に。",
      images: [{ url: "/og.png", width: 1733, height: 909, alt: "夢のジャングル 森上交流会" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "夢のジャングル｜森上交流会",
      description: "想いは言葉に。夢は挑戦に。",
      images: ["/og.png"],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
