"use client";

import dynamic from "next/dynamic";
import type { EditorSize } from "@/lib/editor/dimensions";

const DesignEditor = dynamic(
  () => import("./design-editor").then((m) => m.DesignEditor),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 grid place-items-center bg-cream">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-flame-500/20 border-t-flame-500" />
          <div className="mt-4 font-display text-sm font-semibold text-ink-700">
            Loading design tool...
          </div>
        </div>
      </div>
    ),
  },
);

export function EditorLoader({
  orderId,
  initialSize,
  aiMode,
  templateId,
}: {
  orderId?: string;
  initialSize: EditorSize;
  aiMode: boolean;
  templateId?: string;
}) {
  return <DesignEditor orderId={orderId} initialSize={initialSize} aiMode={aiMode} templateId={templateId} />;
}
