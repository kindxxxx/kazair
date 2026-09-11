"use client";

import { useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { categories, type CategoryId, type Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { cn } from "@/lib/utils";

type SortId = "name-asc" | "name-desc" | "category";

export function Catalog({
  products,
  initialCategory = "all",
  syncUrl = false,
  title = "Каталог продукции",
  headingAs: Heading = "h2",
}: {
  products: Product[];
  initialCategory?: "all" | CategoryId;
  syncUrl?: boolean;
  title?: string;
  headingAs?: "h1" | "h2";
}) {
  const router = useRouter();
  const [category, setCategory] = useState<"all" | CategoryId>(initialCategory);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortId>("category");
  const [filtersOpen, setFiltersOpen] = useState(false);

  function selectCategory(next: "all" | CategoryId) {
    setCategory(next);
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
      const matchesQuery =
        !normalized ||
        product.name.toLowerCase().includes(normalized) ||
        product.category.toLowerCase().includes(normalized) ||
        product.description.toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });

    return [...list].sort((a, b) => {
      if (sort === "name-asc") return a.name.localeCompare(b.name, "ru");
      if (sort === "name-desc") return b.name.localeCompare(a.name, "ru");
      return (
        a.category.localeCompare(b.category, "ru") || a.name.localeCompare(b.name, "ru")
      );
    });
  }, [category, query, sort, products]);

  const filterControls = (
    <div className="space-y-5">
      <div>
        <p className="mb-3 text-sm font-medium">Категория</p>
        <div className="flex flex-wrap gap-2">
          <FilterChip active={category === "all"} onClick={() => selectCategory("all")}>
            Все
          </FilterChip>
          {categories.map((item) => (
            <FilterChip
              key={item.id}
              active={category === item.id}
              onClick={() => selectCategory(item.id)}
            >
              {item.name}
            </FilterChip>
          ))}
        </div>
      </div>
      <label className="block space-y-2 text-sm font-medium">
        Сортировка
        <select value={sort} onChange={(event) => setSort(event.target.value as SortId)}>
          <option value="category">По категории</option>
          <option value="name-asc">По названию А–Я</option>
          <option value="name-desc">По названию Я–А</option>
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
              Каталог
            </p>
            <Heading className="mt-3 font-display text-3xl md:text-4xl">{title}</Heading>
          </div>
          <label className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Поиск по названию"
              className="pl-11"
              aria-label="Поиск по названию"
            />
          </label>
        </div>

        <div className="mt-8 hidden lg:block">{filterControls}</div>

        <button
          type="button"
          className="btn btn-outline mt-6 lg:hidden"
          onClick={() => setFiltersOpen(true)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Фильтры
        </button>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((item) => (
            <Link
              key={item.id}
              href={`/catalog/${item.id}`}
              className={cn(
                "text-left transition hover:text-brand-dark",
                category === item.id && "text-brand-dark",
              )}
            >
              <div className="relative aspect-[16/10] bg-mist">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
              </div>
              <span className="mt-3 block font-display text-base tracking-tight">
                {item.name}
              </span>
            </Link>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-10 p-8 text-center">
            <p className="font-display text-2xl">Ничего не найдено</p>
            <p className="mt-2 text-muted">Измените запрос или сбросьте фильтры.</p>
            <button
              type="button"
              className="btn btn-primary mt-6"
              onClick={() => {
                setQuery("");
                selectCategory("all");
              }}
            >
              Сбросить фильтры
            </button>
          </div>
        )}
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
              <h3 className="font-display text-xl">Фильтры</h3>
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-full bg-mist"
                onClick={() => setFiltersOpen(false)}
                aria-label="Закрыть фильтры"
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
              Показать {filtered.length}
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
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded px-4 py-2 text-sm transition",
        active ? "bg-navy text-white" : "text-graphite hover:text-brand-dark",
      )}
    >
      {children}
    </button>
  );
}
