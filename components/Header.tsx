"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { company } from "@/data/company";
import { LeadButton } from "@/components/LeadForm";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/catalog", label: "Каталог", hash: "#catalog" },
  { href: "/service", label: "Сервис" },
  { href: "/#about", label: "О компании" },
  { href: "/contacts", label: "Контакты" },
];

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [compact, setCompact] = useState(!isHome);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setCompact(true);
      return;
    }

    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        compact || menuOpen
          ? "border-b border-white/10 bg-navy/72 text-white shadow-lg backdrop-blur-xl"
          : "bg-transparent text-white",
      )}
    >
      <div className="container-site flex items-center justify-between gap-3 py-3 md:py-4">
        <Link href="/" className="flex min-w-0 items-center">
          <Logo variant="white" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Основная навигация">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={isHome && item.hash ? item.hash : item.href}
              className="text-sm text-white/80 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden flex-col items-end leading-tight lg:flex">
            <a href={company.phoneHref} className="text-sm font-semibold hover:text-brand">
              {company.phone}
            </a>
            <a href={company.phone2Href} className="text-xs text-white/70 hover:text-brand">
              {company.phone2}
            </a>
          </div>
          <a
            href={company.phoneHref}
            className="grid h-11 w-11 place-items-center rounded-[10px] bg-white/10 lg:hidden"
            aria-label={`Позвонить ${company.phone}`}
          >
            <Phone className="h-4 w-4" />
          </a>
          <LeadButton className="btn btn-primary hidden px-4 py-3 md:inline-flex">
            Оставить заявку
          </LeadButton>
          <a
            href={company.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary hidden px-4 py-3 xl:inline-flex"
          >
            WhatsApp
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-[10px] bg-white/10 lg:hidden"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-white/10 bg-navy lg:hidden">
          <nav className="container-site flex flex-col gap-4 py-6" aria-label="Мобильная навигация">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={isHome && item.hash ? item.hash : item.href}
                className="text-lg"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a href={company.phoneHref} className="text-lg font-semibold">
              {company.phone}
            </a>
            <a href={company.phone2Href} className="text-base text-white/80">
              {company.phone2}
            </a>
            <LeadButton className="btn btn-primary w-full" onClick={() => setMenuOpen(false)}>
              Оставить заявку
            </LeadButton>
            <a
              href={company.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary w-full"
            >
              WhatsApp
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
