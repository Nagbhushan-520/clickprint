import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { UploadFlow } from "@/components/upload/upload-flow";
import { getOrder } from "@/lib/store/orders";

import { pageMetadata } from "@/lib/config/site";

export const metadata = pageMetadata({
  title: "Upload Your Flyer Design",
  description: "Upload your print-ready PDF, JPG, or PNG. We validate DPI and file integrity before you pay. 25 MB max, 300 DPI recommended.",
  path: "/upload",
});

export const dynamic = "force-dynamic";

export default async function UploadPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  // If no orderId, show empty state pointing to configurator
  if (!orderId) {
    return (
      <div className="container-wide pt-32 pb-32 text-center">
        <div className="mx-auto max-w-md">
          <div className="chip mx-auto">Upload</div>
          <h1 className="mt-5 text-display text-balance text-ink-900">
            Start an order <span className="text-flame-500">first.</span>
          </h1>
          <p className="mt-5 text-lg text-ink-600">
            Pick your paper, size, sides, and quantity in the configurator —
            then you'll come back here to upload.
          </p>
          <Link href="/order?upload=1" className="btn-primary mt-8 inline-flex">
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
        <Link
          href={`/order?upload=1`}
          className="inline-flex items-center gap-1 text-xs font-medium text-ink-500 hover:text-flame-500"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to configurator
        </Link>
        <div className="mt-5 max-w-2xl">
          <div className="chip">Step 2 of 3 · Upload</div>
          <h1 className="mt-5 text-display text-balance text-ink-900">
            Drop your <span className="text-flame-500">design.</span>
          </h1>
          <p className="mt-4 max-w-lg text-lg text-ink-600">
            We'll check DPI and file integrity before checkout. No surprises at the print stage.
          </p>
        </div>

        <div className="mt-12 md:mt-16">
          <UploadFlow order={order} />
        </div>
      </div>
    </div>
  );
}
