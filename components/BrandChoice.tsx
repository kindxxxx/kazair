"use client";

import Image from "next/image";
import Link from "next/link";
import { brandChoice, type BrandChoiceId } from "@/data/brand-choice";
import { catalogCardImageClass } from "@/lib/media";
import { useLocale } from "@/lib/i18n/locale";

export function BrandChoice({ oilFree = false }: { oilFree?: boolean }) {
  const { t } = useLocale();
  const options: { id: BrandChoiceId; title: string; text: string }[] = [
    { id: "almig", title: t.catalog.tierPremium, text: t.catalog.tierPremiumText },
    { id: "rotorcomp", title: t.catalog.tierBudget, text: t.catalog.tierBudgetText },
  ];

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2" data-testid="brand-choice">
      {options.map((option) => {
        const brand = brandChoice[option.id];
        const href = oilFree ? brand.oilFreeHref : brand.href;
        return (
          <Link
            key={option.id}
            href={href}
            data-testid={`brand-choice-${option.id}`}
            className="group overflow-hidden rounded-2xl bg-white ring-1 ring-navy/10"
          >
            <span className="relative block aspect-[5/4] bg-white">
              <Image
                src={brand.image}
                alt={option.title}
                fill
                className={catalogCardImageClass}
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </span>
            <span className="block border-t border-navy/10 px-4 py-3">
              <span className="block font-display text-base leading-snug text-navy uppercase">
                {option.title}
              </span>
              <span className="mt-1 line-clamp-2 block text-sm leading-5 text-muted">
                {option.text}
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
