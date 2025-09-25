"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Phone,
  Mail,
} from "lucide-react";
import { useTranslations } from "next-intl";

const faqCategories = [
  {
    title: "Booking & Reservations",
    questions: [
      {
        question: "How far in advance should I book?",
        answer:
          "We recommend booking at least 2-4 weeks in advance, especially during peak season (May-September) and holidays. For events and special occasions, earlier booking is advised to ensure availability.",
      },
      {
        question: "What is your cancellation policy?",
        answer:
          "Free cancellation up to 14 days before check-in. Cancellations between 7-14 days incur a 50% charge. Less than 7 days notice results in full charge. We understand emergencies happen and will work with you when possible.",
      },
      {
        question: "Do you require a security deposit?",
        answer:
          "Yes, we require a refundable security deposit of $500 which is returned within 7 days after checkout, provided there are no damages or excessive cleaning required.",
      },
      {
        question: "What are your check-in and check-out times?",
        answer:
          "Check-in is from 3:00 PM and check-out is by 11:00 AM. Early check-in or late check-out may be available upon request and subject to availability.",
      },
    ],
  },
  {
    title: "Amenities & Services",
    questions: [
      {
        question: "What amenities are included?",
        answer:
          "All stays include high-speed WiFi, fully equipped kitchen, premium bedding, luxury bathroom amenities, private parking, and access to the 270m² balcony. We also provide welcome refreshments and 24/7 concierge support.",
      },
      {
        question: "Is there parking available?",
        answer:
          "Yes, we provide secure private parking for up to 2 vehicles. Additional parking can be arranged nearby if needed for larger groups or events.",
      },
      {
        question: "Do you allow pets?",
        answer:
          "We welcome well-behaved pets with prior approval. A pet fee of $50 per stay applies, and we ask that pets are supervised at all times, especially on the balcony.",
      },
      {
        question: "Is the penthouse suitable for children?",
        answer:
          "Yes, families are welcome! The penthouse is child-friendly with safety features on the balcony. We can provide cribs, high chairs, and other baby equipment upon request.",
      },
    ],
  },
  {
    title: "Location & Access",
    questions: [
      {
        question: "How close are you to the beach?",
        answer:
          "We're located just 200 meters from Ashdod's beautiful beaches. The penthouse offers direct sea views, and the beach is an easy 3-minute walk away.",
      },
      {
        question: "What's nearby for dining and entertainment?",
        answer:
          "Ashdod offers excellent restaurants, cafes, and cultural attractions within walking distance. The marina, shopping centers, and historic sites are all easily accessible. We provide a comprehensive local guide upon arrival.",
      },
      {
        question: "How do I get to the penthouse from the airport?",
        answer:
          "Ben Gurion Airport is approximately 45 minutes by car. We can arrange airport transfers, or you can take a taxi, rental car, or public transportation. Detailed directions are provided upon booking confirmation.",
      },
      {
        question: "Is public transportation available?",
        answer:
          "Yes, Ashdod has good public transportation including buses and trains. The central train station is 10 minutes away, providing easy access to Tel Aviv, Jerusalem, and other major cities.",
      },
    ],
  },
  {
    title: "Events & Special Occasions",
    questions: [
      {
        question: "Can I host events at the penthouse?",
        answer:
          "Our penthouse is perfect for intimate events up to 30 guests. We can accommodate wedding proposals, anniversary celebrations, business meetings, and family gatherings. Event planning services are available.",
      },
      {
        question: "Do you provide catering services?",
        answer:
          "We can arrange catering through our network of premium local caterers and private chefs. Our fully equipped kitchen also allows for self-catering or hiring your own chef.",
      },
      {
        question: "Are there noise restrictions for events?",
        answer:
          "We ask that events respect quiet hours from 10 PM to 8 AM out of consideration for neighbors. Music and celebrations are welcome during appropriate hours.",
      },
      {
        question: "Can you help with event planning?",
        answer:
          "Yes! We offer event planning assistance including decoration setup, vendor recommendations, and coordination services. Contact us to discuss your specific needs and vision.",
      },
    ],
  },
];

export default function FAQPage() {
  const t = useTranslations("faq");
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-card to-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent-foreground border-accent/20">
              {t("badge")}
            </Badge>
            <h1 className="font-sans text-5xl font-bold text-foreground mb-6">
              {t("title")}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="font-sans text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-accent rounded-full" />
                {category.title}
              </h2>

              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => {
                  const itemId = `${categoryIndex}-${faqIndex}`;
                  const isOpen = openItems.includes(itemId);

                  return (
                    <Card
                      key={faqIndex}
                      className="border-accent/20 hover:border-accent/40 transition-colors"
                    >
                      <CardContent className="p-0">
                        <button
                          onClick={() => toggleItem(itemId)}
                          className="w-full p-6 text-left flex items-center justify-between hover:bg-card/50 transition-colors"
                        >
                          <span className="font-medium text-foreground pr-4">
                            {faq.question}
                          </span>
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-accent flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-accent flex-shrink-0" />
                          )}
                        </button>

                        {isOpen && (
                          <div className="px-6 pb-6">
                            <div className="pt-4 border-t border-accent/10">
                              <p className="text-muted-foreground leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-sans text-3xl font-bold text-foreground mb-4">
            {t("stillHaveQuestions")}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 text-balance">
            {t("stillHaveQuestionsSubtitle")}
          </p>

          <div className="grid sm:grid-cols-2  gap-6 mb-8">
            <Card className="border-accent/20 hover:border-accent/40 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Phone Support</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Speak directly with our team
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-accent/20 hover:border-accent/40 bg-transparent"
                >
                  Call Now
                </Button>
              </CardContent>
            </Card>

            <Card className="border-accent/20 hover:border-accent/40 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Detailed responses within 2 hours
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-accent/20 hover:border-accent/40 bg-transparent"
                >
                  Send Email
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
