import { Configurator } from "@/components/order/configurator";

import { pageMetadata } from "@/lib/config/site";

export const metadata = pageMetadata({
  title: "Order Flyers — Live Pricing Configurator",
  description: "Configure your flyer order in 30 seconds. Pick color, paper GSM, A4 or A5 size, sides, and quantity. Live price updates as you go. UPI, card, netbanking checkout via Razorpay.",
  path: "/order",
  keywords: ["order flyers online", "flyer configurator", "live flyer pricing"],
});

export default async function OrderPage({
  searchParams,
}: {
  searchParams: Promise<{ ai?: string; design?: string; upload?: string }>;
}) {
  const params = await searchParams;
  const initialDesign =
    params.ai !== undefined ? "ai" :
    params.design !== undefined ? "design" :
    params.upload !== undefined ? "upload" :
    undefined;

  return (
    <div className="pt-24 pb-32 md:pt-32">
      <div className="container-wide">
        <div className="max-w-2xl">
          <div className="chip">Order flyers</div>
          <h1 className="mt-5 text-display text-balance text-ink-900">
            Build your <span className="text-flame-500">order.</span>
          </h1>
          <p className="mt-4 max-w-lg text-lg text-ink-600">
            Pick paper, size, sides, and quantity. Price updates as you go —
            no surprises at checkout.
          </p>
        </div>

        <div className="mt-12 md:mt-16">
          <Configurator initialDesign={initialDesign} />
        </div>
      </div>
    </div>
  );
}
