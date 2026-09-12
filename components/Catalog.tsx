"use client";

import { useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { type CategoryId, type Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { localizeCategories, localizeProduct, productSearchText } from "@/lib/i18n/content";
import { useLocale } from "@/lib/i18n/locale";
import { cn } from "@/lib/utils";

type SortId = "name-asc" | "name-desc" | "category";

const CATALOG_PREVIEW = 6;

export function Catalog({
  products,
  initialCategory = "all",
  syncUrl = false,
  title,
  headingAs: Heading = "h2",
}: {
  products: Product[];
  initialCategory?: "all" | CategoryId;
  syncUrl?: boolean;
  title?: string;
  headingAs?: "h1" | "h2";
}) {
  const router = useRouter();
  const { locale, t } = useLocale();
  const [category, setCategory] = useState<"all" | CategoryId>(initialCategory);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortId>("category");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const localizedCategories = localizeCategories(locale);
  const heading =
    initialCategory !== "all"
      ? (localizedCategories.find((item) => item.id === initialCategory)?.name ?? title)
      : (title ?? t.catalog.title);

  function selectCategory(next: "all" | CategoryId) {
    setCategory(next);
    setShowAll(false);
    if (syncUrl) {
      router.replace(next === "all" ? "/catalog" : `/catalog/${next}`, {
        scroll: false,
      });
    }
  }

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const list = products.filter((product) => {
      const matchesCategory = category === "all" || product.categoryId === category;
      const matchesQuery = !normalized || productSearchText(product).includes(normalized);
      return matchesCategory && matchesQuery;
    });

    const collator = new Intl.Collator(locale === "kk" ? "kk" : "ru");

    return [...list]
      .map((product) => localizeProduct(product, locale))
      .sort((a, b) => {
        if (sort === "name-asc") return collator.compare(a.name, b.name);
        if (sort === "name-desc") return collator.compare(b.name, a.name);
        return collator.compare(a.category, b.category) || collator.compare(a.name, b.name);
      });
  }, [category, query, sort, products, locale]);

  const collapsed = !showAll && filtered.length > CATALOG_PREVIEW;
  const visible = collapsed ? filtered.slice(0, CATALOG_PREVIEW) : filtered;
  const hiddenCount = filtered.length - visible.length;

  const filterControls = (
    <div className="space-y-5">
      <div>
        <p className="mb-3 text-sm font-medium">{t.catalog.category}</p>
        <div className="flex flex-col gap-2">
          <FilterChip active={category === "all"} onClick={() => selectCategory("all")}>
            {t.catalog.all}
          </FilterChip>
          {localizedCategories.map((item) => (
            <FilterChip
              key={item.id}
              active={category === item.id}
              onClick={() => selectCategory(item.id)}
              image={item.image}
              imageAlt={item.name}
            >
              {item.name}
            </FilterChip>
          ))}
        </div>
      </div>
      <label className="block space-y-2 text-sm font-medium">
        {t.catalog.sort}
        <select value={sort} onChange={(event) => setSort(event.target.value as SortId)}>
          <option value="category">{t.catalog.sortCategory}</option>
          <option value="name-asc">{t.catalog.sortAz}</option>
          <option value="name-desc">{t.catalog.sortZa}</option>
        </select>
      </label>
    </div>
  );

  return (
    <section id="catalog" className="scroll-mt-24 bg-paper py-16 md:py-24">
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
              {t.catalog.label}
            </p>
            <Heading className="mt-3 font-display text-3xl md:text-4xl">{heading}</Heading>
          </div>
          <label className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setShowAll(false);
              }}
              placeholder={t.catalog.search}
              className="pl-11"
              aria-label={t.catalog.search}
            />
          </label>
        </div>

        <button
          type="button"
          className="btn btn-outline mt-6 lg:hidden"
          onClick={() => setFiltersOpen(true)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          {t.catalog.filters}
        </button>

        <div className="mt-8 lg:grid lg:grid-cols-[17.5rem_minmax(0,1fr)] lg:items-start lg:gap-10">
          <aside className="hidden lg:block">{filterControls}</aside>

          {filtered.length > 0 ? (
            <div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {visible.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {filtered.length > CATALOG_PREVIEW ? (
                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    className="btn btn-primary px-8"
                    onClick={() => setShowAll(!showAll)}
                  >
                    {showAll
                      ? t.catalog.collapse
                      : `${t.catalog.showAll} · ${t.catalog.remaining.replace("{count}", String(hiddenCount))}`}
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="font-display text-2xl">{t.catalog.nothingFound}</p>
              <p className="mt-2 text-muted">{t.catalog.changeQuery}</p>
              <button
                type="button"
                className="btn btn-primary mt-6"
                onClick={() => {
                  setQuery("");
                  selectCategory("all");
                }}
              >
                {t.catalog.reset}
              </button>
            </div>
          )}
        </div>
      </div>

      {filtersOpen ? (
        <div
          className="fixed inset-0 z-[55] bg-graphite/50 lg:hidden"
          onClick={() => setFiltersOpen(false)}
        >
          <div
            className="absolute inset-x-0 bottom-0 max-h-[85svh] overflow-y-auto rounded-t-3xl bg-paper p-5 pb-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-xl">{t.catalog.filters}</h3>
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-full bg-mist"
                onClick={() => setFiltersOpen(false)}
                aria-label={t.catalog.closeFilters}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {filterControls}
            <button
              type="button"
              className="btn btn-primary mt-6 w-full"
              onClick={() => setFiltersOpen(false)}
            >
              {t.catalog.showCount} {filtered.length}
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function FilterChip({
  active,
  onClick,
  children,
  image,
  imageAlt,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded px-2 py-2 text-left text-sm transition",
        active ? "bg-navy text-white" : "text-graphite hover:text-brand-dark",
      )}
    >
      {image ? (
        <span className="relative h-12 w-16 shrink-0 overflow-hidden bg-mist">
          <Image
            src={image}
            alt={imageAlt ?? ""}
            fill
            className="object-contain p-1"
            sizes="64px"
          />
        </span>
      ) : null}
      <span>{children}</span>
    </button>
  );
}
