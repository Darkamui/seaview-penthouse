import { getTranslations } from "next-intl/server";
import { GalleryClient } from "@/components/gallery-client";
import { getAllGalleryImages } from "@/lib/get-gallery-images";
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

  // Build base categories structure
  const baseCategories = [
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
    {
      id: "video",
      name: t("categories.video"),
    },
  ];

  // Get images for all categories (excluding video)
  const allImages = getAllGalleryImages(baseCategories);

  // Add images and videos to categories
  const categories = baseCategories.map((cat) => {
    if (cat.id === "video") {
      return {
        ...cat,
        videos: [
          {
            thumbnail: "/penthouse-virtual-tour-thumbnail.png",
            title: t("videoItems.virtualTour.title"),
            description: t("videoItems.virtualTour.description"),
          },
          {
            thumbnail: "/sunset-timelapse-from-balcony.png",
            title: t("videoItems.sunsetTimelapse.title"),
            description: t("videoItems.sunsetTimelapse.description"),
          },
          {
            thumbnail: "/penthouse-amenities-showcase.png",
            title: t("videoItems.amenitiesShowcase.title"),
            description: t("videoItems.amenitiesShowcase.description"),
          },
        ],
      };
    }
    return {
      ...cat,
      images: allImages[cat.id] || [],
    };
  });

  return (
    <GalleryClient categories={categories} initialTab={tab} />
  );
}
