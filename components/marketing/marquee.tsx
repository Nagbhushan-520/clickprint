"use client";

export function Marquee() {
  const items = [
    "70 GSM Maplitho",
    "80 GSM Maplitho",
    "90 GSM Maplitho",
    "100 GSM Maplitho",
    "90 GSM Multi-color",
    "130 GSM Art Paper",
    "A4 · A5",
    "Single side · Double side",
    "Single color · Full color",
    "100 · 250 · 500 · 1000 · 2500 · 5000",
  ];

  return (
    <section className="border-y border-ink-900/8 bg-ink-900 py-4 text-paper overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap will-change-transform">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="mx-6 flex items-center gap-6 text-sm font-medium uppercase tracking-widest">
            {item}
            <span className="text-flame-400">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
