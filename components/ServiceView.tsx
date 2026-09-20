"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { WhatsAppLink } from "@/components/ContactLinks";
import { catalogImages } from "@/lib/catalog-images";
import { useLocale } from "@/lib/i18n/locale";

export function ServiceView({
  headingAs: Heading = "h1",
  showLabel = true,
  embedded = false,
}: {
  headingAs?: "h1" | "h2";
  showLabel?: boolean;
  embedded?: boolean;
}) {
  const { t } = useLocale();

  return (
    <div className={embedded ? undefined : "container-site"} data-testid="service">
      <Reveal>
        {!embedded ? (
          <>
            {showLabel ? (
              <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
                {t.service.label}
              </p>
            ) : null}
            <Heading
              className={
                showLabel
                  ? "mt-3 max-w-3xl font-display text-4xl"
                  : "max-w-3xl font-display text-3xl md:text-4xl"
              }
            >
              {t.service.title}
            </Heading>
          </>
        ) : null}
        <p className={embedded ? "max-w-4xl text-lg leading-8 text-muted" : "mt-5 max-w-4xl text-lg leading-8 text-muted"}>
          {t.service.lead}
        </p>
      </Reveal>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-white ring-1 ring-navy/10">
          <Image
            src={catalogImages.service1}
            alt={t.service.imageAlt1}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-white ring-1 ring-navy/10">
          <Image
            src={catalogImages.service2}
            alt={t.service.imageAlt2}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      <p className="mt-10 max-w-4xl text-lg leading-8 text-ink/85">{t.service.intro}</p>

      <ul className="mt-8 grid gap-3 md:grid-cols-2">
        {t.service.items.map((item) => (
          <li
            key={item}
            className="rounded-xl bg-white px-4 py-3 text-sm leading-6 text-ink ring-1 ring-navy/8"
          >
            {item}
          </li>
        ))}
      </ul>

      <p className="mt-10 max-w-4xl text-lg leading-8 text-ink/85">{t.service.outro}</p>

      <WhatsAppLink className="btn btn-primary mt-10">{t.service.cta}</WhatsAppLink>
    </div>
  );
}
