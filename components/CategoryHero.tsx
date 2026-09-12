"use client";

import Image from "next/image";
import { WhatsAppLink } from "@/components/ContactLinks";
import { localizeCategory } from "@/lib/i18n/content";
import { useLocale } from "@/lib/i18n/locale";
import type { CategoryId } from "@/data/products";

export function CategoryHero({
  category,
}: {
  category: {
    id: CategoryId;
    name: string;
    intro: string;
    cover: string;
  };
}) {
  const { locale, t } = useLocale();
  const item = localizeCategory(category, locale);

  return (
    <div className="container-site grid items-center gap-8 py-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
          {t.catalog.label}
        </p>
        <h1 className="mt-3 font-display text-4xl">{item.name}</h1>
        <p className="mt-4 max-w-2xl text-muted">{item.intro}</p>
        <WhatsAppLink categoryInquiry className="btn btn-primary mt-6">
          {t.product.consult}
        </WhatsAppLink>
      </div>
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={item.cover}
          alt={item.name}
          fill
          className="object-contain p-2"
          sizes="(max-width: 1024px) 100vw, 45vw"
          priority
        />
      </div>
    </div>
  );
}
