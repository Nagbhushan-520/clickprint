/**
 * Tiny file-backed order store. Drop-in for Supabase later — same shape, same API.
 * Stored at .data/orders.json; uploaded files in public/uploads/.
 */
import { promises as fs } from "fs";
import path from "path";
import { calculatePrice, type PriceInput } from "@/lib/config/pricing";

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

export type Order = {
  id: string;
  config: PriceInput;
  designSource: DesignSource | null;
  uploadedFile?: {
    filename: string;
    storedPath: string;
    sizeKb: number;
    mimeType: string;
  };
  pricing: ReturnType<typeof calculatePrice>;
  customer?: {
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
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  paidAt?: string;
  paymentRef?: string;
};

async function ensureFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(ORDERS_FILE);
  } catch {
    await fs.writeFile(ORDERS_FILE, JSON.stringify({ orders: [] }, null, 2));
  }
}

async function readAll(): Promise<{ orders: Order[] }> {
  await ensureFile();
  const raw = await fs.readFile(ORDERS_FILE, "utf-8");
  return JSON.parse(raw);
}

async function writeAll(data: { orders: Order[] }) {
  await fs.writeFile(ORDERS_FILE, JSON.stringify(data, null, 2));
}

function newId() {
  return "CP" + Math.random().toString(36).slice(2, 8).toUpperCase() + Date.now().toString(36).slice(-3).toUpperCase();
}

export async function createOrder(config: PriceInput, designSource: DesignSource | null): Promise<Order> {
  const data = await readAll();
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
  data.orders.push(order);
  await writeAll(data);
  return order;
}

export async function getOrder(id: string): Promise<Order | null> {
  const data = await readAll();
  return data.orders.find((o) => o.id === id) ?? null;
}

export async function updateOrder(id: string, patch: Partial<Order>): Promise<Order | null> {
  const data = await readAll();
  const idx = data.orders.findIndex((o) => o.id === id);
  if (idx === -1) return null;
  data.orders[idx] = {
    ...data.orders[idx],
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  await writeAll(data);
  return data.orders[idx];
}

export async function listOrders(): Promise<Order[]> {
  const data = await readAll();
  return [...data.orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
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
