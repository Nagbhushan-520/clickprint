"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Upload, Paintbrush, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OptionCard } from "@/components/order/option-card";
import {
  type ColorMode,
  type FlyerSize,
  type Sides,
  type Gsm,
  type Quantity,
  SINGLE_COLOR_GSMS,
  MULTI_COLOR_GSMS,
  QUANTITY_TIERS,
  PAPER_INFO,
  calculatePrice,
} from "@/lib/config/pricing";
import { cn, formatINR } from "@/lib/utils";

type Step = {
  num: number;
  label: string;
  description: string;
};

const STEPS: Step[] = [
  { num: 1, label: "Color", description: "Single or full color?" },
  { num: 2, label: "Paper", description: "Which GSM?" },
  { num: 3, label: "Size", description: "A4 or A5?" },
  { num: 4, label: "Sides", description: "Single or double?" },
  { num: 5, label: "Quantity", description: "How many?" },
  { num: 6, label: "Design", description: "How will you design?" },
];

export function Configurator({
  initialDesign,
}: {
  initialDesign?: "upload" | "design" | "ai";
}) {
  const [colorMode, setColorMode] = useState<ColorMode>("multi");
  const [gsm, setGsm] = useState<Gsm>(90);
  const [size, setSize] = useState<FlyerSize>("A5");
  const [sides, setSides] = useState<Sides>("single");
  const [quantity, setQuantity] = useState<Quantity>(500);
  const [designPath, setDesignPath] = useState<"upload" | "design" | "ai" | null>(
    initialDesign ?? null,
  );

  // Switch to a valid GSM when color mode changes
  const availableGsms = colorMode === "single" ? SINGLE_COLOR_GSMS : MULTI_COLOR_GSMS;

  const handleColorChange = (mode: ColorMode) => {
    setColorMode(mode);
    const next = mode === "single" ? 90 : 90;
    setGsm(next as Gsm);
  };

  const price = useMemo(
    () => calculatePrice({ colorMode, gsm, size, sides, quantity }),
    [colorMode, gsm, size, sides, quantity],
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-12">
      {/* LEFT — configuration */}
      <div className="space-y-12">
        {/* Step 1 — Color */}
        <Step step={STEPS[0]}>
          <div className="grid grid-cols-2 gap-3">
            <OptionCard
              selected={colorMode === "single"}
              onSelect={() => handleColorChange("single")}
              title="Single Color"
              subtitle="Black ink only · most economical"
              size="lg"
            />
            <OptionCard
              selected={colorMode === "multi"}
              onSelect={() => handleColorChange("multi")}
              title="Full Color"
              subtitle="Full CMYK · vibrant photos"
              badge="Popular"
              size="lg"
            />
          </div>
        </Step>

        {/* Step 2 — Paper */}
        <Step step={STEPS[1]}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {availableGsms.map((g) => (
              <OptionCard
                key={g}
                selected={gsm === g}
                onSelect={() => setGsm(g as Gsm)}
                title={`${g} GSM`}
                subtitle={PAPER_INFO[g]?.label.replace(`${g} GSM `, "")}
              />
            ))}
          </div>
          <p className="mt-3 text-xs leading-relaxed text-ink-500">
            {PAPER_INFO[gsm]?.description}
          </p>
        </Step>

        {/* Step 3 — Size */}
        <Step step={STEPS[2]}>
          <div className="grid grid-cols-2 gap-3">
            <OptionCard
              selected={size === "A4"}
              onSelect={() => setSize("A4")}
              title="A4"
              subtitle="210 × 297 mm · standard"
              size="lg"
            />
            <OptionCard
              selected={size === "A5"}
              onSelect={() => setSize("A5")}
              title="A5"
              subtitle="148 × 210 mm · pocket-friendly"
              size="lg"
            />
          </div>
        </Step>

        {/* Step 4 — Sides */}
        <Step step={STEPS[3]}>
          <div className="grid grid-cols-2 gap-3">
            <OptionCard
              selected={sides === "single"}
              onSelect={() => setSides("single")}
              title="Single Side"
              subtitle="Print on front only"
              size="lg"
            />
            <OptionCard
              selected={sides === "double"}
              onSelect={() => setSides("double")}
              title="Double Side"
              subtitle="Front and back · +65%"
              size="lg"
            />
          </div>
        </Step>

        {/* Step 5 — Quantity */}
        <Step step={STEPS[4]}>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {QUANTITY_TIERS.map((q) => (
              <OptionCard
                key={q}
                selected={quantity === q}
                onSelect={() => setQuantity(q)}
                title={q.toLocaleString("en-IN")}
                subtitle={q === 1000 ? "Bestseller" : q >= 2500 ? `Save ~${Math.round((1 - (q === 2500 ? 0.7 : 0.66)) * 100)}%` : undefined}
                size="sm"
              />
            ))}
          </div>
        </Step>

        {/* Step 6 — Design path */}
        <Step step={STEPS[5]}>
          <div className="grid gap-3 md:grid-cols-3">
            <DesignPathCard
              icon={Upload}
              selected={designPath === "upload"}
              onSelect={() => setDesignPath("upload")}
              title="Upload"
              subtitle="I already have a design file"
            />
            <DesignPathCard
              icon={Paintbrush}
              selected={designPath === "design"}
              onSelect={() => setDesignPath("design")}
              title="Design in editor"
              subtitle="Canva-grade tool, templates"
            />
            <DesignPathCard
              icon={Sparkles}
              selected={designPath === "ai"}
              onSelect={() => setDesignPath("ai")}
              title="Generate with AI"
              subtitle="3–5 free with this order"
              badge="New"
            />
          </div>
        </Step>
      </div>

      {/* RIGHT — sticky price summary */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <PriceSummary
          colorMode={colorMode}
          gsm={gsm}
          size={size}
          sides={sides}
          quantity={quantity}
          designPath={designPath}
          price={price}
        />
      </div>
    </div>
  );
}

function useContinueToNextStep() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const go = async (params: {
    colorMode: ColorMode;
    gsm: Gsm;
    size: FlyerSize;
    sides: Sides;
    quantity: Quantity;
    designSource: "upload" | "design" | "ai";
  }) => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      if (!res.ok) throw new Error("Failed to create order");
      const { order } = await res.json();
      const next =
        params.designSource === "upload" ? `/upload?orderId=${order.id}` :
        params.designSource === "design" ? `/design?orderId=${order.id}` :
        `/design?ai=1&orderId=${order.id}`;
      router.push(next);
    } catch (e) {
      setLoading(false);
      alert("Could not start your order. Please try again.");
    }
  };

  return { go, loading };
}

