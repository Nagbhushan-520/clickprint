import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { getOrder, updateOrder } from "@/lib/store/orders";
import { getSupabaseAdmin, isSupabaseConfigured, DESIGN_BUCKET } from "@/lib/supabase/server";

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

  const ext = file.name.split(".").pop() || "bin";
  const objectName = `uploads/${id}-${Date.now()}.${ext}`;
  const buf = Buffer.from(await file.arrayBuffer());

  let storedPath: string;

  if (isSupabaseConfigured()) {
    // Production: upload to Supabase Storage (persistent, works on Vercel).
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.storage
      .from(DESIGN_BUCKET)
      .upload(objectName, buf, { contentType: file.type, upsert: true });
    if (error) {
      return NextResponse.json({ error: `Upload failed: ${error.message}` }, { status: 500 });
    }
    const { data } = supabase.storage.from(DESIGN_BUCKET).getPublicUrl(objectName);
    storedPath = data.publicUrl;
  } else {
    // Sandbox/dev fallback: write to local public/uploads.
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    const safeName = objectName.replace("uploads/", "");
    await fs.writeFile(path.join(UPLOAD_DIR, safeName), buf);
    storedPath = `/uploads/${safeName}`;
  }

  const updated = await updateOrder(id, {
    uploadedFile: {
      filename: file.name,
      storedPath,
      sizeKb: Math.round(file.size / 1024),
      mimeType: file.type,
    },
    status: "payment_pending",
  });

  return NextResponse.json({ order: updated });
}
