import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/store/orders";
import { calculatePrice, type PriceInput } from "@/lib/config/pricing";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const config: PriceInput = {
    colorMode: body.colorMode,
    gsm: body.gsm,
    size: body.size,
    sides: body.sides,
    quantity: body.quantity,
  };

  // Validate
  if (!config.colorMode || !config.gsm || !config.size || !config.sides || !config.quantity) {
    return NextResponse.json({ error: "Missing config fields" }, { status: 400 });
  }

  // Validate price calculates
  try {
    calculatePrice(config);
  } catch {
    return NextResponse.json({ error: "Invalid config" }, { status: 400 });
  }

  const order = await createOrder(config, body.designSource ?? null);
  return NextResponse.json({ order });
}
