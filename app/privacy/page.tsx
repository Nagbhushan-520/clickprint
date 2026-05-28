import { LegalPage } from "@/components/legal/legal-page";

export const metadata = { title: "Privacy Policy · Click Print" };

export default function PrivacyPage() {
  return (
    <LegalPage
      chip="Legal"
      title="Privacy Policy"
      lastUpdated="28 May 2026"
      sections={[
        {
          heading: "What we collect",
          body: <p>To process your order we collect: your name, phone number, email, and delivery address (only if you choose delivery). When you upload artwork or generate designs, those files are stored against your order. That's it — no tracking pixels, no third-party advertising.</p>,
        },
        {
          heading: "How we use it",
          body: (
            <ul className="list-disc space-y-2 pl-5">
              <li>To fulfill your order (printing, packaging, delivery).</li>
              <li>To send you order updates via WhatsApp, SMS, or email.</li>
              <li>To process payment securely through Razorpay.</li>
              <li>To respond to support questions.</li>
            </ul>
          ),
        },
        {
          heading: "What we don't do",
          body: (
            <ul className="list-disc space-y-2 pl-5">
              <li>We don't sell your data. Not to anyone, ever.</li>
              <li>We don't use it for retargeting ads outside our site.</li>
              <li>We don't share your designs with anyone other than our print operators.</li>
            </ul>
          ),
        },
        {
          heading: "Data retention",
          body: <p>Order records: kept for 7 years (Indian tax law). Uploaded design files: kept for 12 months by default — handy if you want to reorder. You can request deletion anytime by writing to privacy@clickprint.in.</p>,
        },
        {
          heading: "Third parties we use",
          body: <p>Razorpay (payments), Supabase (database & storage), Vercel (hosting). All comply with Indian privacy regulations and use industry-standard encryption.</p>,
        },
        {
          heading: "Your rights",
          body: <p>You can access, correct, or delete your data at any time. Email privacy@clickprint.in and we'll respond within 7 days.</p>,
        },
      ]}
    />
  );
}
