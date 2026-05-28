import Link from "next/link";
import { Instagram, MessageCircle, Mail, MapPin, Clock, Phone } from "lucide-react";
import { brand } from "@/lib/config/brand";
import { Logo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden bg-ink-900 text-paper">
      <div className="absolute inset-0 opacity-30 mix-blend-screen pointer-events-none">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-flame-500/30 blur-3xl" />
        <div className="absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-saffron-500/20 blur-3xl" />
      </div>

      <div className="relative container-wide pt-20 pb-12">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo variant="light" />
            <p className="mt-6 max-w-md font-display text-3xl leading-tight tracking-tight">
              Flyers that don't get tossed.
              <span className="block text-flame-400">Printed in Bangalore, shipped fast.</span>
            </p>
            <div className="mt-8 flex gap-3">
              <a href={brand.social.instagram} className="rounded-full border border-paper/15 p-3 transition-colors hover:bg-flame-500 hover:border-flame-500" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={brand.social.whatsapp} className="rounded-full border border-paper/15 p-3 transition-colors hover:bg-flame-500 hover:border-flame-500" aria-label="WhatsApp">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href={`mailto:${brand.email}`} className="rounded-full border border-paper/15 p-3 transition-colors hover:bg-flame-500 hover:border-flame-500" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="grid gap-8 md:col-span-7 md:grid-cols-3">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-paper/50">
                Print
              </h4>
              <ul className="mt-4 space-y-3 text-sm">
                <li><Link href="/flyers" className="text-paper/80 transition-colors hover:text-flame-400">All flyers</Link></li>
                <li><Link href="/flyers/a4" className="text-paper/80 transition-colors hover:text-flame-400">A4 flyers</Link></li>
                <li><Link href="/flyers/a5" className="text-paper/80 transition-colors hover:text-flame-400">A5 flyers</Link></li>
                <li><Link href="/pricing" className="text-paper/80 transition-colors hover:text-flame-400">Pricing</Link></li>
                <li><Link href="/order" className="text-paper/80 transition-colors hover:text-flame-400">Start an order</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-paper/50">
                Design
              </h4>
              <ul className="mt-4 space-y-3 text-sm">
                <li><Link href="/design" className="text-paper/80 transition-colors hover:text-flame-400">Design tool</Link></li>
                <li><Link href="/upload" className="text-paper/80 transition-colors hover:text-flame-400">Upload your file</Link></li>
                <li><Link href="/order?ai=1" className="text-paper/80 transition-colors hover:text-flame-400">Generate with AI</Link></li>
                <li><Link href="/faq" className="text-paper/80 transition-colors hover:text-flame-400">FAQ</Link></li>
                <li><Link href="/about" className="text-paper/80 transition-colors hover:text-flame-400">About studio</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-paper/50">
                Reach us
              </h4>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex gap-2 text-paper/80">
                  <Phone className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{brand.phone}</span>
                </li>
                <li className="flex gap-2 text-paper/80">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{brand.address.line1}<br/>{brand.address.line2}<br/>{brand.address.city} – {brand.address.pincode}</span>
                </li>
                <li className="flex gap-2 text-paper/80">
                  <Clock className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{brand.hours}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-paper/8 pt-8 text-xs text-paper/40 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} {brand.name}. Printed with love in {brand.address.city}.</span>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-paper/80">Terms</Link>
            <Link href="/privacy" className="hover:text-paper/80">Privacy</Link>
            <Link href="/refunds" className="hover:text-paper/80">Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
