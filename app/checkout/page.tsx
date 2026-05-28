import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckoutFlow } from "@/components/checkout/checkout-flow";
import { getOrder } from "@/lib/store/orders";

import { pageMetadata } from "@/lib/config/site";

export const metadata = pageMetadata({
  title: "Checkout",
  description: "Secure flyer printing payment via Razorpay. UPI, cards, netbanking, wallets accepted.",
  path: "/checkout",
  noIndex: true,
});

export const dynamic = "force-dynamic";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  if (!orderId) {
    return (
      <div className="container-wide pt-32 pb-32 text-center">
        <div className="mx-auto max-w-md">
          <div className="chip mx-auto">Checkout</div>
          <h1 className="mt-5 text-display text-balance text-ink-900">
            Start an order <span className="text-flame-500">first.</span>
          </h1>
          <Link href="/order" className="btn-primary mt-8 inline-flex">
            Open configurator
          </Link>
        </div>
      </div>
    );
  }

  const order = await getOrder(orderId);
  if (!order) {
    redirect("/order");
  }

  return (
    <div className="pt-24 pb-32 md:pt-32">
      <div className="container-wide">
        <div className="max-w-2xl">
          <div className="chip">Step 3 of 3 · Checkout</div>
          <h1 className="mt-5 text-display text-balance text-ink-900">
            Almost <span className="text-flame-500">done.</span>
          </h1>
          <p className="mt-4 max-w-lg text-lg text-ink-600">
            Tell us where to send it and we'll start printing the moment payment clears.
          </p>
        </div>

        <div className="mt-12 md:mt-16">
          <CheckoutFlow order={order} />
        </div>
      </div>
    </div>
  );
}
