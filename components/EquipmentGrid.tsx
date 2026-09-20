"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { products, type CategoryId } from "@/data/products";
import { BrandChoice } from "@/components/BrandChoice";
import { CategoryCardCarousel } from "@/components/CategoryCardCarousel";
import { GeneratorChoice } from "@/components/GeneratorChoice";
import { ProductCard } from "@/components/ProductCard";
import { ServiceView } from "@/components/ServiceView";
import { isDualBrandProduct } from "@/data/brand-choice";
import { catalogImages } from "@/lib/catalog-images";
import { catalogCardImageClass, categoryImagesFor } from "@/lib/media";
import { localizeCategories, localizeProduct } from "@/lib/i18n/content";
import { useLocale } from "@/lib/i18n/locale";
import { type CatalogFilter } from "@/lib/catalog-filter";
import { cn } from "@/lib/utils";

export function EquipmentGrid({
  headingAs: Heading = "h2",
  initialCategory = "all",
  initialFilter,
  syncUrl = false,
}: {
  headingAs?: "h1" | "h2";
  initialCategory?: CatalogFilter;
  initialFilter?: CatalogFilter;
  syncUrl?: boolean;
}) {
  const router = useRouter();
  const { locale, t } = useLocale();
  const items = localizeCategories(locale);
  const [filter, setFilter] = useState<CatalogFilter>(
    initialFilter ?? (initialCategory === "all" ? "all" : initialCategory),
  );

  useEffect(() => {
    setFilter(initialFilter ?? (initialCategory === "all" ? "all" : initialCategory));
  }, [initialCategory, initialFilter]);

  function selectFilter(next: CatalogFilter) {
    if (!syncUrl) {
      if (next === "all") {
        router.push("/catalog");
        return;
      }
      if (next === "service") {
        router.push("/catalog?filter=service");
        return;
      }
      router.push(`/catalog/${next}`);
      return;
    }

    setFilter(next);
    if (next === "all") {
      router.replace("/catalog", { scroll: false });
      return;
    }
    if (next === "service") {
      router.replace("/catalog?filter=service", { scroll: false });
      return;
    }
    router.replace(`/catalog/${next}`, { scroll: false });
  }

  const lineProducts = useMemo(() => {
    return products
      .filter((product) => {
        if (product.aliasOf || product.kind === "type") return false;
        if (filter === "all" || filter === "service") return false;
        if (isDualBrandProduct(product)) return false;
        return product.categoryId === filter;
      })
      .map((product) => localizeProduct(product, locale));
  }, [filter, locale]);

  const headingTitle =
    filter === "all"
      ? t.catalog.title
      : filter === "service"
        ? t.service.title
        : (items.find((item) => item.id === filter)?.name ?? t.catalog.title);

  return (
    <section
      id="catalog"
      className="scroll-mt-28 bg-mist py-16 md:py-24"
      data-testid="equipment-grid"
    >
      <div className="container-site lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start lg:gap-10">
        <aside className="mb-8 lg:sticky lg:top-28 lg:mb-0" data-testid="catalog-filter">
          <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
            {t.catalog.category}
          </p>
          <nav className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:gap-1" aria-label={t.catalog.filters}>
            <button
              type="button"
              onClick={() => selectFilter("all")}
              className={cn(
                "rounded-[10px] px-3 py-2 text-left text-sm transition",
                filter === "all" ? "bg-navy text-white" : "text-ink hover:bg-white",
              )}
            >
              {t.catalog.all}
            </button>
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => selectFilter(item.id)}
                className={cn(
                  "rounded-[10px] px-3 py-2 text-left text-sm leading-5 transition",
                  filter === item.id ? "bg-navy text-white" : "text-ink hover:bg-white",
                )}
              >
                {item.name}
              </button>
            ))}
            <button
              type="button"
              onClick={() => selectFilter("service")}
              data-testid="catalog-filter-service"
              className={cn(
                "rounded-[10px] px-3 py-2 text-left text-sm leading-5 transition",
                filter === "service" ? "bg-navy text-white" : "text-ink hover:bg-white",
              )}
            >
              {t.nav.service}
            </button>
          </nav>
        </aside>

        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
            {filter === "service" ? t.service.label : t.catalog.label}
          </p>
          <Heading className="mt-3 font-display text-3xl md:text-4xl">{headingTitle}</Heading>

          {filter === "service" ? (
            <div className="mt-8">
              <ServiceView headingAs="h2" showLabel={false} embedded />
            </div>
          ) : filter === "all" ? (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((item) => {
                const cardClass =
                  "group overflow-hidden rounded-2xl bg-white text-left ring-1 ring-navy/10";
                const body = (
                  <>
                    <CategoryCardCarousel images={categoryImagesFor(item.id)} alt={item.name} />
                    <span className="block border-t border-navy/10 px-4 py-3">
                      <span className="block font-display text-base leading-snug text-navy">
                        {item.name}
                      </span>
                      <span className="mt-1 line-clamp-2 block text-sm leading-5 text-muted">
                        {item.intro}
                      </span>
                    </span>
                  </>
                );

                return (
                  <Link
                    key={item.id}
                    href={`/catalog/${item.id}`}
                    data-testid={`equipment-${item.id}`}
                    className={cardClass}
                  >
                    {body}
                  </Link>
                );
              })}
              <button
                type="button"
                data-testid="equipment-service"
                className="group overflow-hidden rounded-2xl bg-white text-left ring-1 ring-navy/10"
                onClick={() => selectFilter("service")}
              >
                <span className="relative block aspect-[5/4] bg-white">
                  <Image
                    src={catalogImages.service1}
                    alt={t.service.title}
                    fill
                    className={catalogCardImageClass}
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </span>
                <span className="block border-t border-navy/10 px-4 py-3">
                  <span className="block font-display text-base leading-snug text-navy">
                    {t.nav.service}
                  </span>
                  <span className="mt-1 line-clamp-2 block text-sm leading-5 text-muted">
                    {t.service.lead}
                  </span>
                </span>
              </button>
            </div>
          ) : filter === "screw" ? (
            <>
              <p className="mt-6 text-lg text-muted">{t.catalog.chooseBrand}</p>
              <BrandChoice />
            </>
          ) : filter === "generators" ? (
            <>
              <p className="mt-6 text-lg text-muted">{t.catalog.chooseGenerator}</p>
              <GeneratorChoice />
            </>
          ) : (
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {lineProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

