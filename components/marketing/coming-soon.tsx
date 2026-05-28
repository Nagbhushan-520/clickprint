import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ComingSoon({
  chip,
  title,
  highlight,
  body,
  ctaHref = "/order",
  ctaLabel = "Start an order",
}: {
  chip: string;
  title: string;
  highlight: string;
  body: string;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <div className="container-wide pt-32 pb-32 md:pt-40">
      <div className="mx-auto max-w-2xl text-center">
        <div className="chip mx-auto">{chip}</div>
        <h1 className="mt-5 text-display-lg text-balance text-ink-900">
          {title} <span className="text-flame-500">{highlight}</span>
        </h1>
        <p className="mt-5 text-lg text-ink-600">{body}</p>
        <Link href={ctaHref} className="btn-primary mt-10 inline-flex">
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
