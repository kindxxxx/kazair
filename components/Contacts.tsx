import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { company } from "@/data/company";
import { Reveal } from "@/components/Reveal";
import { LeadButton } from "@/components/LeadForm";

export function Contacts({ compact = false }: { compact?: boolean }) {
  return (
    <section id="contacts" className="scroll-mt-24 bg-paper py-16 md:py-24">
      <div className="container-site">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
            Наши контакты
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">Офис в Алматы</h2>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <article className="py-2">
            <MapPin className="h-5 w-5 text-brand" />
            <h3 className="mt-4 font-display text-xl">{company.office.label}</h3>
            <p className="mt-2 text-muted">{company.office.address}</p>
            <a
              href={company.office.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex text-sm font-semibold text-brand"
            >
              Открыть в 2ГИС
            </a>
          </article>
          <article className="py-2">
            <Phone className="h-5 w-5 text-brand" />
            <h3 className="mt-4 font-display text-xl">Телефоны</h3>
            <a href={company.phoneHref} className="mt-2 block font-medium">
              {company.phone}
            </a>
            <a href={company.phone2Href} className="mt-1 block font-medium">
              {company.phone2}
            </a>
            <a href={company.emailHref} className="mt-4 flex items-center gap-2 text-sm text-muted">
              <Mail className="h-4 w-4 text-brand" />
              {company.email}
            </a>
          </article>
          <article className="py-2">
            <Clock className="h-5 w-5 text-brand" />
            <h3 className="mt-4 font-display text-xl">График</h3>
            <div className="mt-2 text-sm text-muted">
              <p>{company.hours.weekdays}</p>
              <p>{company.hours.saturday}</p>
              <p>{company.hours.sunday}</p>
            </div>
          </article>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href={company.phoneHref} className="btn btn-dark">
            Позвонить
          </a>
          <a
            href={company.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            WhatsApp
          </a>
          {compact ? (
            <LeadButton className="btn btn-outline">Получить расчёт</LeadButton>
          ) : null}
        </div>
      </div>
    </section>
  );
}
