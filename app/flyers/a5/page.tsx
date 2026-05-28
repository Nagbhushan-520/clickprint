import { SizeDetail } from "@/components/marketing/size-detail";

export const metadata = {
  title: "A5 Flyer Printing in Bangalore · Click Print",
  description: "A5 flyer printing on premium maplitho and art paper. Pocket-friendly, half the cost of A4. Live pricing.",
};

export default function A5Page() {
  return (
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
  );
}
