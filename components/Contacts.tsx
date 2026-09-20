"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { company } from "@/data/company";
import { Reveal } from "@/components/Reveal";
import { EmailLink, WhatsAppLink } from "@/components/ContactLinks";
import { useLocale } from "@/lib/i18n/locale";

export function Contacts({
  headingAs: Heading = "h2",
}: {
  compact?: boolean;
  headingAs?: "h1" | "h2";
}) {
  const { t } = useLocale();

  return (
    <section id="contacts" className="scroll-mt-28 bg-paper py-16 md:py-24" data-testid="contacts">
      <div className="container-site">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
            {t.contacts.label}
          </p>
          <Heading className="mt-3 font-display text-3xl md:text-4xl">{t.contacts.officeTitle}</Heading>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <article className="py-2">
            <MapPin className="h-5 w-5 text-brand" />
            <h3 className="mt-4 font-display text-xl">{t.contacts.office}</h3>
            <p className="mt-2 text-muted">{t.contacts.address}</p>
            <a
              href={company.office.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex text-sm font-semibold text-brand"
            >
              {t.contacts.open2gis}
            </a>
          </article>
          <article className="py-2">
            <Phone className="h-5 w-5 text-brand" />
            <h3 className="mt-4 font-display text-xl">{t.contacts.phones}</h3>
            <a href={company.phoneHref} className="mt-2 block font-medium">
              {company.phone}
            </a>
            <EmailLink className="mt-4 flex items-center gap-2 text-sm font-semibold text-brand">
              <Mail className="h-4 w-4" />
              {company.email}
            </EmailLink>
          </article>
          <article className="py-2">
            <Clock className="h-5 w-5 text-brand" />
            <h3 className="mt-4 font-display text-xl">{t.contacts.hours}</h3>
            <div className="mt-2 text-sm text-muted">
              <p>{t.contacts.weekdays}</p>
              <p>{t.contacts.saturday}</p>
              <p>{t.contacts.sunday}</p>
            </div>
          </article>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href={company.phoneHref} className="btn btn-dark">
            {t.contacts.call}
          </a>
          <WhatsAppLink className="btn btn-primary">WhatsApp</WhatsAppLink>
          <EmailLink className="btn btn-outline">{t.header.email}</EmailLink>
        </div>
      </div>
    </section>
  );
}
