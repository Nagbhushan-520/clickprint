import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  QUANTITY_TIERS,
  SINGLE_COLOR_GSMS,
  MULTI_COLOR_GSMS,
  calculatePrice,
} from "@/lib/config/pricing";
import { formatINR } from "@/lib/utils";

export const metadata = {
  title: "Pricing · Click Print",
  description: "Full price matrix for A4 and A5 flyers. Single or multi-color, every quantity tier and paper option.",
};

type MatrixSection = {
  title: string;
  size: "A4" | "A5";
  colorMode: "single" | "multi";
  gsms: readonly number[];
  sides: "single" | "double";
};

const SECTIONS: MatrixSection[] = [
  { title: "A5 · Single Color · Single Side", size: "A5", colorMode: "single", gsms: SINGLE_COLOR_GSMS, sides: "single" },
  { title: "A5 · Full Color · Single Side", size: "A5", colorMode: "multi", gsms: MULTI_COLOR_GSMS, sides: "single" },
  { title: "A5 · Full Color · Double Side", size: "A5", colorMode: "multi", gsms: MULTI_COLOR_GSMS, sides: "double" },
  { title: "A4 · Single Color · Single Side", size: "A4", colorMode: "single", gsms: SINGLE_COLOR_GSMS, sides: "single" },
  { title: "A4 · Full Color · Single Side", size: "A4", colorMode: "multi", gsms: MULTI_COLOR_GSMS, sides: "single" },
  { title: "A4 · Full Color · Double Side", size: "A4", colorMode: "multi", gsms: MULTI_COLOR_GSMS, sides: "double" },
];

export default function PricingPage() {
  return (
    <div className="pt-24 pb-32 md:pt-32">
      <div className="container-wide">
        <div className="max-w-2xl">
          <div className="chip">Pricing</div>
          <h1 className="mt-5 text-display-lg text-balance text-ink-900">
            Honest pricing.
            <br /><span className="text-flame-500">Bulk discounts baked in.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ink-600">
            All prices include 18% GST and free pickup. Bigger orders cost less per flyer —
            here's the full matrix.
          </p>
        </div>

        <div className="mt-12 space-y-12 md:mt-16 md:space-y-16">
          {SECTIONS.map((s) => (
            <PriceMatrix key={s.title} section={s} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 flex flex-col items-center gap-4 text-center md:mt-28">
          <div className="chip">Configure your exact order</div>
          <h2 className="text-display text-balance text-ink-900">
            Use the configurator for your exact mix.
          </h2>
          <Button asChild variant="flame" size="xl" className="mt-2">
            <Link href="/order">
              Open configurator
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function PriceMatrix({ section }: { section: MatrixSection }) {
  return (
    <div>
      <h2 className="mb-5 font-display text-2xl font-bold tracking-tight text-ink-900">
        {section.title}
      </h2>
      <div className="overflow-hidden rounded-2xl border border-ink-900/10 bg-paper">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead className="bg-ink-900 text-paper">
              <tr>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-widest">
                  Quantity
                </th>
                {section.gsms.map((g) => (
                  <th key={g} className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-widest">
                    {g} GSM
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {QUANTITY_TIERS.map((q, qi) => (
                <tr key={q} className={qi % 2 === 0 ? "bg-paper" : "bg-cream"}>
                  <td className="px-5 py-3.5 font-display text-sm font-semibold text-ink-900">
                    {q.toLocaleString("en-IN")}
                  </td>
                  {section.gsms.map((g) => {
                    const price = calculatePrice({
                      colorMode: section.colorMode,
                      gsm: g as never,
                      size: section.size,
                      sides: section.sides,
                      quantity: q,
                    });
                    return (
                      <td key={g} className="px-5 py-3.5 text-right">
                        <div className="font-display text-sm font-semibold text-ink-900">
                          {formatINR(price.total)}
                        </div>
                        <div className="text-[10px] text-ink-500">
                          ₹{price.perUnit.toFixed(2)} ea.
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