function Step({ step, children }: { step: Step; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: step.num * 0.05 }}
    >
      <div className="flex items-baseline gap-4">
        <div className="font-display text-4xl font-bold text-flame-500/20 leading-none">
          0{step.num}
        </div>
        <div>
          <h2 className="font-display text-xl font-bold tracking-tight text-ink-900 md:text-2xl">
            {step.label}
          </h2>
          <p className="text-sm text-ink-500">{step.description}</p>
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </motion.div>
  );
}

function DesignPathCard({
  icon: Icon,
  selected,
  onSelect,
  title,
  subtitle,
  badge,
}: {
  icon: React.ElementType;
  selected: boolean;
  onSelect: () => void;
  title: string;
  subtitle: string;
  badge?: string;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={cn(
        "group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300",
        selected
          ? "border-flame-500 bg-flame-500/5 ring-4 ring-flame-500/20 shadow-[0_10px_30px_-15px_rgba(255,77,46,0.4)]"
          : "border-ink-900/10 bg-paper hover:border-ink-900/30 hover:shadow-md",
      )}
    >
      {badge && (
        <span className="absolute right-3 top-3 rounded-full bg-saffron-500 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-ink-900">
          {badge}
        </span>
      )}
      <div className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
        selected ? "bg-flame-500 text-paper" : "bg-ink-900/5 text-ink-900",
      )}>
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <div className="mt-4 font-display text-base font-semibold tracking-tight text-ink-900">
        {title}
      </div>
      <p className="mt-1 text-xs leading-snug text-ink-500">{subtitle}</p>
    </motion.button>
  );
}

