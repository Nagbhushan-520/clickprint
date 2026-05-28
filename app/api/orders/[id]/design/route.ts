import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { getOrder, updateOrder } from "@/lib/store/orders";

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

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const buf = Buffer.from(png.replace(/^data:image\/png;base64,/, ""), "base64");
  const filename = `${id}-design-${Date.now()}.png`;
  await fs.writeFile(path.join(UPLOAD_DIR, filename), buf);

  // Also save the source JSON so user can re-open & edit later
  const jsonPath = `${id}-design-${Date.now()}.json`;
  await fs.writeFile(path.join(UPLOAD_DIR, jsonPath), JSON.stringify(json, null, 2));

  const updated = await updateOrder(id, {
    uploadedFile: {
      filename: filename,
      storedPath: `/uploads/${filename}`,
      sizeKb: Math.round(buf.length / 1024),
      mimeType: "image/png",
    },
    status: "payment_pending",
  });

  return NextResponse.json({ order: updated });
}
