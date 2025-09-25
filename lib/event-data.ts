import { Heart, Briefcase, ChefHat, Camera, Baby } from "lucide-react";

export interface EventType {
  icon: typeof Heart;
  title: string;
  capacity: string;
  description: string;
  features: string[];
  image: string;
  color: string;
}

export function getEventTypes(t: (key: string) => string): EventType[] {
  return [
    {
      icon: Heart,
      title: t("eventTypes.intimate.title"),
      capacity: t("eventTypes.intimate.capacity"),
      description: t("eventTypes.intimate.description"),
      features: [
        t("eventTypes.intimate.feature1"),
        t("eventTypes.intimate.feature2"),
        t("eventTypes.intimate.feature3"),
        t("eventTypes.intimate.feature4"),
      ],
      image: "/images/events/intimate.jpg",
      color: "text-red-500",
    },
    {
      icon: Camera,
      title: t("eventTypes.bridal.title"),
      capacity: t("eventTypes.bridal.capacity"),
      description: t("eventTypes.bridal.description"),
      features: [
        t("eventTypes.bridal.feature1"),
        t("eventTypes.bridal.feature2"),
        t("eventTypes.bridal.feature3"),
        t("eventTypes.bridal.feature4"),
      ],
      image: "/images/events/bride.jpg",
      color: "text-pink-500",
    },
    {
      icon: Briefcase,
      title: t("eventTypes.business.title"),
      capacity: t("eventTypes.business.capacity"),
      description: t("eventTypes.business.description"),
      features: [
        t("eventTypes.business.feature1"),
        t("eventTypes.business.feature2"),
        t("eventTypes.business.feature3"),
        t("eventTypes.business.feature4"),
      ],
      image: "/images/events/business.jpg",
      color: "text-blue-500",
    },
    {
      icon: Baby,
      title: t("eventTypes.family.title"),
      capacity: t("eventTypes.family.capacity"),
      description: t("eventTypes.family.description"),
      features: [
        t("eventTypes.family.feature1"),
        t("eventTypes.family.feature2"),
        t("eventTypes.family.feature3"),
        t("eventTypes.family.feature4"),
      ],
      image: "/images/events/family.jpg",
      color: "text-green-500",
    },
    {
      icon: ChefHat,
      title: t("eventTypes.culinary.title"),
      capacity: t("eventTypes.culinary.capacity"),
      description: t("eventTypes.culinary.description"),
      features: [
        t("eventTypes.culinary.feature1"),
        t("eventTypes.culinary.feature2"),
        t("eventTypes.culinary.feature3"),
        t("eventTypes.culinary.feature4"),
      ],
      image: "/images/events/chef.jpg",
      color: "text-orange-500",
    },
  ];
}