import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

type Spec = { label: string; value: string };
type UseCase = { title: string; body: string };

export type SizeDetailProps = {
  size: "A4" | "A5";
  dimensions: string;
  inches: string;
  heroTitle: string;
  heroSubtitle: string;
  paperOptions: {
    gsm: number;
    label: string;
    description: string;
    bestFor: string;
    isPremium?: boolean;
  }[];
  useCases: UseCase[];
  specs: Spec[];
  popularQuantity: number;
  popularQuantityPrice: number;
};

export function SizeDetail({
  size,
  dimensions,
  inches,
  heroTitle,
  heroSubtitle,
  paperOptions,
  useCases,
  specs,
  popularQuantity,
  popularQuantityPrice,
}: SizeDetailProps) {
  return (
    <div className="pt-24 pb-32 md:pt-32">
      {/* HERO */}
      <div className="container-wide">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <div className="chip">{size} Flyers</div>
            <h1 className="mt-5 text-display-lg text-balance text-ink-900">
              {heroTitle}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
              {heroSubtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="flame" size="xl">
                <Link href={`/order?size=${size}`}>
                  Configure {size} order
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="xl">
                <Link href="/pricing">See full pricing</Link>
              </Button>
            </div>
          </div>

          {/* Visual specimen */}
          <div className="md:col-span-5">
            <div className="relative aspect-[3/4] w-full max-w-sm mx-auto">
              <div className="absolute inset-0 -translate-x-3 -translate-y-3 rounded-md bg-ink-900/10" />
              <div className="absolute inset-0 -translate-x-1.5 -translate-y-1.5 rounded-md bg-ink-900/15" />
              <div className="relative h-full w-full overflow-hidden rounded-md bg-paper border border-ink-900/10 shadow-[0_30px_60px_-30px_rgba(10,10,6,0.4)]">
                <div className="absolute inset-x-4 top-4 text-[9px] font-semibold uppercase tracking-widest text-ink-400">
                  Flyer · {size}
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <div className="font-display text-7xl font-bold text-flame-500 md:text-8xl">
                    {size}
                  </div>
                  <div className="mt-3 font-display text-sm font-medium text-ink-700">{dimensions}</div>
                  <div className="mt-1 text-xs text-ink-400">({inches})</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Paper options */}
      <section className="mt-20 md:mt-28">
        <div className="container-wide">
          <div className="max-w-2xl">
            <div className="chip">Paper options</div>
            <h2 className="mt-5 text-display text-balance text-ink-900">
              Paper that prints right.
            </h2>
            <p className="mt-4 max-w-lg text-lg text-ink-600">
              Every {size} flyer is on real maplitho or art paper. Pick by feel and price.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {paperOptions.map((p) => (
              <div
                key={p.gsm}
                className="group flex gap-5 rounded-3xl border border-ink-900/8 bg-paper p-6 transition-all hover:border-ink-900/30 hover:shadow-[0_20px_40px_-20px_rgba(10,10,6,0.25)]"
              >
                <div className="relative grid h-24 w-16 shrink-0 place-items-center rounded-md bg-gradient-to-br from-ink-100 to-ink-200">
                  <div className="text-center">
                    <div className="font-display text-base font-bold text-ink-900 leading-none">
                      {p.gsm}
                    </div>
                    <div className="mt-0.5 text-[7px] font-medium uppercase tracking-widest text-ink-500 leading-none">
                      GSM
                    </div>
                  </div>
                  {p.isPremium && (
                    <span className="absolute -top-2 -right-2 rounded-full bg-flame-500 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-widest text-paper">
                      Premium
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-lg font-bold tracking-tight text-ink-900">{p.label}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{p.description}</p>
                  <div className="mt-3 inline-flex rounded-full bg-flame-500/10 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-flame-700">
                    Best for: {p.bestFor}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="mt-20 md:mt-28">
        <div className="container-wide">
          <div className="max-w-2xl">
            <div className="chip">Use cases</div>
            <h2 className="mt-5 text-display text-balance text-ink-900">
              Who's printing {size} flyers?
            </h2>
          </div>

          <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {useCases.map((uc, i) => (
              <div
                key={uc.title}
                className="rounded-2xl border border-ink-900/8 bg-paper p-6 transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(10,10,6,0.25)]"
              >
                <div className="font-display text-3xl font-bold text-flame-500/40">
                  0{i + 1}
                </div>
                <h3 className="mt-3 font-display text-lg font-bold tracking-tight text-ink-900">
                  {uc.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{uc.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="mt-20 md:mt-28">
        <div className="container-wide">
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <div className="chip">Specs</div>
              <h2 className="mt-5 text-display text-balance text-ink-900">
                {size}, demystified.
              </h2>
            </div>
            <div className="md:col-span-7">
              <dl className="divide-y divide-ink-900/8 border-y border-ink-900/8">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex items-baseline justify-between py-4">
                    <dt className="text-sm font-medium text-ink-500">{spec.label}</dt>
                    <dd className="font-display text-base font-semibold text-ink-900">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing teaser + CTA */}
      <section className="mt-20 md:mt-28">
        <div className="container-wide">
          <div className="relative overflow-hidden rounded-3xl bg-ink-900 px-8 py-16 text-paper md:px-16 md:py-24">
            <div className="pointer-events-none absolute -left-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-flame-500/40 blur-3xl" />
            <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-saffron-500/30 blur-3xl" />

            <div className="relative max-w-2xl">
              <div className="chip border-paper/15 bg-paper/10 text-paper">
                Popular {size} order
              </div>
              <h2 className="mt-5 font-display text-display-lg text-balance">
                {popularQuantity.toLocaleString("en-IN")} {size} flyers from
                <span className="text-flame-400"> ₹{popularQuantityPrice.toLocaleString("en-IN")}</span>
              </h2>
              <p className="mt-5 max-w-md text-lg text-paper/70">
                Full color · double-sided · 90 GSM. Real numbers; configurator will refine.
              </p>
              <Button asChild variant="flame" size="xl" className="mt-8">
                <Link href={`/order?size=${size}`}>
                  Start {size} order
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
