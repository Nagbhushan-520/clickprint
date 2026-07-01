import { EditorClient } from "@/features/editor/components/editor-client";
import { pageMetadata } from "@/lib/config/site";

export const metadata = pageMetadata({
  title: "Design Studio — Free Online Flyer Editor",
  description: "Design A4 and A5 flyers free in your browser. Templates, fonts, shapes, images, layers, and export to print-ready files.",
  path: "/design",
  keywords: ["free flyer designer", "online flyer maker", "design flyer browser"],
});

export const dynamic = "force-dynamic";

export default async function DesignPage({
  searchParams,
}: {
  searchParams: Promise<{ size?: string }>;
}) {
  const params = await searchParams;
  const size = params.size === "A4" ? "A4" : "A5";
  return <EditorClient size={size} />;
}
