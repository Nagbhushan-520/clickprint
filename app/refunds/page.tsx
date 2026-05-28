import { LegalPage } from "@/components/legal/legal-page";

export const metadata = { title: "Refund Policy · Click Print" };

export default function RefundsPage() {
  return (
    <LegalPage
      chip="Legal"
      title="Refund Policy"
      lastUpdated="28 May 2026"
      sections={[
        {
          heading: "If we mess up — 100% on us",
          body: <p>If we print incorrectly (wrong paper, wrong quantity, wrong color, smudged ink, misaligned cuts), we will either reprint at no cost or refund you 100% within 5 working days. Just call us within 48 hours of receiving your order with photos.</p>,
        },
        {
          heading: "If you uploaded the wrong file",
          body: <p>We print exactly what you upload (after DPI validation). If you upload the wrong file and we print it, we can't refund — but we'll discount a reprint by 25%. Always double-check your file before payment.</p>,
        },
        {
          heading: "Cancellations before printing",
          body: <p>Full refund if you cancel before we start printing — usually within 2 hours of payment. Email cancel@clickprint.in immediately to stop production.</p>,
        },
        {
          heading: "Cancellations after printing starts",
          body: <p>Once your job is on the press (typically 2 hours after payment), we cannot cancel or refund — printing has already consumed paper, ink, and time.</p>,
        },
        {
          heading: "Lost or damaged in shipping",
          body: <p>For shipped orders that arrive damaged or never arrive, we'll reprint at no cost. Notify us within 48 hours of expected delivery with photos.</p>,
        },
        {
          heading: "How refunds are processed",
          body: <p>Refunds go back to the original payment method (UPI/card/netbanking) and typically reflect in 5–7 working days. Razorpay handles the actual processing.</p>,
        },
      ]}
    />
  );
}
