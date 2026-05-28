/**
 * Site-wide SEO config. Single source of truth for canonical URL, default
 * meta titles, OG defaults, and structured-data fields.
 */
import { brand } from "./brand";

// Override in env (NEXT_PUBLIC_SITE_URL) when deploying
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://clickprint.in";

export const site = {
  name: brand.name,
  url: SITE_URL,
  locale: "en_IN",
  language: "en-IN",
  shortDescription: `Premium flyer printing in ${brand.address.city}. A4 and A5, single or full color, with an in-browser design tool and AI generation. 24-hour turnaround.`,
  longDescription: `${brand.name} is a flyer printing studio in ${brand.address.line2}, ${brand.address.city}. We print A4 and A5 flyers in single or full color on premium maplitho and art paper (70, 80, 90, 100, 130 GSM), single or double sided. Order online with live pricing, design in our Canva-grade in-browser editor, generate with AI, or upload your own file. Razorpay payments. 24-hour turnaround.`,
  keywords: [
    "flyer printing Bangalore",
    "flyer printing Akkipet",
    "A4 flyer printing",
    "A5 flyer printing",
    "online flyer printing India",
    "design flyer online free",
    "AI flyer generator",
    "maplitho paper flyers",
    "art paper flyers Bangalore",
    "Click Print Akkipet",
    "single color flyer printing",
    "full color flyer printing",
    "bulk flyer printing Bangalore",
    "restaurant flyer printing",
    "event flyer printing",
    "real estate flyer printing",
  ],
  ogImage: "/og-default.png",
  twitter: "@clickprintin",
} as const;

export type PageSEO = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogType?: "website" | "article";
  noIndex?: boolean;
};

/** Convenience function: produces Next.js Metadata from PageSEO */
export function pageMetadata(seo: PageSEO) {
  const fullTitle = seo.title.includes(site.name)
    ? seo.title
    : `${seo.title} · ${site.name}`;
  const canonical = `${site.url}${seo.path}`;

  return {
    title: { absolute: fullTitle },
    description: seo.description,
    keywords: [...(seo.keywords ?? []), ...site.keywords].slice(0, 12),
    alternates: { canonical },
    openGraph: {
      title: fullTitle,
      description: seo.description,
      url: canonical,
      siteName: site.name,
      type: seo.ogType ?? "website",
      locale: site.locale,
      images: [{ url: `${site.url}${site.ogImage}`, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: seo.description,
      images: [`${site.url}${site.ogImage}`],
      site: site.twitter,
    },
    robots: seo.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  } as const;
}
