"use client";

import { useState } from "react";
import { QrCode, Loader2 } from "lucide-react";
import { PanelHeader } from "./panel-templates";
import QRCode from "qrcode";

export function PanelQRCode({ onAdd }: { onAdd: (data: string, color: string, bg: string) => Promise<void> }) {
  const [data, setData] = useState("https://clickprint.in");
  const [color, setColor] = useState("#0A0A06");
  const [bgColor, setBgColor] = useState("#FFFCF5");
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<"url" | "phone" | "wifi" | "text">("url");

  const generatePreview = async () => {
    if (!data.trim()) return;
    setLoading(true);
    try {
      const dataUrl = await QRCode.toDataURL(data, {
        width: 200,
        margin: 1,
        color: { dark: color, light: bgColor },
        errorCorrectionLevel: "M",
      });
      setPreview(dataUrl);
    } finally {
      setLoading(false);
    }
  };

  const handleTypeChange = (t: typeof type) => {
    setType(t);
    if (t === "url") setData("https://clickprint.in");
    if (t === "phone") setData("tel:+919876543210");
    if (t === "wifi") setData("WIFI:T:WPA;S:NetworkName;P:Password;;");
    if (t === "text") setData("Visit Click Print");
  };

  return (
    <div className="flex h-full flex-col">
      <PanelHeader title="QR Code" subtitle="Generate a QR code for your flyer" />

      <div className="overflow-y-auto p-3 space-y-4">
        {/* Type tabs */}
        <div className="grid grid-cols-4 gap-1">
          {(["url", "phone", "wifi", "text"] as const).map((t) => (
            <button
              key={t}
              onClick={() => handleTypeChange(t)}
              className={`rounded-md px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                type === t ? "bg-ink-900 text-paper" : "border border-ink-900/10 text-ink-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Input */}
        <div>
          <label className="text-[10px] font-semibold uppercase tracking-widest text-ink-500">
            {type === "url" ? "URL" : type === "phone" ? "Phone (tel:...)" : type === "wifi" ? "WiFi config" : "Text"}
          </label>
          <textarea
            value={data}
            onChange={(e) => setData(e.target.value)}
            rows={3}
            className="mt-2 block w-full resize-none rounded-lg border border-ink-900/10 bg-paper px-3 py-2 text-xs text-ink-900"
          />
        </div>

        {/* Colors */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-widest text-ink-500">Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="mt-2 h-10 w-full cursor-pointer rounded-lg border border-ink-900/10"
            />
          </div>
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-widest text-ink-500">Background</label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="mt-2 h-10 w-full cursor-pointer rounded-lg border border-ink-900/10"
            />
          </div>
        </div>

        {/* Preview */}
        <div className="grid place-items-center rounded-2xl border border-ink-900/10 bg-cream p-4">
          {preview ? (
            <img src={preview} alt="QR preview" className="h-32 w-32" />
          ) : (
            <button
              onClick={generatePreview}
              className="grid h-32 w-32 place-items-center rounded-xl border border-dashed border-ink-900/20 text-ink-500"
            >
              <QrCode className="h-8 w-8" />
            </button>
          )}
        </div>

        <button
          onClick={async () => {
            await onAdd(data, color, bgColor);
          }}
          disabled={!data.trim() || loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink-900 px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-flame-500 disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <QrCode className="h-4 w-4" />}
          Add to canvas
        </button>

        <p className="rounded-xl bg-cream px-3 py-2 text-[11px] leading-relaxed text-ink-500">
          QR codes are added as scalable vectors. Print at any size without losing quality.
        </p>
      </div>
    </div>
  );
}
