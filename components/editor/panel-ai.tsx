"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { PanelHeader } from "./panel-templates";

const PROMPTS = [
  "Diwali sale poster with diyas and gold accents",
  "Yoga retreat in Coorg, calm earth tones",
  "Restaurant grand opening, bold red and black",
  "Real estate luxury apartment in Whitefield",
  "Weekend flea market, playful illustrations",
];

export function PanelAi({ onGenerate, freeRemaining }: { onGenerate: (prompt: string) => Promise<void>; freeRemaining: number }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      await onGenerate(prompt);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <PanelHeader
        title="AI generate"
        subtitle={`Powered by Gemini Nano Banana · ${freeRemaining} free remaining with this order`}
      />

      <div className="p-3">
        <div className="rounded-2xl border border-ink-900/8 bg-paper p-3">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the flyer you want — subject, mood, colors, style..."
            rows={4}
            className="block w-full resize-none bg-transparent text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none"
          />
          <button
            onClick={submit}
            disabled={!prompt.trim() || loading}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink-900 px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-flame-500 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating (12-20s)...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate
              </>
            )}
          </button>
        </div>

        <div className="mt-5">
          <div className="px-1 text-[10px] font-semibold uppercase tracking-widest text-ink-500">
            Try these
          </div>
          <div className="mt-2 space-y-1.5">
            {PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => setPrompt(p)}
                className="block w-full rounded-lg px-3 py-2 text-left text-xs text-ink-600 transition-colors hover:bg-ink-900/5 hover:text-ink-900"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-5 rounded-xl bg-saffron-500/10 px-3 py-2 text-[11px] leading-relaxed text-ink-700">
          AI generation will be wired to Gemini in Phase 2.5. For now, the button does nothing — but the UX is ready.
        </p>
      </div>
    </div>
  );
}
