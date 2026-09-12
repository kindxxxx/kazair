"use client";

import { BadgeCheck, Factory, Wrench, Headset } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useLocale } from "@/lib/i18n/locale";

const icons = [Factory, BadgeCheck, Wrench, Headset];

export function Benefits() {
  const { t } = useLocale();

  return (
    <section className="bg-paper py-16 md:py-20">
      <div className="container-site grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {t.benefits.map((item, index) => {
          const Icon = icons[index];
          return (
            <Reveal key={item.title} delay={index * 80}>
              <article className="h-full py-2">
                <Icon className="h-7 w-7 text-brand" />
                <h2 className="mt-5 font-display text-xl">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{item.text}</p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
