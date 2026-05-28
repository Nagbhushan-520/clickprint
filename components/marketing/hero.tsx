"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Upload, Paintbrush } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 md:pt-32">
      {/* ambient color washes */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -top-32 right-[-10%] h-[34rem] w-[34rem] rounded-full bg-flame-500/15 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-32 left-[-15%] h-[28rem] w-[28rem] rounded-full bg-saffron-500/20 blur-3xl"
        />
      </div>

      <div className="relative container-wide pt-12 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="chip mx-auto">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-flame-500 opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-flame-500"></span>
            </span>
            Bangalore · Akkipet studio · 24 hr turnaround
          </div>

          <h1 className="mt-6 text-display-xl text-balance text-ink-900">
            Flyers that
            <span className="relative whitespace-nowrap">
              <motion.span
                initial={{ rotate: -1, scale: 0.96 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 120 }}
                className="relative inline-block bg-flame-500 px-4 text-paper mx-2"
              >
                actually
              </motion.span>
            </span>
            <br />
            get picked&nbsp;up.
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-ink-600 md:text-xl"
          >
            Order print-ready flyers in three minutes. Upload your design, build one in our
            Canva-grade editor, or generate it with AI — then we print, you collect.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button asChild variant="flame" size="xl">
              <Link href="/order">
                Start an order
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="xl">
              <Link href="/design">
                Open the design tool
                <Paintbrush className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs uppercase tracking-widest text-ink-500"
          >
            <span className="flex items-center gap-1.5"><Upload className="h-3.5 w-3.5" /> Upload ready</span>
            <span className="opacity-30">·</span>
            <span className="flex items-center gap-1.5"><Paintbrush className="h-3.5 w-3.5" /> Design in-browser</span>
            <span className="opacity-30">·</span>
            <span className="flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5" /> AI-generated</span>
          </motion.div>
        </motion.div>

        {/* Floating sample flyers */}
        <div className="relative mt-16 grid h-[420px] place-items-center md:mt-24 md:h-[480px]">
          <FloatingFlyers />
        </div>
      </div>
    </section>
  );
}

function FloatingFlyers() {
  const flyers = [
    {
      title: "RESTAURANT\nGRAND OPENING",
      subtitle: "Sat · 7pm onwards",
      bg: "bg-flame-500",
      text: "text-paper",
      rotate: "-8deg",
      delay: 0,
      left: "8%",
      top: "10%",
    },
    {
      title: "WEEKEND\nFLEA MARKET",
      subtitle: "120+ local vendors",
      bg: "bg-ink-900",
      text: "text-paper",
      rotate: "5deg",
      delay: 0.1,
      left: "50%",
      top: "0%",
    },
    {
      title: "YOGA\nRETREAT 2026",
      subtitle: "Coorg · 3 nights",
      bg: "bg-saffron-500",
      text: "text-ink-900",
      rotate: "-3deg",
      delay: 0.2,
      left: "76%",
      top: "12%",
    },
    {
      title: "DOSA\nWEDNESDAYS",
      subtitle: "₹49 · all you can eat",
      bg: "bg-paper border-2 border-ink-900",
      text: "text-ink-900",
      rotate: "9deg",
      delay: 0.3,
      left: "28%",
      top: "44%",
    },
    {
      title: "PHOTO\nWORKSHOP",
      subtitle: "Lalbagh · Sunday",
      bg: "bg-ink-800",
      text: "text-flame-400",
      rotate: "-6deg",
      delay: 0.4,
      left: "62%",
      top: "46%",
    },
  ];

  return (
    <>
      {flyers.map((f, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 60, rotate: 0, scale: 0.85 }}
          animate={{
            opacity: 1,
            y: 0,
            rotate: f.rotate,
            scale: 1,
          }}
          transition={{
            delay: 0.7 + f.delay,
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{
            scale: 1.04,
            rotate: 0,
            zIndex: 30,
            transition: { duration: 0.3 },
          }}
          style={{
            position: "absolute",
            left: f.left,
            top: f.top,
          }}
          className="cursor-default"
        >
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
            className={`flex h-44 w-32 flex-col justify-between rounded-md p-3 shadow-[0_30px_60px_-20px_rgba(10,10,6,0.35)] ${f.bg} ${f.text} md:h-56 md:w-40 md:p-4`}
          >
            <div className="text-[8px] font-medium uppercase tracking-[0.2em] opacity-60">
              Flyer · A5
            </div>
            <div className="font-display text-sm font-bold leading-[1.05] tracking-tight whitespace-pre-line md:text-base">
              {f.title}
            </div>
            <div className="text-[10px] font-medium tracking-tight opacity-80 md:text-xs">
              {f.subtitle}
            </div>
          </motion.div>
        </motion.div>
      ))}
    </>
  );
}
