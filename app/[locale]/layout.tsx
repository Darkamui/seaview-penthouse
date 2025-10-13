import type React from "react";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Manrope } from "next/font/google";
import { Suspense } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Navigation } from "@/components/navigation";
import "../globals.css";
import { Footer } from "@/components/footer";
import { ScrollAnimationObserver } from "@/components/scroll-animation-observer";

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
    generator: "v0.app",
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
      <body
        className={`font-serif ${inter.variable} ${jetbrainsMono.variable} ${manrope.variable}`}
      >
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          <Suspense fallback={null}>{children}</Suspense>
          <Footer />
          <ScrollAnimationObserver />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
