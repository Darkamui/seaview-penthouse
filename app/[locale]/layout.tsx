import type React from "react";
import type { Metadata } from "next";
import {
  Inter,
  JetBrains_Mono,
  Manrope,
  Playfair_Display,
  Poppins,
  Crimson_Text,
} from "next/font/google";
import { Suspense } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Navigation } from "@/components/navigation";
import "../globals.css";
import { Footer } from "@/components/footer";
import { ScrollAnimationObserver } from "@/components/scroll-animation-observer";
import { Analytics } from "@/components/analytics";

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

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans-refined",
  weight: ["300", "400", "500", "600", "700"],
});

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif-luxury",
  weight: ["400", "600", "700"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const messages = await getMessages();
  const metadata = messages.metadata as { title: string; description: string };

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as "he" | "en")) {
    return null;
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();
  const isRtl = locale === "he";

  return (
    <html lang={locale} dir={isRtl ? "rtl" : "ltr"}>
      <head>
        {/* Phase 5: Resource hints for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://airbnb.com" />
      </head>
      <body
        className={`font-serif ${inter.variable} ${jetbrainsMono.variable} ${manrope.variable} ${playfairDisplay.variable} ${poppins.variable} ${crimsonText.variable}`}
      >
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          <Suspense fallback={null}>{children}</Suspense>
          <Footer />
          <ScrollAnimationObserver />
        </NextIntlClientProvider>
        {/* Google Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
