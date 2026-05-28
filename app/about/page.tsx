import { brand } from "@/lib/config/brand";

export default function AboutPage() {
  return (
    <div className="container-wide min-h-[60vh] pt-40 pb-20">
      <div className="chip">About</div>
      <h1 className="mt-5 text-display text-ink-900">
        Printed in <span className="text-flame-500">{brand.address.city}.</span>
      </h1>
      <p className="mt-5 max-w-xl text-lg text-ink-600">
        Click Print is a neighborhood print studio in Akkipet, Bangalore.
        We print flyers fast, on real paper, with prices that don't make you wince.
      </p>
    </div>
  );
}
