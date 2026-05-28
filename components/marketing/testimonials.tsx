"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "Walked in at 4pm with a half-baked idea, walked out at 11am next morning with 500 flyers. Already booked them for next month.",
    name: "Rohan K.",
    role: "Café owner, Indiranagar",
    accent: "bg-flame-500",
  },
  {
    quote: "I don't design. The AI thing made something I would've paid a designer ₹2,000 for. Then I tweaked it in 5 minutes.",
    name: "Sneha M.",
    role: "Yoga studio, HSR",
    accent: "bg-saffron-500",
  },
  {
    quote: "Price was a third of Vistaprint and the paper quality was better. They actually let me feel the paper samples before ordering.",
    name: "Vishal R.",
    role: "Realtor, Whitefield",
    accent: "bg-ink-800",
  },
];

export function Testimonials() {
  return (
    <section className="relative bg-cream py-20 md:py-32">
      <div className="container-wide">
        <div className="mb-14 max-w-3xl">
          <div className="chip">What Bangalore says</div>
          <h2 className="mt-5 text-display text-balance text-ink-900">
            Real customers.<br/>
            <span className="italic text-flame-500">Real flyers.</span>
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative flex flex-col rounded-3xl border border-ink-900/8 bg-paper p-7 transition-all hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(10,10,6,0.4)]"
            >
              <Quote className="h-8 w-8 text-flame-500" strokeWidth={1.5} />
              <p className="mt-5 flex-1 font-display text-xl leading-snug tracking-tight text-ink-900">
                "{t.quote}"
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-ink-900/8 pt-5">
                <div className={`grid h-10 w-10 place-items-center rounded-full ${t.accent} font-display text-sm font-bold text-paper`}>
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold text-ink-900">{t.name}</div>
                  <div className="text-xs text-ink-500">{t.role}</div>
                </div>
                <div className="ml-auto flex gap-0.5 text-flame-500">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
