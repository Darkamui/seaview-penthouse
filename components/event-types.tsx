import { getTranslations } from "next-intl/server";
import { getAllEventTypeImages, groupImagesByEventType } from "@/lib/sanity.fetch";
import { urlFor } from "@/lib/sanity.image";
import { EventTypesClient } from "./event-types-client";

export async function EventTypes() {
  const t = await getTranslations("events");

  // Fetch images from Sanity
  const eventImages = await getAllEventTypeImages();
  const groupedImages = groupImagesByEventType(eventImages);

  const eventTypes = [
    {
      iconName: "heart",
      title: t("eventTypes.intimate.title"),
      capacity: t("eventTypes.intimate.capacity"),
      description: t("eventTypes.intimate.description"),
      features: [
        t("eventTypes.intimate.feature1"),
        t("eventTypes.intimate.feature2"),
        t("eventTypes.intimate.feature3"),
      ],
      images:
        groupedImages["intimate"]?.map((img) => ({
          src: urlFor(img.image).width(800).url(),
          alt: img.alt?.en || t("eventTypes.intimate.title"),
        })) || [],
      color: "text-red-500",
    },
    {
      iconName: "camera",
      title: t("eventTypes.bridal.title"),
      capacity: t("eventTypes.bridal.capacity"),
      description: t("eventTypes.bridal.description"),
      features: [
        t("eventTypes.bridal.feature1"),
        t("eventTypes.bridal.feature2"),
        t("eventTypes.bridal.feature3"),
        t("eventTypes.bridal.feature4"),
      ],
      images:
        groupedImages["bridal"]?.map((img) => ({
          src: urlFor(img.image).width(800).url(),
          alt: img.alt?.en || t("eventTypes.bridal.title"),
        })) || [],
      color: "text-pink-500",
    },
    {
      iconName: "briefcase",
      title: t("eventTypes.business.title"),
      capacity: t("eventTypes.business.capacity"),
      description: t("eventTypes.business.description"),
      features: [
        t("eventTypes.business.feature1"),
        t("eventTypes.business.feature2"),
        t("eventTypes.business.feature3"),
        t("eventTypes.business.feature4"),
      ],
      images:
        groupedImages["business"]?.map((img) => ({
          src: urlFor(img.image).width(800).url(),
          alt: img.alt?.en || t("eventTypes.business.title"),
        })) || [],
      color: "text-blue-500",
    },
  ];

  return <EventTypesClient eventTypes={eventTypes} />;
}
