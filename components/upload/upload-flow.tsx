"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload as UploadIcon,
  FileText,
  X,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatINR } from "@/lib/utils";
import type { Order } from "@/lib/store/orders";

type Stage = "idle" | "selecting" | "validating" | "uploading" | "done" | "error";

const ACCEPT = "application/pdf,image/jpeg,image/jpg,image/png";
const MAX_MB = 25;

export function UploadFlow({ order }: { order: Order }) {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dpiWarning, setDpiWarning] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndPreview = useCallback(async (f: File) => {
    setError(null);
    setDpiWarning(null);
    setStage("validating");

    if (f.size > MAX_MB * 1024 * 1024) {
      setError(`File too large. Max ${MAX_MB}MB.`);
      setStage("error");
      return;
    }
    const allowed = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
    if (!allowed.includes(f.type)) {
      setError("Only PDF, JPG, or PNG accepted.");
      setStage("error");
      return;
    }

    setFile(f);

    if (f.type.startsWith("image/")) {
      const url = URL.createObjectURL(f);
      setPreview(url);
      // DPI check
      const img = new window.Image();
      img.onload = () => {
        const targetW = order.config.size === "A4" ? 2480 : 1748; // 300 DPI
        const targetH = order.config.size === "A4" ? 3508 : 2480;
        const ratio = Math.min(img.naturalWidth / targetW, img.naturalHeight / targetH);
        if (ratio < 0.66) {
          const estDpi = Math.round((Math.min(img.naturalWidth / (order.config.size === "A4" ? 8.27 : 5.83), img.naturalHeight / (order.config.size === "A4" ? 11.69 : 8.27))));
          setDpiWarning(`Low resolution (~${estDpi} DPI). Print may look blurry. Recommended: 300 DPI. You can continue, but consider re-uploading a higher-res file.`);
        }
        setStage("idle");
      };
      img.onerror = () => setStage("idle");
      img.src = url;
    } else {
      setPreview(null);
      setStage("idle");
    }
  }, [order.config.size]);

  const handleSelect = (f: File | null) => {
    if (!f) return;
    validateAndPreview(f);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setStage("idle");
    const f = e.dataTransfer.files?.[0];
    if (f) handleSelect(f);
  };

  const submit = async () => {
    if (!file) return;
    setStage("uploading");
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Fake progress while xhr uploads
      const tick = setInterval(() => {
        setProgress((p) => Math.min(p + 8, 92));
      }, 120);

      const res = await fetch(`/api/orders/${order.id}/upload`, {
        method: "POST",
        body: formData,
      });

      clearInterval(tick);
      setProgress(100);

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setError(err.error || "Upload failed");
        setStage("error");
        return;
      }

      setStage("done");
      setTimeout(() => {
        router.push(`/checkout?orderId=${order.id}`);
      }, 700);
    } catch (e) {
      setError("Network error during upload");
      setStage("error");
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setError(null);
    setDpiWarning(null);
    setStage("idle");
    setProgress(0);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-12">
      {/* LEFT: upload zone */}
      <div className="space-y-6">
        <AnimatePresence mode="wait">
          {!file && (
            <motion.div
              key="dropzone"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              onDragOver={(e) => { e.preventDefault(); setStage("selecting"); }}
              onDragLeave={() => setStage("idle")}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "relative grid place-items-center rounded-3xl border-2 border-dashed bg-paper p-12 text-center transition-all md:p-20 cursor-pointer",
                stage === "selecting"
                  ? "border-flame-500 bg-flame-500/5 scale-[1.01]"
                  : "border-ink-900/15 hover:border-flame-500 hover:bg-flame-500/3",
              )}
            >
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-flame-500 text-paper">
                <UploadIcon className="h-7 w-7" strokeWidth={1.75} />
              </div>
              <h2 className="mt-6 font-display text-2xl font-bold tracking-tight text-ink-900 md:text-3xl">
                Drop your design here
              </h2>
              <p className="mt-2 max-w-md text-base text-ink-600">
                PDF, JPG or PNG · up to {MAX_MB}MB · 300 DPI recommended
              </p>
              <Button variant="primary" size="lg" className="mt-6 pointer-events-none">
                Or click to browse
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPT}
                className="hidden"
                onChange={(e) => handleSelect(e.target.files?.[0] ?? null)}
              />
            </motion.div>
          )}

          {file && (
            <motion.div
              key="filecard"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="overflow-hidden rounded-3xl border border-ink-900/10 bg-paper"
            >
              {/* preview band */}
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-cream">
                {preview ? (
                  <img src={preview} alt="preview" className="h-full w-full object-contain" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <FileText className="h-20 w-20 text-ink-300" strokeWidth={1} />
                  </div>
                )}
                <button
                  onClick={reset}
                  className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-ink-900 text-paper transition-transform hover:scale-105"
                  aria-label="Remove file"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* meta */}
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <FileText className="mt-1 h-5 w-5 shrink-0 text-flame-500" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-display text-base font-semibold tracking-tight text-ink-900">
                      {file.name}
                    </div>
                    <div className="mt-1 text-xs text-ink-500">
                      {(file.size / 1024).toFixed(1)} KB · {file.type}
                    </div>
                  </div>
                </div>

                {dpiWarning && (
                  <div className="mt-5 flex items-start gap-3 rounded-2xl border border-saffron-500/30 bg-saffron-500/10 p-4 text-sm text-ink-800">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-saffron-600" />
                    <span>{dpiWarning}</span>
                  </div>
                )}

                {stage === "uploading" && (
                  <div className="mt-5">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
                      <motion.div
                        className="h-full bg-flame-500"
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-xs text-ink-500">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Uploading… {progress}%
                    </div>
                  </div>
                )}

                {stage === "done" && (
                  <div className="mt-5 flex items-center gap-3 rounded-2xl bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
                    <CheckCircle2 className="h-4 w-4" />
                    Upload complete — heading to checkout…
                  </div>
                )}

                {error && (
                  <div className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-800">
                    {error}
                  </div>
                )}

                {stage !== "uploading" && stage !== "done" && (
                  <Button
                    variant="flame"
                    size="lg"
                    className="mt-5 w-full"
                    onClick={submit}
                    disabled={stage === "validating"}
                  >
                    {stage === "validating" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Validating...
                      </>
                    ) : (
                      <>
                        Confirm & go to checkout
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tips */}
        <div className="rounded-3xl border border-ink-900/8 bg-cream p-6">
          <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-ink-500">
            File tips
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-600">
            <li>• PDF preferred (preserves vector + fonts)</li>
            <li>• CMYK color mode for accurate print</li>
            <li>• 3mm bleed on all sides for full-page designs</li>
            <li>• 300 DPI for crisp print quality</li>
          </ul>
        </div>
      </div>

      {/* RIGHT: order summary */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <UploadOrderSummary order={order} />
      </div>
    </div>
  );
}

function UploadOrderSummary({ order }: { order: Order }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-ink-900/10 bg-paper shadow-[0_30px_60px_-30px_rgba(10,10,6,0.25)]">
      <div className="border-b border-ink-900/8 bg-ink-900 p-6 text-paper">
        <div className="text-xs uppercase tracking-widest text-paper/50">
          Your order · #{order.id}
        </div>
        <div className="mt-2 font-display text-4xl font-bold tracking-tight">
          {formatINR(order.pricing.total)}
        </div>
        <div className="mt-1 text-sm text-paper/60">
          GST included · payment at checkout
        </div>
      </div>
      <div className="p-6">
        <dl className="space-y-2.5 text-sm">
          <Row k="Color" v={order.config.colorMode === "single" ? "Single Color" : "Full Color"} />
          <Row k="Paper" v={`${order.config.gsm} GSM`} />
          <Row k="Size" v={order.config.size} />
          <Row k="Sides" v={order.config.sides === "single" ? "Single side" : "Double side"} />
          <Row k="Quantity" v={`${order.config.quantity.toLocaleString("en-IN")} flyers`} />
        </dl>
        <Link
          href={`/order?colorMode=${order.config.colorMode}&size=${order.config.size}`}
          className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-ink-600 hover:text-flame-500"
        >
          ← Edit order
        </Link>
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
