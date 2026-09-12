"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { WhatsAppLink } from "@/components/ContactLinks";
import { useLocale } from "@/lib/i18n/locale";

export function ProductCard({ product }: { product: Product }) {
  const href = `/catalog/${product.categoryId}/${product.id}`;
  const { t } = useLocale();

  return (
    <article className="flex h-full flex-col">
      <Link
        href={href}
        className="relative block aspect-[4/3] overflow-hidden bg-mist text-left"
        aria-label={`${t.product.details} ${product.name}`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-2"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </Link>
      <div className="flex flex-1 flex-col pt-4">
        <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">
          {product.category}
        </p>
        <h3 className="mt-2 font-display text-xl tracking-tight">
          <Link href={href} className="hover:text-brand-dark">
            {product.name}
          </Link>
        </h3>
        {product.description ? (
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted">{product.description}</p>
        ) : null}
        <p className="mt-4 text-sm font-medium text-graphite">{t.product.price}</p>
        <div className="mt-auto flex flex-col gap-3 pt-5">
          <Link href={href} className="btn btn-primary w-full text-[13px]">
            {t.product.details}
          </Link>
          <WhatsAppLink productName={product.name} className="btn btn-outline w-full text-[13px]">
            WhatsApp
          </WhatsAppLink>
        </div>
      </div>
    </article>
  );
}
