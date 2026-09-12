"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { WhatsAppLink } from "@/components/ContactLinks";
import { useLocale } from "@/lib/i18n/locale";

export function ServiceView({
  headingAs: Heading = "h1",
}: {
  headingAs?: "h1" | "h2";
}) {
  const { t } = useLocale();

  return (
    <div className="container-site">
      <Reveal>
        <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
          {t.service.label}
        </p>
        <Heading className="mt-3 max-w-3xl font-display text-4xl">{t.service.title}</Heading>
        <p className="mt-5 max-w-3xl text-muted">{t.service.lead}</p>
      </Reveal>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src="/images/products/service-1.webp"
            alt={t.service.imageAlt1}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src="/images/products/service-2.webp"
            alt={t.service.imageAlt2}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      <div className="mt-10 grid gap-3 md:grid-cols-2">
        {t.service.items.map((item) => (
          <article key={item} className="py-3 text-sm leading-6">
            {item}
          </article>
        ))}
      </div>

      <WhatsAppLink className="btn btn-primary mt-10">{t.service.cta}</WhatsAppLink>
    </div>
  );
}
