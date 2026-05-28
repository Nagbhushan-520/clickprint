import { SizeDetail } from "@/components/marketing/size-detail";
import { JsonLd } from "@/components/seo/json-ld";
import { productSchema, breadcrumbSchema } from "@/lib/seo/structured-data";
import { pageMetadata } from "@/lib/config/site";

export const metadata = pageMetadata({
  title: "A4 Flyer Printing in Bangalore",
  description: "A4 flyer printing (210 × 297 mm) on premium maplitho and 130 GSM art paper. Single or full color, single or double sided. Live online pricing. Same-day pickup or Bangalore delivery.",
  path: "/flyers/a4",
  keywords: ["A4 flyer printing Bangalore", "A4 flyer price", "A4 leaflet printing", "210 297 mm flyer"],
});

export default function A4Page() {
  return (
    <>
      <JsonLd
        data={[
          productSchema({
            name: "A4 Flyer Printing",
            description: "A4 size (210 × 297 mm) flyer printing in single or full color on premium maplitho or art paper.",
            size: "A4",
            url: "/flyers/a4",
            minPrice: 84,
            maxPrice: 32000,
          }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Flyers", url: "/flyers" },
            { name: "A4 Flyers", url: "/flyers/a4" },
          ]),
        ]}
      />
      <SizeDetail
      size="A4"
      dimensions="210 × 297 mm"
      inches="8.27 × 11.69 in"
      heroTitle="A4 flyers. Full-page impact."
      heroSubtitle="The classic. Big enough to tell the whole story — restaurant menus, real-estate listings, event invites, B2B sales handouts. When you need the customer to read more than a headline, you want A4."
      paperOptions={[
        { gsm: 70, label: "70 GSM Maplitho", description: "Lightweight & economical. The doorstep-drop workhorse — when volume matters more than feel.", bestFor: "High volume" },
        { gsm: 80, label: "80 GSM Maplitho", description: "Standard everyday paper. The dependable choice for menus and event flyers.", bestFor: "Most popular" },
        { gsm: 90, label: "90 GSM (single or full color)", description: "Premium feel without premium price. Crisp print, minimal bleed-through.", bestFor: "Recommended" },
        { gsm: 100, label: "100 GSM Maplitho", description: "Sturdy, substantial. Feels almost like a brochure. Great for upmarket positioning.", bestFor: "Upmarket" },
        { gsm: 130, label: "130 GSM Art Paper", description: "Glossy. Vivid color. The flagship finish — customers can tell.", bestFor: "Premium output", isPremium: true },
      ]}
      useCases={[
        { title: "Restaurant menus", body: "Full menu fits with photos. Distribute to nearby apartments, slot under doors." },
        { title: "Real estate", body: "Property details, floor plan, photos — all on one page. Drops in residential areas." },
        { title: "Event posters", body: "Conferences, weddings, exhibitions. Big enough for date, venue, and full schedule." },
        { title: "B2B handouts", body: "Sales decks, product spec sheets, dealer brochures. A4 is the office-default." },
      ]}
      specs={[
        { label: "Dimensions", value: "210 × 297 mm" },
        { label: "In inches", value: "8.27 × 11.69" },
        { label: "Aspect ratio", value: "1 : √2 (ISO 216)" },
        { label: "Single color paper", value: "70, 80, 90, 100 GSM Maplitho" },
        { label: "Full color paper", value: "90, 130 GSM" },
        { label: "Printing sides", value: "Single or double" },
        { label: "Min quantity", value: "100 flyers" },
        { label: "Max quantity", value: "5,000 flyers per order" },
        { label: "Turnaround", value: "24–48 hours" },
      ]}
      popularQuantity={1000}
      popularQuantityPrice={3250}
    />
    </>
  );
}
