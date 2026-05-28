import { SizeDetail } from "@/components/marketing/size-detail";
import { JsonLd } from "@/components/seo/json-ld";
import { productSchema, breadcrumbSchema } from "@/lib/seo/structured-data";
import { pageMetadata } from "@/lib/config/site";

export const metadata = pageMetadata({
  title: "A5 Flyer Printing in Bangalore",
  description: "A5 flyer printing (148 × 210 mm) — pocket-friendly, half the cost of A4. Single or full color on maplitho or 130 GSM art paper. Perfect for doorstep drops, gym mailers, restaurant promos.",
  path: "/flyers/a5",
  keywords: ["A5 flyer printing Bangalore", "A5 flyer price", "doorstep drop flyer", "148 210 mm flyer"],
});

export default function A5Page() {
  return (
    <>
      <JsonLd
        data={[
          productSchema({
            name: "A5 Flyer Printing",
            description: "A5 size (148 × 210 mm) flyer printing in single or full color on premium maplitho or art paper.",
            size: "A5",
            url: "/flyers/a5",
            minPrice: 48,
            maxPrice: 18000,
          }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Flyers", url: "/flyers" },
            { name: "A5 Flyers", url: "/flyers/a5" },
          ]),
        ]}
      />
      <SizeDetail
      size="A5"
      dimensions="148 × 210 mm"
      inches="5.83 × 8.27 in"
      heroTitle="A5 flyers. Half the size. Twice the drop count."
      heroSubtitle="Pocket-friendly. Doorstep-friendly. Half the paper, half the cost — which means you can hand out twice as many for the same budget. Gym mailers, restaurant promos, festival drops, anything customers will pocket on the way home."
      paperOptions={[
        { gsm: 70, label: "70 GSM Maplitho", description: "Lightest option. Perfect for high-volume doorstep drops where unit cost matters most.", bestFor: "Door drops" },
        { gsm: 80, label: "80 GSM Maplitho", description: "Standard everyday paper. The default for gym mailers and event flyers.", bestFor: "Most popular" },
        { gsm: 90, label: "90 GSM (single or full color)", description: "Crisp feel, won't blow away in the wind. Sweet spot for handing out at events.", bestFor: "Recommended" },
        { gsm: 100, label: "100 GSM Maplitho", description: "Heavier weight. Feels substantial in the hand — good for premium positioning.", bestFor: "Upmarket" },
        { gsm: 130, label: "130 GSM Art Paper", description: "Glossy. Vivid color. The flagship finish — pockets it like a postcard.", bestFor: "Premium output", isPremium: true },
      ]}
      useCases={[
        { title: "Doorstep drops", body: "Apartment building flyer drops. Pocket-friendly so people keep it, not bin it." },
        { title: "Gym & yoga", body: "Class schedules, member promos, free-trial offers. A5 fits the gym noticeboard." },
        { title: "Festival promos", body: "Diwali sales, weekend events, food festivals — hand out at the entrance." },
        { title: "Restaurant takeaway", body: "Menu cards that fit in a takeaway bag. Customers pin them to the fridge." },
      ]}
      specs={[
        { label: "Dimensions", value: "148 × 210 mm" },
        { label: "In inches", value: "5.83 × 8.27" },
        { label: "Aspect ratio", value: "1 : √2 (ISO 216)" },
        { label: "Single color paper", value: "70, 80, 90, 100 GSM Maplitho" },
        { label: "Full color paper", value: "90, 130 GSM" },
        { label: "Printing sides", value: "Single or double" },
        { label: "Min quantity", value: "100 flyers" },
        { label: "Max quantity", value: "5,000 flyers per order" },
        { label: "Turnaround", value: "24 hours · most orders" },
      ]}
      popularQuantity={1000}
      popularQuantityPrice={1900}
    />
    </>
  );
}
