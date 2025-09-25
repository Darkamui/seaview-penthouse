import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CTASectionProps {
  translationNamespace: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  className?: string;
}

export function CTASection({
  translationNamespace,
  primaryButtonText,
  secondaryButtonText,
  className = "",
}: CTASectionProps) {
  const t = useTranslations(translationNamespace);

  return (
    <section className={`py-8 px-4 ${className}`}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-sans text-3xl font-bold text-foreground mb-4">
          {t("readyToPlan")}
        </h2>
        <p className="text-xl text-muted-foreground mb-8 text-balance">
          {t("readyToPlanSubtitle")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {primaryButtonText}
            </Button>
          </Link>
          {/* <Button
            variant="outline"
            size="lg"
            className="border-accent/20 hover:border-accent/40 bg-transparent"
          >
            {secondaryButtonText}
          </Button> */}
        </div>
      </div>
    </section>
  );
}
