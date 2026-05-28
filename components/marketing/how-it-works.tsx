"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    n: "01",
    title: "Pick paper, size, sides, quantity.",
    body: "Live pricing as you change anything. No surprises at checkout.",
  },
  {
    n: "02",
    title: "Add your design.",
    body: "Upload a file, build in our editor, or generate with AI. Whichever path you take, we validate it print-ready.",
  },
  {
    n: "03",
    title: "Pay & print.",
    body: "UPI, card, netbanking via Razorpay. We start printing the moment payment clears.",
  },
  {
    n: "04",
    title: "Collect or delivered.",
    body: "Pickup from Akkipet studio same-day, or local delivery across Bangalore.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-20 md:py-32">
      <div className="container-wide">
        <div className="mb-14 max-w-3xl">
          <div className="chip">How it works</div>
          <h2 className="mt-5 text-display text-balance text-ink-900">
            Four steps. <span className="text-flame-500">No phone calls.</span>
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-3xl border border-ink-900/10 bg-ink-900/8 md:grid-cols-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group bg-paper p-7 transition-colors hover:bg-ink-900 md:p-10"
            >
              <div className="font-display text-5xl font-bold text-flame-500 transition-transform duration-500 group-hover:-translate-y-2 md:text-6xl">
                {step.n}
              </div>
              <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-ink-900 transition-colors group-hover:text-paper md:text-2xl">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-600 transition-colors group-hover:text-paper/70">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
