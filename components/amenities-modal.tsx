"use client";

import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Utensils,
  Bath,
  Bed,
  Home,
  Tv,
  TreePine,
  Wind,
  Snowflake,
  Coffee,
  Refrigerator,
  Microwave,
  ChefHat,
  Sparkles,
  Shirt,
  Shirt as Hanger,
  Lock,
  Thermometer,
  Sun,
} from "lucide-react";

interface AmenitiesModalProps {
  children: React.ReactNode;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  // Bathrooms
  bathtub: Bath,
  hairDryer: Wind,
  shampoo: Sparkles,
  conditioner: Sparkles,
  bodySoap: Sparkles,
  bidet: Bath,
  hotWater: Thermometer,
  showerStall: Bath,
  toiletPaper: Home,
  faceTowels: Home,

  // Bedroom
  tv: Tv,
  airConditioning: Snowflake,
  storageCabinets: Hanger,
  hangers: Hanger,
  bedLinens: Bed,
  extraPillows: Bed,
  safe: Lock,

  // Kitchen
  freezerShabbat: Snowflake,
  refrigeratorShabbat: Refrigerator,
  microwave: Microwave,
  oven: ChefHat,
  cookingUtensils: ChefHat,
  dishware: Utensils,
  servingDishes: Utensils,
  coffeeCorner: Coffee,
  nespressoMachine: Coffee,
  milkFrother: Coffee,
  dishwasher: Sparkles,
  waterBar: Home,
  toaster: ChefHat,
  blender: ChefHat,
  gasStove: ChefHat,
  bbqUtensils: ChefHat,
  shabbatPlate: ChefHat,

  // Service Room
  washer: Shirt,
  dryer: Wind,
  iron: Shirt,
  ironingBoard: Shirt,
  dryingRack: Hanger,

  // Balcony
  seatingArea: TreePine,
  diningArea: Utensils,
  sunbeds: Sun,
  hammocks: TreePine,
  gasBBQ: ChefHat,
  bbqStation: ChefHat,
};

export function AmenitiesModal({ children }: AmenitiesModalProps) {
  const t = useTranslations("about.amenitiesItems");

  const amenityCategories = [
    {
      title: t("categories.bathrooms"),
      items: [
        "bathtub",
        "hairDryer",
        "shampoo",
        "conditioner",
        "bodySoap",
        "bidet",
        "hotWater",
        "showerStall",
        "toiletPaper",
        "faceTowels",
      ],
    },
    {
      title: t("categories.bedroom"),
      items: [
        "tv",
        "airConditioning",
        "storageCabinets",
        "hangers",
        "bedLinens",
        "extraPillows",
        "safe",
      ],
    },
    {
      title: t("categories.kitchen"),
      items: [
        "freezerShabbat",
        "refrigeratorShabbat",
        "microwave",
        "oven",
        "cookingUtensils",
        "dishware",
        "servingDishes",
        "coffeeCorner",
        "nespressoMachine",
        "milkFrother",
        "dishwasher",
        "waterBar",
        "toaster",
        "blender",
        "gasStove",
        "bbqUtensils",
        "shabbatPlate",
      ],
    },
    {
      title: t("categories.serviceRoom"),
      items: ["washer", "dryer", "iron", "ironingBoard", "dryingRack"],
    },
    {
      title: t("categories.balcony"),
      items: [
        "seatingArea",
        "diningArea",
        "sunbeds",
        "hammocks",
        "gasBBQ",
        "bbqStation",
      ],
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {t("viewAllAmenities")}
          </DialogTitle>
          <DialogDescription>
            Complete list of amenities and features available at the penthouse
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 mt-4">
          {amenityCategories.map((category) => (
            <div key={category.title} className="space-y-3">
              <h3 className="text-lg font-semibold text-accent border-b border-accent/20 pb-2">
                {category.title}
              </h3>
              <div className="space-y-2">
                {category.items.map((amenity) => {
                  const IconComponent = iconMap[amenity] || Home;
                  return (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 p-3 bg-card/50 rounded-lg border border-accent/10 hover:border-accent/20 transition-colors"
                    >
                      <div className="w-8 h-8 bg-accent/10 rounded-md flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-4 h-4 text-accent" />
                      </div>
                      <span className="text-sm text-foreground font-medium">
                        {t(`fullList.${amenity}`)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
