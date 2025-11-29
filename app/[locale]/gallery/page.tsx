import { getTranslations } from "next-intl/server";
import { GalleryClient } from "@/components/gallery-client";
import { getAllGalleryImages as getSanityGalleryImages, groupImagesByCategory } from "@/lib/sanity.fetch";
import { urlFor } from "@/lib/sanity.image";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ tab?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://seaview.j-web.ca";

  return {
    title: t("gallery.title"),
    description: t("gallery.description"),
    openGraph: {
      title: t("gallery.ogTitle"),
      description: t("gallery.ogDescription"),
      url: `${siteUrl}/${locale}/gallery`,
      siteName: "The Sea View Penthouse",
      images: [
        {
          url: `${siteUrl}/images/living-room/20250730_173816.jpg`,
          width: 1200,
          height: 630,
          alt: "Luxury penthouse interior gallery",
        },
      ],
      locale: locale === "he" ? "he_IL" : "en_US",
      alternateLocale: locale === "he" ? "en_US" : "he_IL",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("gallery.ogTitle"),
      description: t("gallery.ogDescription"),
      images: [`${siteUrl}/images/living-room/20250730_173816.jpg`],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/gallery`,
      languages: {
        en: `${siteUrl}/en/gallery`,
        he: `${siteUrl}/he/gallery`,
        "x-default": `${siteUrl}/en/gallery`,
      },
    },
  };
}

export default async function GalleryPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { tab } = await searchParams;
  const t = await getTranslations({ locale, namespace: "gallery" });

  // Fetch all images from Sanity
  const images = await getSanityGalleryImages();
  const groupedImages = groupImagesByCategory(images);

  // Build categories structure
  const categories = [
    {
      id: "livingRoom",
      name: t("categories.livingRoom"),
    },
    {
      id: "balcony",
      name: t("categories.balcony"),
    },
    {
      id: "bedrooms",
      name: t("categories.bedrooms"),
    },
    {
      id: "kitchen",
      name: t("categories.kitchen"),
    },
    {
      id: "bathrooms",
      name: t("categories.bathrooms"),
    },
    { id: "around", name: t("categories.around") },
  ].map((category) => ({
    ...category,
    images: groupedImages[category.id]?.map((img) => ({
      src: urlFor(img.image).width(1200).url(),
      alt: img.alt[locale as keyof typeof img.alt] || img.alt.en || '',
    })) || [],
  }));

  return <GalleryClient categories={categories} initialTab={tab} />;
}
