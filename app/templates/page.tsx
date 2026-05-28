import { ComingSoon } from "@/components/marketing/coming-soon";

export const metadata = { title: "Templates · Click Print" };

export default function TemplatesPage() {
  return (
    <ComingSoon
      chip="Templates"
      title="Templates"
      highlight="incoming."
      body="50+ starter designs across restaurant, event, real estate, retail, and yoga categories — drop straight into the design tool and tweak. Lands with Phase 2."
      ctaHref="/design"
      ctaLabel="Open design tool"
    />
  );
}
