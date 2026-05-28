import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { brand } from "@/lib/config/brand";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema, breadcrumbSchema } from "@/lib/seo/structured-data";
import { pageMetadata } from "@/lib/config/site";

export const metadata = pageMetadata({
  title: "Flyer Printing FAQ — File Formats, Paper, Pricing, Delivery",
  description: "Common questions about Click Print flyer printing in Bangalore: accepted file formats, paper choices, GST and pricing, turnaround and delivery, design tool, and AI generation.",
  path: "/faq",
  keywords: ["flyer printing FAQ", "PDF flyer format", "GSM paper guide", "flyer DPI requirements"],
});

type FAQ = { q: string; a: React.ReactNode };

const SECTIONS: { title: string; items: FAQ[] }[] = [
  {
    title: "Files & artwork",
    items: [
      {
        q: "What file formats do you accept?",
        a: "PDF is preferred — it preserves type and vector. We also accept JPG, PNG, and AI / EPS. For best print quality, set color mode to CMYK, resolution to 300 DPI, and include 3mm bleed on all sides.",
      },
      {
        q: "My file is low resolution. Will it look bad?",
        a: "Probably. We auto-check the DPI on upload and flag anything below 200 DPI before you pay. We'd rather pause your order than print something blurry. If yours is borderline, we'll send a print-quality preview before we commit.",
      },
      {
        q: "I don't have a design — can you help?",
        a: (
          <>
            Three ways:
            <ul className="mt-2 space-y-1 list-disc pl-5">
              <li>Use our <Link href="/design" className="font-medium text-flame-500 hover:underline">in-browser design tool</Link> — Canva-grade, free.</li>
              <li>Use AI to generate a starting point, then tweak it.</li>
              <li>WhatsApp us your idea and we'll quote a custom design.</li>
            </ul>
          </>
        ),
      },
      {
        q: "Do you offer bleed and crop marks?",
        a: "Yes. If you're uploading your own file, include 3mm bleed and standard crop marks. If you're using our design tool, bleed is added automatically on export.",
      },
    ],
  },
  {
    title: "Paper & printing",
    items: [
      {
        q: "What paper do you use?",
        a: "Genuine maplitho for single-color jobs (70/80/90/100 GSM) and a mix of 90 GSM coated stock and 130 GSM art paper for full-color jobs. All sourced from established Indian mills — no mystery card.",
      },
      {
        q: "What's the difference between 70 GSM and 130 GSM?",
        a: "Weight and feel. 70 GSM is light and economical — ideal for high-volume doorstep drops. 130 GSM art paper is glossy, heavy, and vivid — the flagship finish for premium positioning. 90 GSM is the sweet spot most customers pick.",
      },
      {
        q: "Single color or full color — which do I need?",
        a: "Single color = black ink only. Cheapest, fine for text-heavy menus and simple promos. Full color (CMYK) = anything with photos, brand logos, or color graphics. If unsure, full color on 90 GSM is the safe default.",
      },
      {
        q: "Can I get a sample before ordering?",
        a: "Yes — drop by the Akkipet studio and we'll show you every paper option in person. For out-of-Bangalore orders, we can ship a sample pack for ₹50 (refunded against your first order).",
      },
    ],
  },
  {
    title: "Pricing & payment",
    items: [
      {
        q: "Why do bigger orders cost less per flyer?",
        a: "Print setup is largely fixed cost. Once we're set up, the marginal cost of printing 1000 vs 100 is small — and we pass that saving back. The discount curve is real: 5,000 flyers can cost less than 2× a 1,000-flyer order.",
      },
      {
        q: "Is GST included in the price?",
        a: "Yes. Every price you see (configurator, pricing page, checkout) is the final amount with 18% GST included. We email a GST invoice within 24 hours of payment.",
      },
      {
        q: "What payment methods do you accept?",
        a: "UPI, credit/debit cards, netbanking, and wallets — all via Razorpay. For corporate orders above ₹50,000, we can invoice with 7-day payment terms.",
      },
      {
        q: "Do you offer refunds?",
        a: "If we print incorrectly (wrong paper, wrong quantity, smudged ink), we re-print at no cost or refund 100%. If you upload the wrong file and we print exactly what you sent, we can't refund — but we'll discount a reprint.",
      },
    ],
  },
  {
    title: "Turnaround & delivery",
    items: [
      {
        q: "How long does it take?",
        a: "Most orders ship within 24 hours of payment. Larger jobs (>2,500 flyers, double-sided, premium paper) may take 48 hours. We'll WhatsApp you when it's ready.",
      },
      {
        q: "Do you deliver?",
        a: "Yes — free local pickup in Akkipet, ₹100–250 delivery anywhere in Bangalore (depends on distance). For outside Bangalore, we ship via reputed couriers; cost depends on weight and destination.",
      },
      {
        q: "Can I track my order?",
        a: "Yes. After payment, you get an order ID. Log into your account or open the order email to see status (in production / ready / dispatched / delivered).",
      },
    ],
  },
  {
    title: "Design tool & AI",
    items: [
      {
        q: "What can the design tool do?",
        a: "Pretty much what Canva does: A4 and A5 templates, text with custom fonts (full Google Fonts library), shapes, image upload, layers, undo/redo, snap guides. Final export is print-grade vector PDF — sharp at any scale.",
      },
      {
        q: "Is the design tool free?",
        a: "Completely free to use, even if you don't print with us. Save your work and come back later. All designs you create are yours.",
      },
      {
        q: "How does AI generation work?",
        a: "Type what you want the flyer to look like — \"Diwali sale poster with diyas and gold accents\" — and we generate options using Google's Gemini Nano Banana model. Pick the one you like, drop it into the editor, tweak the text, send to print. You get 3–5 free generations with every paid order.",
      },
      {
        q: "Can I use AI-generated images commercially?",
        a: "Yes. Gemini Nano Banana outputs are royalty-free and safe for commercial use. If you're doing something brand-sensitive (logo replication), we'd still recommend a human designer for final polish.",
      },
    ],
  },
];

