import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/flyers", priority: 0.9, changeFrequency: "weekly" },
    { path: "/flyers/a4", priority: 0.9, changeFrequency: "weekly" },
    { path: "/flyers/a5", priority: 0.9, changeFrequency: "weekly" },
    { path: "/order", priority: 0.9, changeFrequency: "weekly" },
    { path: "/design", priority: 0.8, changeFrequency: "weekly" },
    { path: "/upload", priority: 0.7, changeFrequency: "monthly" },
    { path: "/pricing", priority: 0.8, changeFrequency: "weekly" },
    { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
    { path: "/gallery", priority: 0.6, changeFrequency: "weekly" },
    { path: "/templates", priority: 0.6, changeFrequency: "weekly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/refunds", priority: 0.2, changeFrequency: "yearly" },
  ];

  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
