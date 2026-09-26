import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://yume-jungle-moriage.yume-jungle.workers.dev";
const gaMeasurementId = "G-WP3Y9B4Y1F";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "夢のジャングル｜森上交流会",
  description:
    "想いを言葉に、夢を挑戦に。挑戦・応援・ご縁が連鎖する体験型コネクトライブ。",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "hAEbX2YZe0qo-LFa5wYw0sSrj8x-As-FM9WhHoq6p9o",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "/",
    siteName: "夢のジャングル｜森上交流会",
    title: "夢のジャングル｜森上交流会",
    description: "想いは言葉に。夢は挑戦に。",
    images: [
      {
        url: "/og.png",
        width: 1733,
        height: 909,
        alt: "夢のジャングル 森上交流会",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "夢のジャングル｜森上交流会",
    description: "想いは言葉に。夢は挑戦に。",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                if (["localhost", "127.0.0.1"].includes(window.location.hostname)) return;
                gtag("js", new Date());
                gtag("config", "${gaMeasurementId}");
                const script = document.createElement("script");
                script.async = true;
                script.src = "https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}";
                document.head.appendChild(script);
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
