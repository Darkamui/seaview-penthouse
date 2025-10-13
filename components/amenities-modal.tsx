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
  Wifi,
  Car,
  Utensils,
  Bath,
  Bed,
  Eye,
  Home,
  Tv,
  Laptop,
  TreePine,
  Waves,
  Camera,
  MapPin,
  Building,
  Wind,
  Snowflake,
  FireExtinguisher,
  HeartHandshake,
  Monitor,
  Coffee,
  Refrigerator,
  Microwave,
  ChefHat,
  Sparkles,
  Shirt,
  Shirt as Hanger,
  Star,
  Lock,
  Gamepad2,
  BookOpen,
  Thermometer,
  Sun,
  ParkingCircle,
  Building as Elevator,
  Cigarette,
  Clock,
  UserCheck,
  AlertTriangle,
} from "lucide-react";

interface AmenitiesModalProps {
  children: React.ReactNode;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  // Views
  scenicViews: Eye,
  beachView: Waves,
  harbourView: MapPin,
  marinaView: Building,
  seaViewFull: Waves,

  // Bathroom
  bathtub: Bath,
  hairDryer: Wind,
  cleaningProducts: Sparkles,
  shampoo: Sparkles,
  conditioner: Sparkles,
  bodySoap: Sparkles,
  bidet: Bath,
  hotWater: Thermometer,
  showerGel: Sparkles,

  // Bedroom & Laundry
  washer: Shirt,
  freeDryer: Wind,
  towels: Home,
  hangers: Hanger,
  bedLinens: Bed,
  cottonLinens: Bed,
  extraPillows: Bed,
  roomDarkening: Sun,
  iron: Shirt,
  dryingRack: Hanger,
  safe: Lock,
  clothingStorage: Hanger,

  // Entertainment
  ethernet: Monitor,
  tv: Tv,
  bluetooth: Gamepad2,
  books: BookOpen,

  // Climate
  centralAC: Snowflake,
  centralHeating: Thermometer,

  // Safety
  securityCameras: Camera,
  entranceCamera: Camera,
  fireExtinguisher: FireExtinguisher,
  firstAidKit: HeartHandshake,

  // Internet & Office
  wifi: Wifi,
  workspace: Laptop,
  workspacePrivate: Laptop,
  pocketWifi: Wifi,

  // Kitchen & Dining
  kitchenSpace: Utensils,
  refrigerator: Refrigerator,
  microwave: Microwave,
  cookingBasics: ChefHat,
  dishware: Utensils,
  freezer: Snowflake,
  dishwasher: Sparkles,
  gasStove: ChefHat,
  oven: ChefHat,
  kettle: Coffee,
  coffeeMaker: Coffee,
  wineGlasses: Star,
  toaster: ChefHat,
  bakingSheet: ChefHat,
  blender: ChefHat,
  trashCompactor: Home,
  bbqUtensils: ChefHat,
  bbqGrill: ChefHat,
  diningTable: Utensils,
  coffee: Coffee,

  // Location Features
  sharedBeach: Waves,
  beachAccess: Waves,
  privateEntrance: Home,
  separateEntrance: Home,
  laundromat: Shirt,

  // Outdoor
  privateBalconyFull: TreePine,
  outdoorFurniture: TreePine,
  outdoorDining: TreePine,
  outdoorKitchen: ChefHat,
  privateBBQ: ChefHat,
  sunLoungers: Sun,

  // Parking & Facilities
  garageParking: Car,
  streetParking: ParkingCircle,
  hotTub: Bath,
  elevator: Elevator,

  // Services
  smokingAllowed: Cigarette,
  longTermStays: Clock,
  housekeeping: Sparkles,
  hostGreets: UserCheck,
  noSmokeAlarm: AlertTriangle,
  noCarbonMonoxide: AlertTriangle,
};

export function AmenitiesModal({ children }: AmenitiesModalProps) {
  const t = useTranslations("about.amenitiesItems");

  const amenityCategories = [
    {
      title: t("categories.views"),
      items: [
        "scenicViews",
        "beachView",
        "harbourView",
        "marinaView",
        "seaViewFull",
      ],
    },
    {
      title: t("categories.bathroom"),
      items: [
        "bathtub",
        "hairDryer",
        "cleaningProducts",
        "shampoo",
        "conditioner",
        "bodySoap",
        "bidet",
        "hotWater",
        "showerGel",
      ],
    },
    {
      title: t("categories.bedroom"),
      items: [
        "washer",
        "freeDryer",
        "towels",
        "hangers",
        "bedLinens",
        "cottonLinens",
        "extraPillows",
        "roomDarkening",
        "iron",
        "dryingRack",
        "safe",
        "clothingStorage",
      ],
    },
    {
      title: t("categories.entertainment"),
      items: ["ethernet", "tv", "bluetooth", "books"],
    },
    {
      title: t("categories.climate"),
      items: ["centralAC", "centralHeating"],
    },
    {
      title: t("categories.safety"),
      items: [
        "securityCameras",
        "entranceCamera",
        "fireExtinguisher",
        "firstAidKit",
      ],
    },
    {
      title: t("categories.internet"),
      items: ["wifi", "workspace", "workspacePrivate", "pocketWifi"],
    },
    {
      title: t("categories.kitchen"),
      items: [
        "kitchenSpace",
        "refrigerator",
        "microwave",
        "cookingBasics",
        "dishware",
        "freezer",
        "dishwasher",
        "gasStove",
        "oven",
        "kettle",
        "coffeeMaker",
        "wineGlasses",
        "toaster",
        "bakingSheet",
        "blender",
        "trashCompactor",
        "bbqUtensils",
        "bbqGrill",
        "diningTable",
        "coffee",
      ],
    },
    {
      title: t("categories.location"),
      items: [
        "sharedBeach",
        "beachAccess",
        "privateEntrance",
        "separateEntrance",
        "laundromat",
      ],
    },
    {
      title: t("categories.outdoor"),
      items: [
        "privateBalconyFull",
        "outdoorFurniture",
        "outdoorDining",
        "outdoorKitchen",
        "privateBBQ",
        "sunLoungers",
      ],
    },
    {
      title: t("categories.parking"),
      items: ["garageParking", "streetParking", "hotTub", "elevator"],
    },
    {
      title: t("categories.services"),
      items: [
        "smokingForbidden",
        "longTermStays",
        "housekeeping",
        "hostGreets",
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
