import { ComingSoon } from "@/components/marketing/coming-soon";

export const metadata = { title: "Sign Up · Click Print" };

export default function SignUpPage() {
  return (
    <ComingSoon
      chip="Sign up"
      title="Accounts are"
      highlight="coming soon."
      body="No account required to order. Sign-up will unlock saved designs, order history, and faster reorders — arriving in Phase 3."
    />
  );
}
