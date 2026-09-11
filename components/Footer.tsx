import Link from "next/link";
import { company } from "@/data/company";
import { categories } from "@/data/products";
import { LeadButton } from "@/components/LeadForm";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-site grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo variant="white" className="h-11 w-auto" />
          <p className="mt-4 text-sm text-white/65">{company.tagline}</p>
          <LeadButton className="btn btn-primary mt-6">Оставить заявку</LeadButton>
        </div>
        <div>
          <p className="text-sm font-semibold tracking-[0.16em] text-brand uppercase">
            Навигация
          </p>
          <nav className="mt-4 flex flex-col gap-2 text-sm text-white/80">
            <Link href="/catalog" className="hover:text-brand">
              Каталог
            </Link>
            <Link href="/service" className="hover:text-brand">
              Сервис
            </Link>
            <Link href="/#about" className="hover:text-brand">
              О компании
            </Link>
            <Link href="/contacts" className="hover:text-brand">
              Контакты
            </Link>
          </nav>
        </div>
        <div>
          <p className="text-sm font-semibold tracking-[0.16em] text-brand uppercase">
            Каталог
          </p>
          <nav className="mt-4 flex flex-col gap-2 text-sm text-white/80">
            {categories.slice(0, 6).map((item) => (
              <Link key={item.id} href={`/catalog/${item.id}`} className="hover:text-brand">
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <p className="text-sm font-semibold tracking-[0.16em] text-brand uppercase">
            Контакты
          </p>
          <a href={company.phoneHref} className="mt-4 block font-semibold hover:text-brand">
            {company.phone}
          </a>
          <a href={company.phone2Href} className="mt-1 block text-sm text-white/80 hover:text-brand">
            {company.phone2}
          </a>
          <a href={company.emailHref} className="mt-3 block text-sm text-white/80 hover:text-brand">
            {company.email}
          </a>
          <p className="mt-3 text-sm text-white/70">{company.hours.weekdays}</p>
          <a
            href={company.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block text-sm hover:text-brand"
          >
            WhatsApp
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-5 text-xs text-white/45 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.legalName}
          </p>
          <p>Алматы, ул. Рыскулова 130 А</p>
        </div>
      </div>
    </footer>
  );
}
