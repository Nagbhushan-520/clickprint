import { brand } from "@/lib/config/brand";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { pageMetadata } from "@/lib/config/site";

export const metadata = pageMetadata({
  title: "Contact Click Print — Akkipet Bangalore Flyer Studio",
  description: `Visit ${brand.name} at ${brand.address.line2}, ${brand.address.city}. Call ${brand.phone}, WhatsApp ${brand.whatsapp}, email ${brand.email}. Mon-Sat 9:30am-8pm.`,
  path: "/contact",
  keywords: ["Click Print contact", "Akkipet print shop address", "flyer printing near me"],
});

export default function ContactPage() {
  return (
    <div className="container-wide min-h-[60vh] pt-40 pb-20">
      <div className="chip">Contact</div>
      <h1 className="mt-5 text-display text-ink-900">Reach the <span className="text-flame-500">studio.</span></h1>

      <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8 max-w-3xl">
        <div className="rounded-3xl border border-ink-900/8 bg-paper p-6">
          <Phone className="h-6 w-6 text-flame-500" />
          <h3 className="mt-4 font-display text-lg font-bold">Call us</h3>
          <p className="mt-1 text-ink-600">{brand.phone}</p>
          <p className="text-sm text-ink-500">{brand.hours}</p>
        </div>
        <div className="rounded-3xl border border-ink-900/8 bg-paper p-6">
          <MessageCircle className="h-6 w-6 text-flame-500" />
          <h3 className="mt-4 font-display text-lg font-bold">WhatsApp</h3>
          <p className="mt-1 text-ink-600">{brand.whatsapp}</p>
          <p className="text-sm text-ink-500">Fastest for design previews</p>
        </div>
        <div className="rounded-3xl border border-ink-900/8 bg-paper p-6">
          <Mail className="h-6 w-6 text-flame-500" />
          <h3 className="mt-4 font-display text-lg font-bold">Email</h3>
          <p className="mt-1 text-ink-600">{brand.email}</p>
        </div>
        <div className="rounded-3xl border border-ink-900/8 bg-paper p-6">
          <MapPin className="h-6 w-6 text-flame-500" />
          <h3 className="mt-4 font-display text-lg font-bold">Visit</h3>
          <p className="mt-1 text-sm text-ink-600">
            {brand.address.line1}<br/>{brand.address.line2}<br/>{brand.address.city} – {brand.address.pincode}
          </p>
        </div>
      </div>
    </div>
  );
}
