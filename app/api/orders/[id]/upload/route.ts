import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { getOrder, updateOrder } from "@/lib/store/orders";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
const MAX_SIZE_MB = 25;

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Only PDF, JPG, PNG accepted" }, { status: 400 });
  }
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    return NextResponse.json({ error: `File too large (max ${MAX_SIZE_MB}MB)` }, { status: 400 });
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const ext = file.name.split(".").pop() || "bin";
  const safeName = `${id}-${Date.now()}.${ext}`;
  const filePath = path.join(UPLOAD_DIR, safeName);
  const buf = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buf);

  const updated = await updateOrder(id, {
    uploadedFile: {
      filename: file.name,
      storedPath: `/uploads/${safeName}`,
      sizeKb: Math.round(file.size / 1024),
      mimeType: file.type,
    },
    status: "payment_pending",
  });

  return NextResponse.json({ order: updated });
}
