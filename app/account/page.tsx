import { ComingSoon } from "@/components/marketing/coming-soon";

export const metadata = { title: "Your Account · Click Print" };

export default function AccountPage() {
  return (
    <ComingSoon
      chip="My account"
      title="Account dashboard"
      highlight="coming soon."
      body="Phase 3 brings personal dashboards: order history, saved designs, reorder shortcuts, address book. For now, every order lives at its own URL — bookmark it."
    />
  );
}
