/**
 * Schema.org JSON-LD structured data generators.
 * Render these via <script type="application/ld+json"> in pages for rich snippets.
 */
import { brand } from "@/lib/config/brand";
import { SITE_URL, site } from "@/lib/config/site";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}#business`,
    name: brand.name,
    description: site.shortDescription,
    url: SITE_URL,
    telephone: brand.phone,
    email: brand.email,
    image: `${SITE_URL}${site.ogImage}`,
    logo: `${SITE_URL}/icon.png`,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${brand.address.line1}, ${brand.address.line2}`,
      addressLocality: brand.address.city,
      addressRegion: brand.address.state,
      postalCode: brand.address.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 12.9912,
      longitude: 77.5715,
    },
    areaServed: [
      { "@type": "City", name: "Bangalore" },
      { "@type": "City", name: "Bengaluru" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:30",
        closes: "20:00",
      },
    ],
    sameAs: [
      brand.social.instagram,
    ],
  };
}

export function productSchema(opts: {
  name: string;
  description: string;
  size: "A4" | "A5";
  url: string;
  minPrice: number;
  maxPrice?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: opts.name,
    description: opts.description,
    image: `${SITE_URL}${site.ogImage}`,
    brand: {
      "@type": "Brand",
      name: brand.name,
    },
    sku: `CP-FLYER-${opts.size}`,
    category: "Print Services",
    offers: {
      "@type": "AggregateOffer",
      url: `${SITE_URL}${opts.url}`,
      priceCurrency: "INR",
      lowPrice: opts.minPrice,
      highPrice: opts.maxPrice ?? opts.minPrice * 10,
      offerCount: 24,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: brand.name,
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
    },
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}#org`,
    name: brand.name,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: brand.phone,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Kannada", "Hindi"],
    },
    sameAs: [brand.social.instagram, brand.social.whatsapp],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name: brand.name,
    description: site.shortDescription,
    inLanguage: site.language,
    publisher: {
      "@id": `${SITE_URL}#business`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/order?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/** Helper: render an array of schemas as a single JSON-LD object */
export function renderStructuredData(schemas: object[]) {
  return {
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": schemas,
    }),
  };
}
