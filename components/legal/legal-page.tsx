export function LegalPage({
  title,
  chip,
  sections,
  lastUpdated,
}: {
  title: string;
  chip: string;
  sections: { heading: string; body: React.ReactNode }[];
  lastUpdated: string;
}) {
  return (
    <div className="container-wide pt-24 pb-32 md:pt-32">
      <div className="mx-auto max-w-3xl">
        <div className="chip">{chip}</div>
        <h1 className="mt-5 text-display text-balance text-ink-900">{title}</h1>
        <p className="mt-4 text-sm text-ink-500">Last updated: {lastUpdated}</p>

        <div className="mt-12 space-y-10">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-xl font-bold tracking-tight text-ink-900 md:text-2xl">
                {s.heading}
              </h2>
              <div className="mt-3 space-y-3 text-base leading-relaxed text-ink-600">
                {s.body}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
