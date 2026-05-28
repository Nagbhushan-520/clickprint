import Link from "next/link";
import { ArrowRight, Ruler, Printer, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Flyer Printing · A4 & A5 · Click Print",
  description: "Premium flyer printing in Bangalore. A4 and A5 in single or full color on real maplitho and art paper.",
};

const SIZES = [
  {
    size: "A4",
    dimensions: "210 × 297 mm",
    href: "/flyers/a4",
    headline: "Full-page impact.",
    blurb: "The classic flyer. Big enough to tell the whole story — events, restaurant menus, real-estate listings, B2B handouts.",
    bestFor: ["Restaurant menus", "Event invites", "Real-estate listings", "Sales handouts"],
    startsAt: 0.84,
    badge: "Best for storytelling",
  },
  {
    size: "A5",
    dimensions: "148 × 210 mm",
    href: "/flyers/a5",
    headline: "Hand-friendly.",
    blurb: "Half the size, half the cost — twice the drop count. Best for doorstep drops, gym mailers, festival promos, and anything customers will pocket.",
    bestFor: ["Doorstep drops", "Gym & yoga", "Festival promos", "Pocket-friendly menus"],
    startsAt: 0.48,
    badge: "Best for volume",
  },
];

const FEATURES = [
  { icon: Layers, title: "5 paper options", body: "70/80/90/100 GSM maplitho for single color · 90/130 GSM for full color." },
  { icon: Printer, title: "Single or double sided", body: "Print one side or both. Double side is just 65% more, not 2x." },
  { icon: Ruler, title: "Two sizes that cover everything", body: "A4 for storytelling, A5 for high-volume distribution." },
];

export default function FlyersPage() {
  return (
    <div className="pt-24 pb-32 md:pt-32">
      <div className="container-wide">
        <div className="max-w-2xl">
          <div className="chip">Flyer printing</div>
          <h1 className="mt-5 text-display-lg text-balance text-ink-900">
            Two sizes.
            <br />
            <span className="text-flame-500">Endless use cases.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
            We do A4 and A5 flyers — single color or full color, single or double sided,
            on paper that actually feels like paper. Pick a size below to dig in.
          </p>
        </div>

        {/* Size comparison cards */}
        <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 md:gap-6">
          {SIZES.map((s) => (
            <Link
              key={s.size}
              href={s.href}
              className="group relative overflow-hidden rounded-3xl border border-ink-900/8 bg-paper p-7 transition-all duration-500 hover:-translate-y-1 hover:border-ink-900 hover:shadow-[0_30px_60px_-30px_rgba(10,10,6,0.4)] md:p-10"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-display text-7xl font-bold tracking-tight text-flame-500 md:text-8xl">
                    {s.size}
                  </div>
                  <div className="mt-2 text-sm text-ink-500">{s.dimensions}</div>
                </div>
                <span className="rounded-full bg-ink-900/5 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-ink-700">
                  {s.badge}
                </span>
              </div>

              <h3 className="mt-8 font-display text-2xl font-bold tracking-tight text-ink-900 md:text-3xl">
                {s.headline}
              </h3>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-600">
                {s.blurb}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {s.bestFor.map((bf) => (
                  <span key={bf} className="rounded-full bg-ink-900/5 px-3 py-1 text-xs text-ink-700">
                    {bf}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex items-end justify-between border-t border-ink-900/8 pt-5">
                <div>
                  <div className="text-xs uppercase tracking-widest text-ink-500">
                    Starts at
                  </div>
                  <div className="mt-1 font-display text-xl font-bold text-ink-900">
                    ₹{s.startsAt}<span className="text-sm font-medium text-ink-500"> /flyer</span>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 text-sm font-medium text-ink-900">
                  Explore {s.size}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Features strip */}
        <div className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-ink-900/8 bg-ink-900/8 md:mt-28 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-paper p-7">
              <f.icon className="h-7 w-7 text-flame-500" strokeWidth={1.5} />
              <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-ink-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{f.body}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 flex flex-col items-center gap-4 text-center md:mt-28">
          <div className="chip">Ready when you are</div>
          <h2 className="text-display text-balance text-ink-900">
            Or just build your order now.
          </h2>
          <Button asChild variant="flame" size="xl" className="mt-2">
            <Link href="/order">
              Configure flyers
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
