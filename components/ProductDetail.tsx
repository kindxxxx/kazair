"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { WhatsAppLink } from "@/components/ContactLinks";
import { localizeProduct } from "@/lib/i18n/content";
import { useLocale } from "@/lib/i18n/locale";

export function ProductDetail({ product }: { product: Product }) {
  const { locale, t } = useLocale();
  const item = localizeProduct(product, locale);

  return (
    <div className="container-site grid gap-8 lg:grid-cols-2">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          priority
          className="object-contain p-2"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
      <div>
        <Link
          href={`/catalog/${item.categoryId}`}
          className="text-xs font-semibold tracking-[0.18em] text-brand uppercase"
        >
          {item.category}
        </Link>
        <h1 className="mt-3 font-display text-4xl">{item.name}</h1>
        <p className="mt-4 text-lg text-muted">{item.description}</p>
        {item.body ? <p className="mt-4 leading-7 text-ink/80">{item.body}</p> : null}
        {item.specifications.length > 0 ? (
          <dl className="mt-8 space-y-3">
            {item.specifications.map((spec) => (
              <div key={spec.label} className="flex justify-between gap-4 border-b border-stone py-3">
                <dt className="text-muted">{spec.label}</dt>
                <dd className="text-right font-medium">{spec.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        <p className="mt-8 font-medium">{t.product.price}</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <WhatsAppLink productName={item.name} className="btn btn-primary">
            {t.product.consult}
          </WhatsAppLink>
          <Link href="/catalog" className="btn btn-outline">
            {t.product.backToCatalog}
          </Link>
        </div>
      </div>
    </div>
  );
}
