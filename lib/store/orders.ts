/**
 * Order store. Uses Supabase (Postgres) when configured; falls back to a local
 * JSON file for sandbox/dev when Supabase env vars are absent. Same public API
 * either way, so API routes never change.
 */
import { promises as fs } from "fs";
import path from "path";
import { calculatePrice, type PriceInput } from "@/lib/config/pricing";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";

const DATA_DIR = path.join(process.cwd(), ".data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

export type OrderStatus =
  | "draft"
  | "design_pending"
  | "payment_pending"
  | "paid"
  | "in_production"
  | "ready"
  | "shipped"
  | "delivered"
  | "cancelled";

export type DesignSource = "upload" | "design" | "ai";

export type UploadedFile = {
  filename: string;
  storedPath: string; // public URL (Supabase) or /uploads path (local)
  sizeKb: number;
  mimeType: string;
};

export type Customer = {
  name: string;
  email: string;
  phone: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
  };
};

export type Order = {
  id: string;
  config: PriceInput;
  designSource: DesignSource | null;
  uploadedFile?: UploadedFile;
  pricing: ReturnType<typeof calculatePrice>;
  customer?: Customer;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  paidAt?: string;
  paymentRef?: string;
};

function newId() {
  return (
    "CP" +
    Math.random().toString(36).slice(2, 8).toUpperCase() +
    Date.now().toString(36).slice(-3).toUpperCase()
  );
}

// ---------- Supabase row <-> Order mapping ----------

/* eslint-disable @typescript-eslint/no-explicit-any */
function rowToOrder(row: any): Order {
  return {
    id: row.id,
    config: row.config,
    designSource: row.design_source ?? null,
    uploadedFile: row.uploaded_file ?? undefined,
    pricing: row.pricing,
    customer: row.customer ?? undefined,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    paidAt: row.paid_at ?? undefined,
    paymentRef: row.payment_ref ?? undefined,
  };
}

function patchToRow(patch: Partial<Order>): Record<string, unknown> {
  const row: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (patch.config !== undefined) row.config = patch.config;
  if (patch.designSource !== undefined) row.design_source = patch.designSource;
  if (patch.uploadedFile !== undefined) row.uploaded_file = patch.uploadedFile;
  if (patch.pricing !== undefined) row.pricing = patch.pricing;
  if (patch.customer !== undefined) row.customer = patch.customer;
  if (patch.status !== undefined) row.status = patch.status;
  if (patch.paidAt !== undefined) row.paid_at = patch.paidAt;
  if (patch.paymentRef !== undefined) row.payment_ref = patch.paymentRef;
  return row;
}

// ---------- Local JSON fallback (sandbox/dev only) ----------

async function readAllLocal(): Promise<{ orders: Order[] }> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    const raw = await fs.readFile(ORDERS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { orders: [] };
  }
}
async function writeAllLocal(data: { orders: Order[] }) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(ORDERS_FILE, JSON.stringify(data, null, 2));
}

// ---------- Public API ----------

export async function createOrder(
  config: PriceInput,
  designSource: DesignSource | null,
): Promise<Order> {
  const now = new Date().toISOString();
  const order: Order = {
    id: newId(),
    config,
    designSource,
    pricing: calculatePrice(config),
    status: "draft",
    createdAt: now,
    updatedAt: now,
  };

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("orders").insert({
      id: order.id,
      config: order.config,
      design_source: order.designSource,
      pricing: order.pricing,
      status: order.status,
      created_at: order.createdAt,
      updated_at: order.updatedAt,
    });
    if (error) throw new Error(`createOrder: ${error.message}`);
    return order;
  }

  const data = await readAllLocal();
  data.orders.push(order);
  await writeAllLocal(data);
  return order;
}

export async function getOrder(id: string): Promise<Order | null> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw new Error(`getOrder: ${error.message}`);
    return data ? rowToOrder(data) : null;
  }

  const data = await readAllLocal();
  return data.orders.find((o) => o.id === id) ?? null;
}

export async function updateOrder(
  id: string,
  patch: Partial<Order>,
): Promise<Order | null> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("orders")
      .update(patchToRow(patch))
      .eq("id", id)
      .select("*")
      .maybeSingle();
    if (error) throw new Error(`updateOrder: ${error.message}`);
    return data ? rowToOrder(data) : null;
  }

  const local = await readAllLocal();
  const idx = local.orders.findIndex((o) => o.id === id);
  if (idx === -1) return null;
  local.orders[idx] = {
    ...local.orders[idx],
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  await writeAllLocal(local);
  return local.orders[idx];
}

export async function listOrders(): Promise<Order[]> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(`listOrders: ${error.message}`);
    return (data ?? []).map(rowToOrder);
  }

  const local = await readAllLocal();
  return [...local.orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export const STATUS_LABEL: Record<OrderStatus, string> = {
  draft: "Draft",
  design_pending: "Awaiting design",
  payment_pending: "Awaiting payment",
  paid: "Paid",
  in_production: "Printing",
  ready: "Ready for pickup",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const STATUS_COLOR: Record<OrderStatus, string> = {
  draft: "bg-ink-100 text-ink-700",
  design_pending: "bg-saffron-500/15 text-saffron-600",
  payment_pending: "bg-saffron-500/15 text-saffron-600",
  paid: "bg-green-100 text-green-800",
  in_production: "bg-flame-500/15 text-flame-700",
  ready: "bg-green-100 text-green-800",
  shipped: "bg-blue-100 text-blue-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};
