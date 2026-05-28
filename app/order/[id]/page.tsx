import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, MessageCircle, Phone, MapPin, ArrowRight, Sparkles, FileText, Clock } from "lucide-react";
import { getOrder, STATUS_LABEL, STATUS_COLOR } from "@/lib/store/orders";
import { Button } from "@/components/ui/button";
import { brand } from "@/lib/config/brand";
import { formatINR } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return {
    title: `Order #${id} · Click Print`,
    description: "Your flyer order is confirmed.",
  };
}

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) notFound();

  const isPaid = ["paid", "in_production", "ready", "shipped", "delivered"].includes(order.status);

  return (
    <div className="pt-24 pb-32 md:pt-32">
      <div className="container-wide">
        {/* Confetti header */}
        <div className="relative overflow-hidden rounded-3xl bg-ink-900 px-8 py-12 text-paper md:px-16 md:py-16">
          <div className="pointer-events-none absolute -left-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-flame-500/30 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 -bottom-10 h-72 w-72 rounded-full bg-saffron-500/20 blur-3xl" />

          <div className="relative max-w-2xl">
            {isPaid ? (
              <>
                <div className="inline-flex items-center gap-2 rounded-full bg-green-500/15 px-3 py-1 text-xs font-semibold text-green-300">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Payment confirmed
                </div>
                <h1 className="mt-5 font-display text-display-lg text-balance">
                  Your order's <span className="text-flame-400">in the queue.</span>
                </h1>
                <p className="mt-4 max-w-md text-lg text-paper/70">
                  We'll WhatsApp you when it's ready for pickup or shipped. Order #{order.id}.
                </p>
              </>
            ) : (
              <>
                <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${STATUS_COLOR[order.status]}`}>
                  {STATUS_LABEL[order.status]}
                </div>
                <h1 className="mt-5 font-display text-display-lg text-balance">
                  Order #{order.id}
                </h1>
              </>
            )}
          </div>
        </div>

        {/* Main grid */}
        <div className="mt-10 grid gap-10 md:gap-12 lg:grid-cols-3">
          {/* Order details */}
          <div className="space-y-8 lg:col-span-2">
            <Section title="Order summary">
              <div className="grid gap-3 md:grid-cols-2">
                <Detail icon={Sparkles} label="Color" value={order.config.colorMode === "single" ? "Single Color" : "Full Color"} />
                <Detail icon={FileText} label="Paper" value={`${order.config.gsm} GSM ${order.config.gsm === 130 ? "Art" : "Maplitho"}`} />
                <Detail icon={FileText} label="Size" value={order.config.size === "A4" ? "A4 (210×297mm)" : "A5 (148×210mm)"} />
                <Detail icon={FileText} label="Sides" value={order.config.sides === "single" ? "Single side" : "Double side"} />
                <Detail icon={FileText} label="Quantity" value={`${order.config.quantity.toLocaleString("en-IN")} flyers`} />
                <Detail icon={Clock} label="Estimated ready" value="24–48 hours" />
              </div>
            </Section>

            {order.uploadedFile && (
              <Section title="Your design file">
                <div className="flex items-start gap-4 rounded-2xl border border-ink-900/8 bg-paper p-5">
                  <FileText className="mt-0.5 h-6 w-6 shrink-0 text-flame-500" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-display text-base font-semibold tracking-tight text-ink-900">
                      {order.uploadedFile.filename}
                    </div>
                    <div className="mt-1 text-xs text-ink-500">
                      {order.uploadedFile.sizeKb} KB · {order.uploadedFile.mimeType}
                    </div>
                  </div>
                  <a
                    href={order.uploadedFile.storedPath}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-ink-900/15 px-4 py-1.5 text-xs font-medium text-ink-700 hover:border-ink-900 hover:bg-ink-900 hover:text-paper"
                  >
                    View
                  </a>
                </div>
              </Section>
            )}

            {order.customer && (
              <Section title="Delivery & contact">
                <dl className="space-y-3 text-sm">
                  <DetailRow k="Name" v={order.customer.name} />
                  <DetailRow k="Phone" v={order.customer.phone} />
                  <DetailRow k="Email" v={order.customer.email} />
                  <DetailRow k="Address" v={
                    <span className="text-right">
                      {order.customer.address.line1}<br />
                      {order.customer.address.line2 && <>{order.customer.address.line2}<br /></>}
                      {order.customer.address.city}, {order.customer.address.state} – {order.customer.address.pincode}
                    </span>
                  } />
                </dl>
              </Section>
            )}

            <Section title="Payment">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between text-ink-600"><span>Subtotal</span><span>{formatINR(order.pricing.subtotal)}</span></div>
                <div className="flex justify-between text-ink-600"><span>GST 18%</span><span>{formatINR(order.pricing.gst)}</span></div>
                <div className="flex justify-between pt-2 font-display text-base font-bold text-ink-900">
                  <span>Total</span><span>{formatINR(order.pricing.total)}</span>
                </div>
                {order.paymentRef && (
                  <div className="mt-3 rounded-xl bg-cream px-3 py-2 text-xs text-ink-500">
                    Reference: {order.paymentRef}
                  </div>
                )}
              </dl>
            </Section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-ink-900/10 bg-paper p-6">
              <h3 className="font-display text-base font-semibold text-ink-900">
                Studio contact
              </h3>
              <p className="mt-1 text-sm text-ink-500">
                Reach us anytime about this order.
              </p>
              <div className="mt-5 space-y-3">
                <a href={brand.social.whatsapp} className="flex items-center gap-3 rounded-2xl bg-ink-900 px-4 py-3 text-paper transition-colors hover:bg-flame-500">
                  <MessageCircle className="h-5 w-5" />
                  <div>
                    <div className="text-xs uppercase tracking-widest opacity-60">WhatsApp</div>
                    <div className="text-sm font-medium">{brand.whatsapp}</div>
                  </div>
                </a>
                <a href={`tel:${brand.phone}`} className="flex items-center gap-3 rounded-2xl border border-ink-900/10 px-4 py-3 text-ink-900 transition-colors hover:border-ink-900">
                  <Phone className="h-5 w-5" />
                  <div>
                    <div className="text-xs uppercase tracking-widest text-ink-500">Call</div>
                    <div className="text-sm font-medium">{brand.phone}</div>
                  </div>
                </a>
                <div className="flex items-start gap-3 rounded-2xl border border-ink-900/10 px-4 py-3 text-ink-700">
                  <MapPin className="mt-0.5 h-5 w-5 text-flame-500" />
                  <div>
                    <div className="text-xs uppercase tracking-widest text-ink-500">Studio</div>
                    <div className="text-sm font-medium">{brand.address.line1}<br/>{brand.address.line2}<br/>{brand.address.city}</div>
                  </div>
                </div>
              </div>
            </div>

            <Button asChild variant="flame" size="lg" className="w-full">
              <Link href="/order">
                Reorder
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-ink-500">
        {title}
      </h2>
      <div className="mt-4 rounded-3xl border border-ink-900/8 bg-paper p-6">
        {children}
      </div>
    </section>
  );
}

function Detail({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 text-ink-400" strokeWidth={1.75} />
      <div>
        <div className="text-xs uppercase tracking-widest text-ink-500">{label}</div>
        <div className="mt-0.5 font-display text-sm font-semibold text-ink-900">{value}</div>
      </div>
    </div>
  );
}

function DetailRow({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-ink-500">{k}</dt>
      <dd className="text-right font-medium text-ink-900">{v}</dd>
    </div>
  );
}
