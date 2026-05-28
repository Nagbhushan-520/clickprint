import { getOrder } from "@/lib/store/orders";
import { EditorLoader } from "@/components/editor/editor-loader";

import { pageMetadata } from "@/lib/config/site";

export const metadata = pageMetadata({
  title: "Free Online Flyer Designer — Canva-grade Editor",
  description: "Design A4 and A5 flyers free in your browser. 27 Google Fonts, 6 templates, shapes, image upload, AI generation. Exports to print-grade vector PDF. No login required.",
  path: "/design",
  keywords: ["free flyer designer", "online flyer maker", "Canva alternative", "design flyer browser"],
});

export const dynamic = "force-dynamic";

export default async function DesignPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string; ai?: string; size?: string; template?: string }>;
}) {
  const params = await searchParams;
  const order = params.orderId ? await getOrder(params.orderId) : null;

  const initialSize =
    (params.size === "A4" || params.size === "A5")
      ? params.size
      : order?.config.size ?? "A5";

  return (
    <EditorLoader
      orderId={order?.id}
      initialSize={initialSize}
      aiMode={!!params.ai}
      templateId={params.template}
    />
  );
}