function PriceSummary({
  colorMode,
  gsm,
  size,
  sides,
  quantity,
  designPath,
  price,
}: {
  colorMode: ColorMode;
  gsm: Gsm;
  size: FlyerSize;
  sides: Sides;
  quantity: Quantity;
  designPath: "upload" | "design" | "ai" | null;
  price: ReturnType<typeof calculatePrice>;
}) {
  const { go, loading } = useContinueToNextStep();
  const canProceed = !!designPath;

  const onContinue = () => {
    if (!designPath) return;
    go({ colorMode, gsm, size, sides, quantity, designSource: designPath });
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-ink-900/10 bg-paper shadow-[0_30px_60px_-30px_rgba(10,10,6,0.25)]">
      <div className="border-b border-ink-900/8 bg-ink-900 p-6 text-paper">
        <div className="text-xs uppercase tracking-widest text-paper/50">
          Live estimate
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={price.total}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-2 font-display text-5xl font-bold tracking-tight"
          >
            {formatINR(price.total)}
          </motion.div>
        </AnimatePresence>
        <div className="mt-1 text-sm text-paper/60">
          ≈ {formatINR(price.perUnit)} per flyer · GST included
        </div>

        {price.savingsVsBase > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-flame-500/15 px-3 py-1 text-xs font-medium text-flame-400"
          >
            <FileText className="h-3.5 w-3.5" />
            Bulk discount saved {formatINR(price.savingsVsBase)}
          </motion.div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-ink-500">
          Your selection
        </h3>
        <dl className="mt-4 space-y-2.5 text-sm">
          <Row k="Color" v={colorMode === "single" ? "Single Color" : "Full Color"} />
          <Row k="Paper" v={`${gsm} GSM ${gsm === 130 ? "Art" : "Maplitho"}`} />
          <Row k="Size" v={size === "A4" ? "A4 (210×297mm)" : "A5 (148×210mm)"} />
          <Row k="Sides" v={sides === "single" ? "Single side" : "Double side"} />
          <Row k="Quantity" v={`${quantity.toLocaleString("en-IN")} flyers`} />
          <Row k="Design path" v={
            designPath === "upload" ? "Upload my file" :
            designPath === "design" ? "Design in editor" :
            designPath === "ai" ? "Generate with AI" :
            <span className="text-flame-500">Choose above ↓</span>
          } />
        </dl>

        <div className="mt-5 border-t border-ink-900/8 pt-4 space-y-1.5 text-sm">
          <div className="flex items-center justify-between text-ink-600">
            <span>Subtotal</span>
            <span>{formatINR(price.subtotal)}</span>
          </div>
          <div className="flex items-center justify-between text-ink-600">
            <span>GST (18%)</span>
            <span>{formatINR(price.gst)}</span>
          </div>
          <div className="flex items-center justify-between pt-2 font-display text-base font-bold text-ink-900">
            <span>Total</span>
            <span>{formatINR(price.total)}</span>
          </div>
        </div>

        <Button
          variant="flame"
          size="lg"
          className="mt-6 w-full"
          disabled={!canProceed || loading}
          onClick={onContinue}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Starting your order...
            </>
          ) : canProceed ? (
            <>
              Continue
              <ArrowRight className="h-4 w-4" />
            </>
          ) : (
            <span>Pick a design path</span>
          )}
        </Button>

        <p className="mt-3 text-center text-[11px] leading-relaxed text-ink-400">
          24hr turnaround on most orders · Pickup or delivery
        </p>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-ink-500">{k}</dt>
      <dd className="font-medium text-ink-900">{v}</dd>
    </div>
  );
}
