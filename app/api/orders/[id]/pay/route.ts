import { NextRequest, NextResponse } from "next/server";
import { getOrder, updateOrder } from "@/lib/store/orders";

/**
 * Razorpay payment confirmation endpoint.
 * In production: verify razorpay_signature against RAZORPAY_KEY_SECRET.
 * In demo mode: accept the payment as paid.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json();

  const order = await getOrder(id);
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  // TODO: when RAZORPAY_KEY_SECRET is set, verify signature here
  // const expectedSig = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
  //   .update(`${order_id}|${payment_id}`).digest("hex");

  const updated = await updateOrder(id, {
    status: "paid",
    paidAt: new Date().toISOString(),
    paymentRef: body.razorpay_payment_id || "DEMO_" + Date.now().toString(36).toUpperCase(),
    customer: body.customer,
  });

  return NextResponse.json({ order: updated });
}
