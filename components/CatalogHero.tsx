"use client";

import Image from "next/image";
import Link from "next/link";
import { WhatsAppLink } from "@/components/ContactLinks";
import { catalogCardImageClass } from "@/lib/media";
import { useLocale } from "@/lib/i18n/locale";

export function CatalogHero({
  eyebrow,
  eyebrowHref,
  manufacturer,
  title,
  description,
  image,
  imageAlt,
  backHref,
  backLabel,
}: {
  eyebrow: string;
  eyebrowHref: string;
  manufacturer?: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  backHref: string;
  backLabel?: string;
}) {
  const { t } = useLocale();

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white ring-1 ring-navy/10">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          className={catalogCardImageClass}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
      <div className="flex flex-col">
        <Link
          href={eyebrowHref}
          className="text-xs font-semibold tracking-[0.18em] text-brand uppercase"
        >
          {eyebrow}
        </Link>
        {manufacturer ? (
          <p className="mt-3 text-sm font-semibold tracking-[0.14em] text-navy/70 uppercase">
            {t.product.manufacturer}: {manufacturer}
          </p>
        ) : null}
        <h1 className="mt-3 font-display text-3xl md:text-4xl">{title}</h1>
        <p className="mt-4 text-lg leading-7 text-muted">{description}</p>
        <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
          <WhatsAppLink productName={title} className="btn btn-primary">
            {t.product.consult}
          </WhatsAppLink>
          <Link href={backHref} className="btn btn-outline">
            {backLabel ?? t.product.backToCatalog}
          </Link>
        </div>
      </div>
    </div>
  );
}
