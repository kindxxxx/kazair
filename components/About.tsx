"use client";

import { OfficeMap } from "@/components/OfficeMap";
import { Reveal } from "@/components/Reveal";
import { WhatsAppLink } from "@/components/ContactLinks";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { useLocale } from "@/lib/i18n/locale";

export function About() {
  const { t } = useLocale();
  const facts = [t.about.founded, t.about.turnkey, t.about.servicePnr, t.about.almaty];

  return (
    <section id="about" className="scroll-mt-28 bg-navy py-16 text-white md:py-24" data-testid="about">
      <div className="container-site grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
            {t.about.label}
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">{t.company.aboutTitle}</h2>
          <p className="mt-5 max-w-3xl text-white/80">{t.company.aboutLead}</p>
          <p className="mt-4 max-w-3xl text-white/70">{t.company.aboutText}</p>
          <p className="mt-4 max-w-3xl text-white/70">{t.company.aboutProjects}</p>
          <p className="mt-4 max-w-3xl text-white/70">{t.company.aboutSupply}</p>
          <p className="mt-4 max-w-3xl text-white/70">{t.company.aboutIndustries}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {facts.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-white/12 bg-white/8 px-4 py-3 text-sm backdrop-blur-sm"
              >
                {item}
              </li>
            ))}
          </ul>
          <WhatsAppLink className="mt-8 grid h-12 w-12 place-items-center rounded-lg bg-[#25D366] text-white" aria-label="WhatsApp">
            <WhatsAppIcon className="h-6 w-6" />
          </WhatsAppLink>
        </Reveal>
        <Reveal delay={120}>
          <OfficeMap openLabel={t.contacts.open2gis} />
        </Reveal>
      </div>
    </section>
  );
}
