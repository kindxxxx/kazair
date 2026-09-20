"use client";

import Link from "next/link";
import type { Product } from "@/data/products";
import { useLocale } from "@/lib/i18n/locale";
import { cn } from "@/lib/utils";

export function ProductTypesSection({
  typeItems,
  activeId,
  activeTypeName,
}: {
  typeItems: Product[];
  activeId?: string;
  activeTypeName?: string;
}) {
  const { t } = useLocale();
  if (typeItems.length === 0) return null;

  return (
    <div className="mt-12" data-testid="product-types">
      <h2 className="font-display text-2xl md:text-3xl">{t.product.types}</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {typeItems.map((typeProduct) => {
          const active =
            typeProduct.id === activeId ||
            Boolean(activeTypeName && typeProduct.typeName === activeTypeName);
          const label = typeProduct.typeName
            ? typeProduct.typeName.charAt(0).toUpperCase() + typeProduct.typeName.slice(1)
            : typeProduct.name;
          return (
            <Link
              key={typeProduct.id}
              href={`/catalog/${typeProduct.categoryId}/${typeProduct.id}`}
              data-testid={`product-type-${typeProduct.id}`}
              className={cn(
                "rounded-full px-4 py-2 text-sm leading-6 ring-1 transition",
                active
                  ? "bg-navy text-white ring-navy"
                  : "bg-white text-ink ring-navy/10 hover:ring-brand",
              )}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
