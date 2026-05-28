import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Click Print — Premium Flyer Printing in Bangalore";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "#FFFCF5",
          padding: 80,
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* ambient gradient */}
        <div
          style={{
            position: "absolute",
            right: -100,
            top: -100,
            width: 500,
            height: 500,
            background: "radial-gradient(circle, #FF4D2E33 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -100,
            bottom: -100,
            width: 400,
            height: 400,
            background: "radial-gradient(circle, #FFAA0033 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Logo + brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 72,
              height: 72,
              background: "#FF4D2E",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFCF5",
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            P
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: "#0A0A06", display: "flex" }}>
            Click<span style={{ color: "#FF4D2E" }}>Print</span>
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              lineHeight: 1.0,
              color: "#0A0A06",
              letterSpacing: "-0.04em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Flyers that</span>
            <span>
              <span
                style={{
                  background: "#FF4D2E",
                  color: "#FFFCF5",
                  padding: "0 24px",
                  marginRight: 16,
                  display: "inline-block",
                }}
              >
                actually
              </span>
              get picked up.
            </span>
          </div>

          <div
            style={{
              fontSize: 28,
              color: "#5C5C4D",
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <span>Bangalore · Akkipet studio</span>
            <span style={{ color: "#C8C8B7" }}>·</span>
            <span>A4 & A5 · 24hr turnaround</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
