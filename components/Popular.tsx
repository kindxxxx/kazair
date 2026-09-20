"use client";

import { products } from "@/data/products";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { localizeProduct } from "@/lib/i18n/content";
import { useLocale } from "@/lib/i18n/locale";

const popularIds = ["oil-free", "almig-premium", "mobile-rotorcomp", "n-gen-skid"];

export function Popular() {
  const { locale, t } = useLocale();
  const items = products
    .filter((item) => popularIds.includes(item.id))
    .map((item) => localizeProduct(item, locale));

  return (
    <section className="bg-paper py-16 md:py-24" data-testid="popular">
      <div className="container-site">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
            {t.popular.label}
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">{t.popular.title}</h2>
        </Reveal>
        <div className="mt-10 grid auto-rows-fr gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item, index) => (
            <Reveal key={item.id} className="h-full" delay={index * 80}>
              <ProductCard product={item} compact />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
