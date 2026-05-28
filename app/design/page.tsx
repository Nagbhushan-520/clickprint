import { getOrder } from "@/lib/store/orders";
import { EditorLoader } from "@/components/editor/editor-loader";

export const metadata = {
  title: "Design Tool · Click Print",
  description: "Canva-grade in-browser design tool for flyer printing. Templates, fonts, shapes, and vector PDF export.",
};

export const dynamic = "force-dynamic";

export default async function DesignPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string; ai?: string; size?: string }>;
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
    />
  );
}
