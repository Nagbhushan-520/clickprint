"use client";

import { FONTS } from "@/lib/editor/fonts";
import { PanelHeader } from "./panel-templates";

export function PanelText({
  onAddText,
}: {
  onAddText: (text: string, opts: Record<string, unknown>) => void;
}) {
  const styles: { label: string; sample: string; opts: Record<string, unknown> }[] = [
    { label: "Display heading", sample: "Big bold", opts: { text: "HEADLINE", fontFamily: "Anton", fontSize: 280, charSpacing: 30 } },
    { label: "Editorial heading", sample: "Beautifully sharp", opts: { text: "Your headline here", fontFamily: "Playfair Display", fontSize: 200, fontWeight: 700 } },
    { label: "Subhead", sample: "Cleanly written subhead", opts: { text: "Add a subhead", fontFamily: "Inter", fontSize: 100, fontWeight: 700 } },
    { label: "Body text", sample: "Clear body text. Easy to read.", opts: { text: "Add body text...", fontFamily: "Inter", fontSize: 60 } },
    { label: "Script accent", sample: "with a flourish", opts: { text: "with style", fontFamily: "Dancing Script", fontSize: 150, fontWeight: 700 } },
  ];

  return (
    <div className="flex h-full flex-col">
      <PanelHeader title="Text" subtitle="Quick-add presets" />
      <div className="space-y-2 overflow-y-auto p-3">
        {styles.map((s) => (
          <button
            key={s.label}
            onClick={() => onAddText(s.opts.text as string, s.opts)}
            className="w-full overflow-hidden rounded-xl border border-ink-900/8 bg-paper p-3 text-left transition-all hover:border-ink-900/30 hover:shadow-sm"
          >
            <div className="text-[10px] uppercase tracking-widest text-ink-500">{s.label}</div>
            <div
              className="mt-1 truncate text-ink-900"
              style={{
                fontFamily: (s.opts.fontFamily as string),
                fontWeight: (s.opts.fontWeight as number | string | undefined) ?? 400,
                fontSize: s.label.includes("Display") ? "22px" : s.label.includes("Editorial") ? "20px" : "16px",
                lineHeight: 1.1,
              }}
            >
              {s.sample}
            </div>
          </button>
        ))}

        <div className="mt-5 border-t border-ink-900/8 pt-3">
          <div className="px-2 text-[10px] font-semibold uppercase tracking-widest text-ink-500">
            All fonts
          </div>
          <div className="mt-2 space-y-1">
            {FONTS.map((f) => (
              <button
                key={f.family}
                onClick={() => onAddText("Your text", { fontFamily: f.family, fontSize: 140 })}
                className="w-full rounded-lg px-3 py-2 text-left transition-colors hover:bg-ink-900/5"
                style={{ fontFamily: f.family }}
              >
                <div className="truncate text-base text-ink-900">{f.family}</div>
                <div className="text-[10px] capitalize text-ink-400" style={{ fontFamily: "Inter" }}>
                  {f.category}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
