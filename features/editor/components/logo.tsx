import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-flame-500 font-display text-base font-bold text-white">
        C
      </span>
      <span className="font-display text-lg font-bold tracking-tight text-ink-900">
        Click<span className="text-flame-500">Print</span>
      </span>
    </Link>
  );
};
