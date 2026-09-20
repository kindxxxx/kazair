"use client";

import Image from "next/image";
import Link from "next/link";
import { generatorChoice, type GeneratorChoiceId } from "@/data/brand-choice";
import { catalogCardImageClass } from "@/lib/media";
import { useLocale } from "@/lib/i18n/locale";

export function GeneratorChoice() {
  const { t } = useLocale();
  const options: { id: GeneratorChoiceId; title: string; text: string }[] = [
    { id: "nitrogen", title: t.catalog.tierNitrogen, text: t.catalog.tierNitrogenText },
    { id: "oxygen", title: t.catalog.tierOxygen, text: t.catalog.tierOxygenText },
  ];

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2" data-testid="generator-choice">
      {options.map((option) => {
        const generator = generatorChoice[option.id];
        return (
          <Link
            key={option.id}
            href={generator.href}
            data-testid={`generator-choice-${option.id}`}
            className="group overflow-hidden rounded-2xl bg-white ring-1 ring-navy/10"
          >
            <span className="relative block aspect-[5/4] bg-white">
              <Image
                src={generator.image}
                alt={option.title}
                fill
                className={catalogCardImageClass}
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </span>
            <span className="block border-t border-navy/10 px-4 py-3">
              <span className="block font-display text-base leading-snug text-navy uppercase">
                {option.title}
              </span>
              <span className="mt-1 line-clamp-2 block text-sm leading-5 text-muted">
                {option.text}
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
