import type { MetadataRoute } from "next";

const siteUrl = "https://yume-jungle-moriage.yume-jungle.workers.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
