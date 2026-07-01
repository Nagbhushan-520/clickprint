"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="relative py-20 md:py-32">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl bg-ink-900 px-8 py-16 text-paper md:px-16 md:py-24"
        >
          {/* ambient blobs */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-flame-500/40 blur-3xl" />
            <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-saffron-500/30 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="text-display-lg text-balance">
              Your flyers, <span className="text-flame-400 italic">printed by tomorrow.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-paper/70">
              Pick paper, drop a design (or make one), check out. We handle the rest.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild variant="flame" size="xl">
                <Link href="/order">
                  Start an order
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl" className="border-paper/40 bg-transparent text-paper hover:bg-paper hover:text-ink-900">
                <Link href="/design">Open design tool</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
