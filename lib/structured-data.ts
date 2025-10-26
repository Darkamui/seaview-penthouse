import {
  WithContext,
  LodgingBusiness,
  EventVenue,
  FAQPage,
  BreadcrumbList,
} from "schema-dts";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://seaview.j-web.ca";

export function generateLodgingBusinessSchema(
  locale: string
): WithContext<LodgingBusiness> {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "The Sea View Penthouse Ashdod",
    description:
      locale === "he"
        ? 'פנטהאוס יוקרה בשטח 570 מ"ר עם מרפסת פרטית 270 מ"ר ונוף לים התיכון'
        : "Luxury 570sqm sea view penthouse with 270sqm private balcony overlooking the Mediterranean",
    url: `${SITE_URL}/${locale}`,
    telephone: "+972-546-606-233",
    email: "rachel.yer@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kineret 17",
      addressLocality: "Ashdod",
      addressRegion: "Southern District",
      postalCode: "77610",
      addressCountry: "IL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 31.8048,
      longitude: 34.6401,
    },
    image: [
      `${SITE_URL}/images/balcony/20250715_193651.jpg`,
      `${SITE_URL}/images/living-room/20250730_173816.jpg`,
      `${SITE_URL}/images/balcony/20250730_183731.jpg`,
    ],
    priceRange: "$$$",
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Private Hot Tub" },
      { "@type": "LocationFeatureSpecification", name: "Sea View" },
      { "@type": "LocationFeatureSpecification", name: "Free WiFi" },
      { "@type": "LocationFeatureSpecification", name: "Private Parking" },
      { "@type": "LocationFeatureSpecification", name: "270sqm Balcony" },
      {
        "@type": "LocationFeatureSpecification",
        name: "Fully Equipped Kitchen",
      },
      { "@type": "LocationFeatureSpecification", name: "Air Conditioning" },
    ],
    numberOfRooms: 5,
    petsAllowed: false,
    smokingAllowed: false,
  };
}

export function generateEventVenueSchema(
  locale: string
): WithContext<EventVenue> {
  return {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    name: "The Sea View Penthouse - Event Space",
    description:
      locale === "he"
        ? "מקום לאירועים יוקרתיים לעד 30 אורחים עם נוף לים"
        : "Luxury event venue for up to 30 guests with breathtaking sea views",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kineret 17",
      addressLocality: "Ashdod",
      addressCountry: "IL",
    },
    maximumAttendeeCapacity: 30,
    photo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/living-room/IMG-20250704-WA0017.jpg`,
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Catering Kitchen" },
      { "@type": "LocationFeatureSpecification", name: "270sqm Terrace" },
      { "@type": "LocationFeatureSpecification", name: "Panoramic Sea Views" },
      { "@type": "LocationFeatureSpecification", name: "Indoor Event Space" },
      { "@type": "LocationFeatureSpecification", name: "Outdoor BBQ Station" },
    ],
  };
}

export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
