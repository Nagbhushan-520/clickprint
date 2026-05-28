import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { brand } from "@/lib/config/brand";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: `${brand.name} · Premium Flyer Printing in Bangalore`,
  description:
    "Order print-ready flyers in three minutes. Upload your design, build it in our Canva-grade editor, or generate it with AI. Printed in Akkipet, Bangalore.",
  keywords: [
    "flyer printing Bangalore",
    "Akkipet print shop",
    "Click Print",
    "design flyers online",
    "AI flyer generator",
  ],
  openGraph: {
    title: `${brand.name} · Premium Flyer Printing in Bangalore`,
    description:
      "Order print-ready flyers in three minutes. Upload, design, or generate with AI.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
