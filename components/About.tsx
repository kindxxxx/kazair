"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { WhatsAppLink } from "@/components/ContactLinks";
import { useLocale } from "@/lib/i18n/locale";

export function About() {
  const { t } = useLocale();
  const facts = [t.about.founded, t.about.turnkey, t.about.servicePnr, t.about.almaty];

  return (
    <section id="about" className="scroll-mt-24 bg-navy py-16 text-white md:py-24">
      <div className="container-site grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
            {t.about.label}
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">{t.company.aboutTitle}</h2>
          <p className="mt-5 max-w-xl text-white/75">{t.company.aboutLead}</p>
          <p className="mt-4 max-w-xl text-white/65">{t.company.aboutText}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {facts.map((item) => (
              <li
                key={item}
                className="rounded-[10px] border border-white/12 bg-white/8 px-4 py-3 text-sm backdrop-blur-sm"
              >
                {item}
              </li>
            ))}
          </ul>
          <WhatsAppLink className="btn btn-primary mt-8">WhatsApp</WhatsAppLink>
        </Reveal>
        <Reveal delay={120}>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/catalog-cover.webp"
              alt={t.about.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
