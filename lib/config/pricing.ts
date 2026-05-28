/**
 * Placeholder pricing. Real rates go in here once you send your sheet.
 * Formula: basePerUnit * quantity * sidesMultiplier * gsmMultiplier
 * (single-color and multi-color are separate base rates.)
 */

export type ColorMode = "single" | "multi";
export type FlyerSize = "A4" | "A5";
export type Sides = "single" | "double";

export const SINGLE_COLOR_GSMS = [70, 80, 90, 100] as const;
export const MULTI_COLOR_GSMS = [90, 130] as const;

export type SingleColorGsm = (typeof SINGLE_COLOR_GSMS)[number];
export type MultiColorGsm = (typeof MULTI_COLOR_GSMS)[number];
export type Gsm = SingleColorGsm | MultiColorGsm;

export const QUANTITY_TIERS = [100, 250, 500, 1000, 2500, 5000] as const;
export type Quantity = (typeof QUANTITY_TIERS)[number];

// Placeholder base rates per unit (INR). Update these from your real sheet.
const BASE_RATE: Record<ColorMode, Record<FlyerSize, number>> = {
  single: { A4: 1.4, A5: 0.8 },
  multi: { A4: 3.2, A5: 1.9 },
};

// GSM multipliers — thicker paper costs more.
const GSM_MULTIPLIER: Record<number, number> = {
  70: 1.0,
  80: 1.08,
  90: 1.16,
  100: 1.25,
  130: 1.4,
};

// Bulk discount — bigger orders, lower per-unit rate.
const BULK_DISCOUNT: Record<Quantity, number> = {
  100: 1.0,
  250: 0.92,
  500: 0.84,
  1000: 0.76,
  2500: 0.7,
  5000: 0.66,
};

// Double-sided is roughly 1.65x (not 2x — printing setup amortizes).
const SIDES_MULTIPLIER: Record<Sides, number> = {
  single: 1.0,
  double: 1.65,
};

export type PriceInput = {
  colorMode: ColorMode;
  size: FlyerSize;
  gsm: Gsm;
  sides: Sides;
  quantity: Quantity;
};

export function calculatePrice(input: PriceInput): {
  perUnit: number;
  subtotal: number;
  gst: number;
  total: number;
  savingsVsBase: number;
} {
  const base = BASE_RATE[input.colorMode][input.size];
  const gsmMult = GSM_MULTIPLIER[input.gsm] ?? 1;
  const sidesMult = SIDES_MULTIPLIER[input.sides];
  const bulk = BULK_DISCOUNT[input.quantity];

  const perUnit = base * gsmMult * sidesMult * bulk;
  const subtotal = perUnit * input.quantity;
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  const baseUnit = base * gsmMult * sidesMult;
  const baseSubtotal = baseUnit * input.quantity;
  const savingsVsBase = baseSubtotal - subtotal;

  return {
    perUnit: Math.round(perUnit * 100) / 100,
    subtotal: Math.round(subtotal),
    gst: Math.round(gst),
    total: Math.round(total),
    savingsVsBase: Math.round(savingsVsBase),
  };
}

export const PAPER_INFO: Record<number, { label: string; description: string }> = {
  70: { label: "70 GSM Maplitho", description: "Light & economical. Best for high-volume drops." },
  80: { label: "80 GSM Maplitho", description: "Standard everyday paper. The dependable choice." },
  90: { label: "90 GSM Maplitho", description: "Premium feel without premium price. Crisp print." },
  100: { label: "100 GSM Maplitho", description: "Sturdy, substantial. Feels like a brochure." },
  130: { label: "130 GSM Art Paper", description: "Glossy. Vivid color. The flagship finish." },
};
