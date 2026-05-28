import { Configurator } from "@/components/order/configurator";

export const metadata = {
  title: "Order Flyers · Click Print",
  description: "Configure your flyer order — paper, size, sides, quantity. Live pricing.",
};

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
