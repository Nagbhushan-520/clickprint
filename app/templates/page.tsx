"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { TEMPLATES, TEMPLATE_CATEGORIES, type TemplateCategory } from "@/lib/editor/templates";
import { TemplateThumbCanvas } from "@/components/editor/template-thumb-canvas";
import { cn } from "@/lib/utils";

export default function TemplatesPage() {
  const [category, setCategory] = useState<TemplateCategory | "all">("all");
  const [size, setSize] = useState<"all" | "A4" | "A5">("all");

  let filtered = TEMPLATES;
  if (category !== "all") filtered = filtered.filter((t) => t.category === category);
  if (size !== "all") filtered = filtered.filter((t) => t.size === size);

  return (
    <div className="pt-24 pb-32 md:pt-32">
      <div className="container-wide">
        <div className="max-w-2xl">
          <div className="chip">Templates</div>
          <h1 className="mt-5 text-display-lg text-balance text-ink-900">
            {TEMPLATES.length}+ designs <span className="text-flame-500">to start from.</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-600">
            Pick a template and open it in our editor. Customize colors, fonts, and content
            in minutes. All exports are print-grade A4 or A5.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-1.5">
            {TEMPLATE_CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-semibold transition-colors",
                  category === c.id
                    ? "bg-ink-900 text-paper"
                    : "border border-ink-900/15 text-ink-700 hover:border-ink-900",
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-1 rounded-full border border-ink-900/15 bg-paper p-0.5">
            {(["all", "A4", "A5"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
                  size === s ? "bg-ink-900 text-paper" : "text-ink-600 hover:text-ink-900",
                )}
              >
                {s === "all" ? "All sizes" : s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 text-xs text-ink-500">
          Showing {filtered.length} of {TEMPLATES.length} templates
        </div>

        {/* Grid */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((tpl) => (
            <Link
              key={tpl.id}
              href={`/design?template=${tpl.id}`}
              className="group overflow-hidden rounded-2xl border border-ink-900/8 bg-paper transition-all hover:border-ink-900/40 hover:shadow-[0_20px_40px_-20px_rgba(10,10,6,0.3)] hover:-translate-y-1"
            >
              <TemplateThumbCanvas tpl={tpl} width={300} />
              <div className="p-4">
                <h3 className="truncate font-display text-base font-bold tracking-tight text-ink-900">
                  {tpl.name}
                </h3>
                <div className="mt-1 flex items-center justify-between text-xs">
                  <span className="capitalize text-ink-500">{tpl.category.replace("-", " ")}</span>
                  <span className="font-mono text-ink-400">{tpl.size}</span>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs font-medium text-flame-500 opacity-0 transition-opacity group-hover:opacity-100">
                  Open in editor
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 flex flex-col items-center gap-4 text-center md:mt-28">
          <div className="chip">Or start blank</div>
          <h2 className="text-display text-balance text-ink-900">
            Want to design from scratch?
          </h2>
          <Link href="/design" className="btn-primary mt-2 inline-flex">
            Open blank canvas
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
