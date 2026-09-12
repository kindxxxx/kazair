"use client";

import Link from "next/link";
import { company } from "@/data/company";
import { EmailLink, WhatsAppLink } from "@/components/ContactLinks";
import { Logo } from "@/components/Logo";
import { localizeCategories } from "@/lib/i18n/content";
import { useLocale } from "@/lib/i18n/locale";

export function Footer() {
  const { locale, t } = useLocale();
  const localizedCategories = localizeCategories(locale);

  return (
    <footer className="bg-navy text-white">
      <div className="container-site grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo variant="white" className="h-11 w-auto" />
          <p className="mt-4 text-sm text-white/65">{t.company.tagline}</p>
          <WhatsAppLink className="btn btn-primary mt-6">WhatsApp</WhatsAppLink>
        </div>
        <div>
          <p className="text-sm font-semibold tracking-[0.16em] text-brand uppercase">
            {t.footer.nav}
          </p>
          <nav className="mt-4 flex flex-col gap-2 text-sm text-white/80">
            <Link href="/catalog" className="hover:text-brand">
              {t.nav.catalog}
            </Link>
            <Link href="/service" className="hover:text-brand">
              {t.nav.service}
            </Link>
            <Link href="/#about" className="hover:text-brand">
              {t.nav.about}
            </Link>
            <Link href="/contacts" className="hover:text-brand">
              {t.nav.contacts}
            </Link>
          </nav>
        </div>
        <div>
          <p className="text-sm font-semibold tracking-[0.16em] text-brand uppercase">
            {t.nav.catalog}
          </p>
          <nav className="mt-4 flex flex-col gap-2 text-sm text-white/80">
            {localizedCategories.slice(0, 6).map((item) => (
              <Link key={item.id} href={`/catalog/${item.id}`} className="hover:text-brand">
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <p className="text-sm font-semibold tracking-[0.16em] text-brand uppercase">
            {t.nav.contacts}
          </p>
          <a href={company.phoneHref} className="mt-4 block font-semibold hover:text-brand">
            {company.phone}
          </a>
          <a href={company.phone2Href} className="mt-1 block text-sm text-white/80 hover:text-brand">
            {company.phone2}
          </a>
          <EmailLink className="btn btn-secondary mt-4">{company.email}</EmailLink>
          <p className="mt-3 text-sm text-white/70">{t.contacts.weekdays}</p>
          <WhatsAppLink className="mt-4 inline-block text-sm hover:text-brand">WhatsApp</WhatsAppLink>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-5 text-xs text-white/45 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {t.company.legalName}
          </p>
          <p>{t.contacts.footerCity}</p>
        </div>
      </div>
    </footer>
  );
}
