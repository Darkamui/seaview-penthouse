import { Badge } from "@/components/ui/badge";

interface PageHeroProps {
  badge: string;
  title: string;
  subtitle: string;
  className?: string;
}

export function PageHero({ badge, title, subtitle, className = "" }: PageHeroProps) {
  return (
    <section className={`relative py-20 px-4 bg-gradient-to-b from-card to-background ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-accent/10 text-accent-foreground border-accent/20">
            {badge}
          </Badge>
          <h1 className="font-sans text-5xl font-bold text-foreground mb-6">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}