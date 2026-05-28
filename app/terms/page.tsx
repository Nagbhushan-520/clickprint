import { LegalPage } from "@/components/legal/legal-page";

export const metadata = { title: "Terms of Service · Click Print" };

export default function TermsPage() {
  return (
    <LegalPage
      chip="Legal"
      title="Terms of Service"
      lastUpdated="28 May 2026"
      sections={[
        {
          heading: "1. Use of service",
          body: <p>By placing an order with Click Print, you agree to these terms. We provide flyer printing services from our studio in Akkipet, Bangalore. You're responsible for ensuring you have the rights to print any artwork you upload or design.</p>,
        },
        {
          heading: "2. Artwork & content responsibility",
          body: <p>You confirm that all content you upload, design, or generate via our AI tools is either your original work, licensed for commercial use, or otherwise legally cleared. We will not print content that infringes copyright, depicts illegal activity, or violates Indian law.</p>,
        },
        {
          heading: "3. Pricing & payment",
          body: <p>All prices displayed include 18% GST. Payment is processed through Razorpay. We accept UPI, cards, netbanking, and wallets. Prices are subject to change; the price shown at checkout is binding for that order.</p>,
        },
        {
          heading: "4. Production & delivery",
          body: <p>We aim to produce most orders within 24–48 hours of payment confirmation. Pickup is free from our Akkipet studio. Local Bangalore delivery is charged separately based on distance. Out-of-city shipping costs vary by courier.</p>,
        },
        {
          heading: "5. Refunds & reprints",
          body: <p>See our <a className="text-flame-500 hover:underline" href="/refunds">refund policy</a> for details.</p>,
        },
        {
          heading: "6. Account & data",
          body: <p>You don't need an account to order. When you do create one, we'll handle your data per our <a className="text-flame-500 hover:underline" href="/privacy">privacy policy</a>.</p>,
        },
        {
          heading: "7. Contact",
          body: <p>Questions: hello@clickprint.in</p>,
        },
      ]}
    />
  );
}
