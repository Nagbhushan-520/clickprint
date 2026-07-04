import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { getOrder, updateOrder } from "@/lib/store/orders";
import { getSupabaseAdmin, isSupabaseConfigured, DESIGN_BUCKET } from "@/lib/supabase/server";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json();
  const png = body.png as string; // dataURL
  const json = body.json;

  if (!png || !png.startsWith("data:image/png;base64,")) {
    return NextResponse.json({ error: "Invalid PNG payload" }, { status: 400 });
  }

  const buf = Buffer.from(png.replace(/^data:image\/png;base64,/, ""), "base64");
  const stamp = Date.now();
  const pngName = `designs/${id}-design-${stamp}.png`;
  const jsonName = `designs/${id}-design-${stamp}.json`;

  let storedPath: string;

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    const up = await supabase.storage
      .from(DESIGN_BUCKET)
      .upload(pngName, buf, { contentType: "image/png", upsert: true });
    if (up.error) {
      return NextResponse.json({ error: `Save failed: ${up.error.message}` }, { status: 500 });
    }
    // Save editable JSON alongside so the design can be reopened later.
    await supabase.storage
      .from(DESIGN_BUCKET)
      .upload(jsonName, Buffer.from(JSON.stringify(json)), {
        contentType: "application/json",
        upsert: true,
      });
    storedPath = supabase.storage.from(DESIGN_BUCKET).getPublicUrl(pngName).data.publicUrl;
  } else {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    const localPng = `${id}-design-${stamp}.png`;
    await fs.writeFile(path.join(UPLOAD_DIR, localPng), buf);
    await fs.writeFile(
      path.join(UPLOAD_DIR, `${id}-design-${stamp}.json`),
      JSON.stringify(json, null, 2),
    );
    storedPath = `/uploads/${localPng}`;
  }

  const updated = await updateOrder(id, {
    uploadedFile: {
      filename: `${id}-design-${stamp}.png`,
      storedPath,
      sizeKb: Math.round(buf.length / 1024),
      mimeType: "image/png",
    },
    status: "payment_pending",
  });

  return NextResponse.json({ order: updated });
}
