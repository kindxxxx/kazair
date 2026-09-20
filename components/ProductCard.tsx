"use client";

import Image from "next/image";
import Link from "next/link";
import { getTypeProducts, type Product } from "@/data/products";
import { isDualBrandProduct } from "@/data/brand-choice";
import { WhatsAppLink } from "@/components/ContactLinks";
import { catalogCardImageClass, productImage } from "@/lib/media";
import { useLocale } from "@/lib/i18n/locale";

export function ProductCard({
  product,
  compact = false,
}: {
  product: Product;
  /** Equal-height cards in grids like Popular — hide type chips and trim extras. */
  compact?: boolean;
}) {
  const href = `/catalog/${product.categoryId}/${product.id}`;
  const { t } = useLocale();
  const image = productImage(
    product.id,
    product.image,
    product.categoryId,
    product.parentId ?? product.aliasOf,
  );
  const typeItems =
    compact || product.kind === "type" || isDualBrandProduct(product)
      ? []
      : getTypeProducts(product.id);

  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_14px_40px_rgba(8,28,46,0.08)] ring-1 ring-navy/8"
      data-testid={`product-card-${product.id}`}
    >
      <Link
        href={href}
        className="relative block aspect-[4/3] overflow-hidden bg-white text-left"
        aria-label={`${t.product.details} ${product.name}`}
      >
        <Image
          src={image}
          alt={product.name}
          fill
          className={catalogCardImageClass}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </Link>
      <div className="flex flex-1 flex-col border-t border-navy/10 p-4">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
          {product.manufacturer ?? product.category}
        </p>
        <h3 className="mt-1 font-display text-lg leading-snug text-navy">
          <Link href={href}>{product.name}</Link>
        </h3>
        {product.description ? (
          <p
            className={
              compact
                ? "mt-2 line-clamp-3 min-h-[3.75rem] text-sm leading-5 text-muted"
                : "mt-2 line-clamp-2 text-sm leading-5 text-muted"
            }
          >
            {product.description}
          </p>
        ) : compact ? (
          <p className="mt-2 min-h-[3.75rem]" aria-hidden />
        ) : null}
        {typeItems.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {typeItems.map((typeProduct) => (
              <Link
                key={typeProduct.id}
                href={`/catalog/${typeProduct.categoryId}/${typeProduct.id}`}
                data-testid={`product-type-${typeProduct.id}`}
                className="rounded-full bg-mist px-3 py-1 text-xs text-navy ring-1 ring-navy/8 hover:ring-brand"
              >
                {(typeProduct.typeName ?? typeProduct.name).charAt(0).toUpperCase() +
                  (typeProduct.typeName ?? typeProduct.name).slice(1)}
              </Link>
            ))}
          </div>
        ) : null}
        <div className="mt-auto flex flex-col gap-3 pt-4">
          <Link href={href} className="btn btn-primary w-full text-[13px]">
            {t.product.details}
          </Link>
          <WhatsAppLink productName={product.name} className="btn btn-outline w-full text-[13px]">
            {t.product.consult}
          </WhatsAppLink>
        </div>
      </div>
    </article>
  );
}