// Flatten FAQ sections into a plain array for schema.org markup
function getFlatFaqs(): { question: string; answer: string }[] {
  const result: { question: string; answer: string }[] = [];
  for (const section of SECTIONS) {
    for (const item of section.items) {
      const answer = typeof item.a === "string"
        ? item.a
        : item.a && typeof item.a === "object" && "props" in item.a
          ? extractText(item.a as React.ReactElement)
          : "";
      result.push({ question: item.q, answer });
    }
  }
  return result;
}

function extractText(node: React.ReactElement | string | null | undefined): string {
  if (!node) return "";
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(extractText as any).join(" ");
  const children = (node as any).props?.children;
  if (children == null) return "";
  if (Array.isArray(children)) return children.map(extractText as any).join(" ");
  if (typeof children === "string") return children;
  return extractText(children as React.ReactElement);
}

export default function FAQPage() {
  return (
    <div className="pt-24 pb-32 md:pt-32">
      <JsonLd
        data={[
          faqSchema(getFlatFaqs()),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "FAQ", url: "/faq" },
          ]),
        ]}
      />
      <div className="container-wide">
        <div className="max-w-2xl">
          <div className="chip">FAQ</div>
          <h1 className="mt-5 text-display-lg text-balance text-ink-900">
            Questions, <span className="text-flame-500">answered.</span>
          </h1>
          <p className="mt-5 text-lg text-ink-600">
            If your question isn't here, WhatsApp us or call the studio. We answer fast.
          </p>
        </div>

        <div className="mt-12 grid gap-16 md:mt-16 md:grid-cols-[1fr_280px] md:gap-12">
          {/* FAQ groups */}
          <div className="space-y-14">
            {SECTIONS.map((section) => (
              <div key={section.title}>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink-900 md:text-3xl">
                  {section.title}
                </h2>
                <Accordion type="single" collapsible className="mt-5">
                  {section.items.map((item, i) => (
                    <AccordionItem key={i} value={`${section.title}-${i}`}>
                      <AccordionTrigger>{item.q}</AccordionTrigger>
                      <AccordionContent>{item.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          {/* Sidebar - contact */}
          <aside className="md:sticky md:top-28 md:self-start">
            <div className="rounded-3xl border border-ink-900/10 bg-paper p-6">
              <div className="text-xs uppercase tracking-widest text-ink-500">Still stuck?</div>
              <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-ink-900">
                Reach a human at the studio.
              </h3>
              <p className="mt-2 text-sm text-ink-600">
                Most queries we answer in under 10 minutes.
              </p>

              <div className="mt-5 space-y-3">
                <a href={brand.social.whatsapp} className="flex items-center gap-3 rounded-2xl bg-ink-900 px-4 py-3 text-paper transition-colors hover:bg-flame-500">
                  <MessageCircle className="h-5 w-5" />
                  <div>
                    <div className="text-xs uppercase tracking-widest opacity-60">WhatsApp</div>
                    <div className="text-sm font-medium">{brand.whatsapp}</div>
                  </div>
                </a>
                <a href={`tel:${brand.phone}`} className="flex items-center gap-3 rounded-2xl border border-ink-900/10 px-4 py-3 text-ink-900 transition-colors hover:border-ink-900">
                  <Phone className="h-5 w-5" />
                  <div>
                    <div className="text-xs uppercase tracking-widest text-ink-500">Call</div>
                    <div className="text-sm font-medium">{brand.phone}</div>
                  </div>
                </a>
              </div>

              <Button asChild variant="ghost" size="md" className="mt-5 w-full">
                <Link href="/order">
                  Just start an order
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
