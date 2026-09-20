"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { catalogTiers, isCatalogTierId, productMatchesTier, type CatalogTierId } from "@/data/catalog-tiers";
import { type CategoryId, type Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { localizeProduct, productSearchText } from "@/lib/i18n/content";
import { useLocale } from "@/lib/i18n/locale";
import type { Messages } from "@/lib/i18n/messages";
import { cn } from "@/lib/utils";

function getTierCopy(t: Messages, id: CatalogTierId) {
  if (id === "budget") return { title: t.catalog.tierBudget, text: t.catalog.tierBudgetText };
  if (id === "premium") return { title: t.catalog.tierPremium, text: t.catalog.tierPremiumText };
  return { title: t.catalog.tierOilFree, text: t.catalog.tierOilFreeText };
}

export function Catalog({
  products,
  initialCategory = "all",
  initialTier,
  initialQuery = "",
  syncUrl = false,
  title,
  headingAs: Heading = "h2",
  showTiers,
}: {
  products: Product[];
  initialCategory?: "all" | CategoryId;
  initialTier?: string;
  initialQuery?: string;
  syncUrl?: boolean;
  title?: string;
  headingAs?: "h1" | "h2";
  showTiers?: boolean;
}) {
  const router = useRouter();
  const { locale, t } = useLocale();
  const tiersEnabled = showTiers ?? initialCategory === "all";
  const [tier, setTier] = useState<CatalogTierId | "all">(
    isCatalogTierId(initialTier) ? initialTier : "all",
  );
  const [query, setQuery] = useState(initialQuery);

  const heading = title ?? t.catalog.title;

  function selectTier(next: CatalogTierId | "all") {
    setTier(next);
    if (syncUrl && initialCategory === "all") {
      const params = new URLSearchParams();
      if (query.trim()) params.set("q", query.trim());
      if (next !== "all") params.set("tier", next);
      const search = params.toString();
      router.replace(search ? `/catalog?${search}` : "/catalog", { scroll: false });
    }
  }

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const selected = catalogTiers.find((item) => item.id === tier);
    const list = products.filter((product) => {
      if (product.aliasOf) return false;
      const matchesCategory = initialCategory === "all" || product.categoryId === initialCategory;
      const matchesTier =
        !tiersEnabled || !selected || productMatchesTier(product, selected.id);
      const matchesQuery = !normalized || productSearchText(product).includes(normalized);
      const matchesKind = Boolean(normalized) || product.kind !== "type";
      return matchesCategory && matchesTier && matchesQuery && matchesKind;
    });

    const collator = new Intl.Collator(locale === "kk" ? "kk" : "ru");
    return [...list]
      .map((product) => localizeProduct(product, locale))
      .sort((a, b) => collator.compare(a.category, b.category) || collator.compare(a.name, b.name));
  }, [initialCategory, locale, products, query, tier, tiersEnabled]);

  const revealProducts =
    initialCategory !== "all" || !tiersEnabled || tier !== "all" || Boolean(query.trim());

  return (
    <section id="catalog" className="scroll-mt-28 bg-paper py-16 md:py-24" data-testid="catalog">
      <div className="container-site">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
              {t.catalog.label}
            </p>
            <Heading className="mt-3 font-display text-3xl md:text-4xl">{heading}</Heading>
          </div>
          <label className="relative w-full lg:max-w-md">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.catalog.search}
              className="pl-12!"
              aria-label={t.catalog.search}
              data-testid="catalog-search"
            />
          </label>
        </div>

        {tiersEnabled ? (
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {catalogTiers.map((item) => {
              const copy = getTierCopy(t, item.id);
              const active = tier === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectTier(active ? "all" : item.id)}
                  data-testid={`catalog-tier-${item.id}`}
                  className={cn(
                    "group overflow-hidden rounded-2xl text-left shadow-[0_14px_40px_rgba(8,28,46,0.08)] ring-1 transition",
                    active ? "ring-brand" : "ring-navy/8 hover:ring-brand/50",
                  )}
                >
                  <span className="relative block aspect-[16/8] bg-white">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      className="object-contain p-4 transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </span>
                  <span className="block border-t border-navy/10 bg-white p-4">
                    <span className="block font-display text-base leading-snug text-navy">
                      {copy.title}
                    </span>
                    <span className="mt-1 line-clamp-2 block text-sm leading-5 text-muted">
                      {copy.text}
                    </span>
                    <span className="mt-3 inline-flex text-sm font-semibold text-brand-dark">
                      {t.catalog.openTier}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        ) : null}

        {revealProducts && filtered.length > 0 ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : null}

        {revealProducts && filtered.length === 0 ? (
          <div className="mt-10 rounded-2xl bg-white p-8 text-center ring-1 ring-navy/8">
            <p className="font-display text-2xl">{t.catalog.nothingFound}</p>
            <p className="mt-2 text-muted">{t.catalog.changeQuery}</p>
            <button
              type="button"
              className="btn btn-primary mt-6"
              onClick={() => {
                setQuery("");
                selectTier("all");
              }}
            >
              {t.catalog.reset}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
