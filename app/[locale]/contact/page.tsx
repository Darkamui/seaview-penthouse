import { routing } from "@/i18n/routing";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { generateLodgingBusinessSchema } from "@/lib/structured-data";
import { ContactForm } from "@/components/contact-form";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://seaview.j-web.ca";

  return {
    title: t("contact.title"),
    description: t("contact.description"),
    openGraph: {
      title: t("contact.ogTitle"),
      description: t("contact.ogDescription"),
      url: `${siteUrl}/${locale}/contact`,
      siteName: "The Sea View Penthouse",
      images: [
        {
          url: `${siteUrl}/images/balcony/20250715_193651.jpg`,
          width: 1200,
          height: 630,
          alt: "Contact The Sea View Penthouse in Ashdod",
        },
      ],
      locale: locale === "he" ? "he_IL" : "en_US",
      alternateLocale: locale === "he" ? "en_US" : "he_IL",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("contact.ogTitle"),
      description: t("contact.ogDescription"),
      images: [`${siteUrl}/images/balcony/20250715_193651.jpg`],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/contact`,
      languages: {
        en: `${siteUrl}/en/contact`,
        he: `${siteUrl}/he/contact`,
        "x-default": `${siteUrl}/en/contact`,
      },
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Generate structured data
  const structuredData = generateLodgingBusinessSchema(locale);

  return (
    <div className="md:min-h-[75vh] grid grid-cols-1 items-center justify-center">
      {/* Inject structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ContactForm />
    </div>
  );
}
