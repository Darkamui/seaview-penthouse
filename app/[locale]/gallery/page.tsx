import { useTranslations } from "next-intl";
import { GalleryClient } from "@/components/gallery-client";
import { getAllGalleryImages } from "@/lib/get-gallery-images";

export default function GalleryPage({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  const t = useTranslations("gallery");

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
    <GalleryClient categories={categories} initialTab={searchParams.tab} />
  );
}
