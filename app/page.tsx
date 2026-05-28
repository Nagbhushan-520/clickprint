import { Hero } from "@/components/marketing/hero";
import { Marquee } from "@/components/marketing/marquee";
import { ThreePaths } from "@/components/marketing/three-paths";
import { PaperGrid } from "@/components/marketing/paper-grid";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { Testimonials } from "@/components/marketing/testimonials";
import { CTA } from "@/components/marketing/cta";

export default function HomePage() {
  return (
    <>
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
