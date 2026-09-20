"use client";

import { company } from "@/data/company";
import { WhatsAppLink } from "@/components/ContactLinks";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { useLocale } from "@/lib/i18n/locale";

export function ConsultBanner() {
  const { t } = useLocale();

  return (
    <section className="bg-navy py-14 text-white" data-testid="consult-banner">
      <div className="container-site flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
            {t.hero.freeConsult}
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">{t.hero.consultAsk}</h2>
          <p className="mt-3 text-white/75">
            {t.hero.callChoice} {company.phone}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a href={company.phoneHref} className="btn btn-secondary">
            {company.phone}
          </a>
          <WhatsAppLink
            className="grid h-12 w-12 place-items-center rounded-lg bg-[#25D366] text-white"
            aria-label="WhatsApp"
          >
            <WhatsAppIcon className="h-6 w-6" />
          </WhatsAppLink>
        </div>
      </div>
    </section>
  );
}
