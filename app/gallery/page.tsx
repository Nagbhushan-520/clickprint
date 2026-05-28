import { ComingSoon } from "@/components/marketing/coming-soon";

export const metadata = { title: "Gallery · Click Print" };

export default function GalleryPage() {
  return (
    <ComingSoon
      chip="Gallery"
      title="Real flyers,"
      highlight="really printed."
      body="We're photographing the best flyers we've printed lately — restaurants, events, real estate, gyms — to give you a feel for paper, ink, and finish quality. Drop date: next week."
    />
  );
}
