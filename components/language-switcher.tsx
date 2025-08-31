"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from '@/i18n/navigation';

const locales = [
  { code: 'he', name: 'עברית', flag: '🇮🇱' },
  { code: 'en', name: 'English', flag: '🇺🇸' }
];

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();

  const handleLocaleChange = (newLocale: 'he' | 'en') => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  const currentLocaleData = locales.find(locale => locale.code === currentLocale);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 hover:bg-accent/10 transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm">{currentLocaleData?.flag} {currentLocaleData?.name}</span>
      </Button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-background border border-accent/20 rounded-lg shadow-lg min-w-[120px] z-50">
          {locales.map((locale) => (
            <button
              key={locale.code}
              onClick={() => handleLocaleChange(locale.code as 'he' | 'en')}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-accent/10 transition-colors flex items-center space-x-2 ${
                locale.code === currentLocale ? 'bg-accent/20 text-accent' : 'text-foreground'
              } first:rounded-t-lg last:rounded-b-lg`}
            >
              <span>{locale.flag}</span>
              <span>{locale.name}</span>
            </button>
          ))}
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}