"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const PAPER = [
  { gsm: 70, title: "70 GSM Maplitho", mode: "Single color", blurb: "Lightweight & economical. The doorstep-drop workhorse.", best: "High-volume" },
  { gsm: 80, title: "80 GSM Maplitho", mode: "Single color", blurb: "Standard everyday paper. The dependable choice.", best: "Most popular" },
  { gsm: 90, title: "90 GSM Maplitho / Color", mode: "Both", blurb: "Premium feel without premium price. Crisp print, no bleed-through.", best: "Recommended" },
  { gsm: 100, title: "100 GSM Maplitho", mode: "Single color", blurb: "Sturdy, substantial. Feels almost like a brochure.", best: "Upmarket" },
  { gsm: 130, title: "130 GSM Art Paper", mode: "Multi color", blurb: "Glossy. Vivid color. The flagship finish — and customers can tell.", best: "Best output" },
];

export function PaperGrid() {
  return (
    <section className="relative bg-cream py-20 md:py-32">
      <div className="container-wide">
        <div className="grid gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <div className="chip">Paper that prints right</div>
            <h2 className="mt-5 text-display text-balance text-ink-900">
              We don't<br />
              <span className="italic">cheap out</span> on paper.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-600">
              Every order is on real maplitho or art paper. No mystery
              card stock that disintegrates in your customer's pocket.
            </p>
            <div className="mt-8 space-y-3 text-sm text-ink-700">
              {[
                "Genuine maplitho — soft white, no grey tint",
                "GSM clearly labelled, never substituted",
                "Sample paper available on request",
              ].map((p) => (
                <div key={p} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-flame-500" />
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {PAPER.map((p, i) => (
              <motion.div
                key={p.gsm + p.mode}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group flex items-start gap-5 rounded-2xl border border-ink-900/8 bg-paper p-5 transition-all hover:border-ink-900/30 hover:shadow-[0_20px_40px_-20px_rgba(10,10,6,0.25)]"
              >
                <div className="grid h-16 w-12 shrink-0 place-items-center rounded-md bg-gradient-to-br from-ink-100 to-ink-200 font-display text-sm font-bold text-ink-900">
                  {p.gsm}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <h3 className="font-display text-lg font-bold tracking-tight text-ink-900">{p.title}</h3>
                    <span className="text-[10px] uppercase tracking-widest text-ink-500">{p.mode}</span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-ink-600">{p.blurb}</p>
                </div>
                <span className="hidden shrink-0 rounded-full bg-flame-500/10 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-flame-700 md:inline">
                  {p.best}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
