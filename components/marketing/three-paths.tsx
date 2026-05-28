"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Upload, Paintbrush, Sparkles, ArrowUpRight } from "lucide-react";

const PATHS = [
  {
    icon: Upload,
    title: "Upload your design",
    blurb: "Got it ready? Drag in a PDF, JPG, or PNG. We'll check the resolution and flag anything off before you pay.",
    cta: "Upload a file",
    href: "/upload",
    accent: "bg-flame-500",
    bg: "bg-paper",
  },
  {
    icon: Paintbrush,
    title: "Design in the browser",
    blurb: "A Canva-grade editor with templates, fonts, layers, and snap guides. Exports as print-grade vector PDF.",
    cta: "Open the editor",
    href: "/design",
    accent: "bg-ink-900",
    bg: "bg-cream",
  },
  {
    icon: Sparkles,
    title: "Generate with AI",
    blurb: "Type what you want. We generate options, you tweak in the editor, then send to print. 3–5 free with every order.",
    cta: "Try AI generate",
    href: "/order?ai=1",
    accent: "bg-saffron-500",
    bg: "bg-paper",
  },
];

export function ThreePaths() {
  return (
    <section id="paths" className="relative py-20 md:py-32">
      <div className="container-wide">
        <div className="max-w-3xl">
          <div className="chip">Three ways to get printed</div>
          <h2 className="mt-5 text-display text-balance text-ink-900">
            Bring a design.
            <br />
            <span className="text-flame-500">Or have one made.</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
            Whether you've got it polished or you're starting from nothing — we
            meet you where you are.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {PATHS.map((path, i) => (
            <motion.div
              key={path.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={path.href}
                className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-ink-900/8 p-7 transition-all duration-500 hover:border-ink-900 hover:shadow-[0_30px_60px_-30px_rgba(10,10,6,0.5)] ${path.bg}`}
              >
                <div>
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${path.accent} text-paper transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-105`}>
                    <path.icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold tracking-tight text-ink-900">
                    {path.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
                    {path.blurb}
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-2 text-sm font-medium text-ink-900">
                  {path.cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>

                {/* decorative gradient bloom on hover */}
                <div className={`pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full ${path.accent} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30`} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
