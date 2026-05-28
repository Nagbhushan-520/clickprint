import { ComingSoon } from "@/components/marketing/coming-soon";

export const metadata = { title: "Sign In · Click Print" };

export default function SignInPage() {
  return (
    <ComingSoon
      chip="Sign in"
      title="Accounts are"
      highlight="coming soon."
      body="You don't need an account to order. We track everything by phone/email. Account features (order history, saved designs) are arriving in Phase 3."
    />
  );
}
