import { Hero } from "@/components/marketing/hero";
import { Marquee } from "@/components/marketing/marquee";
import { ThreePaths } from "@/components/marketing/three-paths";
import { PaperGrid } from "@/components/marketing/paper-grid";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { Testimonials } from "@/components/marketing/testimonials";
import { CTA } from "@/components/marketing/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo/structured-data";
import { pageMetadata } from "@/lib/config/site";

export const metadata = pageMetadata({
  title: "Premium Flyer Printing in Bangalore",
  description: "Order print-ready flyers in three minutes. A4 and A5, single or full color, with an in-browser Canva-grade design tool and AI generation. 24-hour turnaround from Akkipet, Bangalore.",
  path: "/",
  keywords: ["flyer printing online", "design flyer free", "bulk flyer printing", "Bangalore print shop"],
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }])} />
      <Hero />
      <Marquee />
      <ThreePaths />
      <PaperGrid />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </>
  );
}
