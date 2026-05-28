"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, Truck, Building2, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatINR } from "@/lib/utils";
import type { Order } from "@/lib/store/orders";

type Form = {
  name: string;
  email: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
  fulfillment: "pickup" | "delivery";
};

const init: Form = {
  name: "",
  email: "",
  phone: "",
  line1: "",
  line2: "",
  city: "Bangalore",
  state: "Karnataka",
  pincode: "",
  fulfillment: "pickup",
};

export function CheckoutFlow({ order }: { order: Order }) {
  const router = useRouter();
  const [form, setForm] = useState<Form>(init);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
  };

  const valid =
    form.name.trim().length > 1 &&
    /^\S+@\S+\.\S+$/.test(form.email) &&
    /^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, "")) &&
    (form.fulfillment === "pickup" ||
      (form.line1.length > 4 && form.pincode.length === 6));

  const deliveryFee = form.fulfillment === "delivery" ? 150 : 0;
  const grandTotal = order.pricing.total + deliveryFee;

  const submit = async () => {
    if (!valid) return;
    setLoading(true);
    setError(null);

    // In production, this opens the Razorpay checkout widget.
    // For now, the API endpoint accepts a demo payment and marks the order paid.
    try {
      // Simulate Razorpay flow
      await new Promise((r) => setTimeout(r, 1200));

      const res = await fetch(`/api/orders/${order.id}/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: form.name,
            email: form.email,
            phone: form.phone,
            address: {
              line1: form.line1,
              line2: form.line2 || undefined,
              city: form.city,
              state: form.state,
              pincode: form.pincode || "560053",
            },
          },
          razorpay_payment_id: null, // demo mode
        }),
      });

      if (!res.ok) {
        setError("Payment failed. Please try again.");
        setLoading(false);
        return;
      }

      router.push(`/order/${order.id}`);
    } catch (e) {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-12">
      {/* LEFT: form */}
      <div className="space-y-10">
        {/* Demo mode banner */}
        <div className="rounded-2xl border border-saffron-500/30 bg-saffron-500/10 p-4 text-sm text-ink-800">
          <span className="font-medium text-ink-900">Demo mode:</span> No real payment.
          Add Razorpay keys to <code className="rounded bg-ink-100 px-1 text-xs">.env.local</code> to enable live payments.
        </div>

        {/* Contact */}
        <section>
          <h2 className="font-display text-xl font-bold tracking-tight text-ink-900">
            Contact details
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Field label="Name" value={form.name} onChange={(v) => set("name", v)} placeholder="Your full name" />
            <Field label="Phone" value={form.phone} onChange={(v) => set("phone", v)} placeholder="98XXX XXXXX" type="tel" />
            <Field label="Email" value={form.email} onChange={(v) => set("email", v)} placeholder="you@email.com" type="email" className="md:col-span-2" />
          </div>
        </section>

        {/* Fulfillment */}
        <section>
          <h2 className="font-display text-xl font-bold tracking-tight text-ink-900">
            How do you want it?
          </h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <button
              onClick={() => set("fulfillment", "pickup")}
              className={cn(
                "flex items-start gap-3 rounded-2xl border p-5 text-left transition-all",
                form.fulfillment === "pickup"
                  ? "border-flame-500 bg-flame-500/5 ring-4 ring-flame-500/20"
                  : "border-ink-900/10 hover:border-ink-900/30",
              )}
            >
              <Building2 className="mt-0.5 h-5 w-5 text-flame-500" />
              <div>
                <div className="font-display font-semibold text-ink-900">Pickup from studio</div>
                <div className="mt-1 text-xs text-ink-500">Free · Akkipet, Bangalore · ready in 24hr</div>
              </div>
            </button>
            <button
              onClick={() => set("fulfillment", "delivery")}
              className={cn(
                "flex items-start gap-3 rounded-2xl border p-5 text-left transition-all",
                form.fulfillment === "delivery"
                  ? "border-flame-500 bg-flame-500/5 ring-4 ring-flame-500/20"
                  : "border-ink-900/10 hover:border-ink-900/30",
              )}
            >
              <Truck className="mt-0.5 h-5 w-5 text-flame-500" />
              <div>
                <div className="font-display font-semibold text-ink-900">Delivery in Bangalore</div>
                <div className="mt-1 text-xs text-ink-500">+₹150 · 24–48hr after print</div>
              </div>
            </button>
          </div>
        </section>

        {/* Address (only if delivery) */}
        {form.fulfillment === "delivery" && (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="font-display text-xl font-bold tracking-tight text-ink-900">
              Delivery address
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Field label="Address line 1" value={form.line1} onChange={(v) => set("line1", v)} placeholder="House #, Street" className="md:col-span-2" />
              <Field label="Address line 2 (optional)" value={form.line2} onChange={(v) => set("line2", v)} placeholder="Apartment, landmark" className="md:col-span-2" />
              <Field label="City" value={form.city} onChange={(v) => set("city", v)} />
              <Field label="Pincode" value={form.pincode} onChange={(v) => set("pincode", v)} placeholder="560XXX" />
            </div>
          </motion.section>
        )}

        {error && (
          <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </div>
        )}
      </div>

      {/* RIGHT: summary + pay button */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="overflow-hidden rounded-3xl border border-ink-900/10 bg-paper shadow-[0_30px_60px_-30px_rgba(10,10,6,0.25)]">
          <div className="border-b border-ink-900/8 bg-ink-900 p-6 text-paper">
            <div className="text-xs uppercase tracking-widest text-paper/50">
              Order #{order.id}
            </div>
            <div className="mt-2 font-display text-4xl font-bold tracking-tight">
              {formatINR(grandTotal)}
            </div>
            <div className="mt-1 text-sm text-paper/60">
              {form.fulfillment === "pickup" ? "Pickup · GST included" : "Delivery · GST included"}
            </div>
          </div>

          <div className="p-6">
            <dl className="space-y-2.5 text-sm">
              <Row k="Color" v={order.config.colorMode === "single" ? "Single" : "Full color"} />
              <Row k="Paper" v={`${order.config.gsm} GSM`} />
              <Row k="Size" v={order.config.size} />
              <Row k="Sides" v={order.config.sides === "single" ? "Single" : "Double"} />
              <Row k="Quantity" v={`${order.config.quantity.toLocaleString("en-IN")}`} />
              {order.uploadedFile && (
                <Row k="Design file" v={
                  <span className="flex items-center gap-1 text-green-700">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Uploaded
                  </span>
                } />
              )}
            </dl>

            <div className="mt-5 space-y-1.5 border-t border-ink-900/8 pt-4 text-sm">
              <div className="flex justify-between text-ink-600"><span>Subtotal</span><span>{formatINR(order.pricing.subtotal)}</span></div>
              <div className="flex justify-between text-ink-600"><span>GST 18%</span><span>{formatINR(order.pricing.gst)}</span></div>
              {deliveryFee > 0 && (
                <div className="flex justify-between text-ink-600"><span>Delivery</span><span>{formatINR(deliveryFee)}</span></div>
              )}
              <div className="flex justify-between pt-2 font-display text-base font-bold text-ink-900">
                <span>Total</span><span>{formatINR(grandTotal)}</span>
              </div>
            </div>

            <Button
              variant="flame"
              size="lg"
              className="mt-6 w-full"
              onClick={submit}
              disabled={!valid || loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing payment...
                </>
              ) : (
                <>
                  Pay {formatINR(grandTotal)}
                  <ShieldCheck className="h-4 w-4" />
                </>
              )}
            </Button>

            <p className="mt-3 text-center text-[11px] leading-relaxed text-ink-400">
              Secured by Razorpay · UPI, cards, netbanking, wallets
            </p>
          </div>
        </div>

        <Link
          href={order.designSource === "upload" ? `/upload?orderId=${order.id}` : "/order"}
          className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-ink-500 hover:text-flame-500"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </Link>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="text-xs font-medium uppercase tracking-widest text-ink-500">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 block w-full rounded-2xl border border-ink-900/10 bg-paper px-4 py-3 text-sm font-medium text-ink-900 placeholder:text-ink-400 transition-colors focus:border-flame-500 focus:outline-none focus:ring-4 focus:ring-flame-500/15"
      />
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
