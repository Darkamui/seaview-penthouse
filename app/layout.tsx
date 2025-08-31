import type React from "react";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Manrope } from "next/font/google";
import { Suspense } from "react";
import { Navigation } from "@/components/navigation";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "The Sea View Penthouse - Luxury Vacation Rental in Ashdod",
  description:
    "Experience luxury at its finest in our stunning sea view penthouse in Ashdod. Perfect for intimate events, family vacations, and unforgettable stays.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-serif ${inter.variable} ${jetbrainsMono.variable} ${manrope.variable}`}
      >
        <Navigation />
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  );
}
