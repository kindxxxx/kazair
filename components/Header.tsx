"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Menu, Phone, X } from "lucide-react";
import { company } from "@/data/company";
import { EmailLink, WhatsAppLink } from "@/components/ContactLinks";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Logo } from "@/components/Logo";
import { useLocale } from "@/lib/i18n/locale";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { t } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);

  const nav = [
    { href: "/catalog", label: t.nav.catalog, hash: "#catalog" },
    { href: "/service", label: t.nav.service, hash: "#service" },
    { href: "/#about", label: t.nav.about, hash: "#about" },
    { href: "/contacts", label: t.nav.contacts, hash: "#contacts" },
    { href: "/#partners", label: t.nav.partners, hash: "#partners" },
  ];

  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  const compact = !isHome || scrolled;

  useEffect(() => {
    if (!isHome) return;

    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

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

        <nav className="hidden items-center gap-5 xl:gap-7 lg:flex" aria-label={t.nav.mainNav}>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={isHome && item.hash ? item.hash : item.href}
              className="text-sm text-white/80 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
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
            aria-label={`${t.header.call} ${company.phone}`}
          >
            <Phone className="h-4 w-4" />
          </a>
          <WhatsAppLink className="btn btn-primary hidden px-4 py-3 md:inline-flex">
            WhatsApp
          </WhatsAppLink>
          <EmailLink className="btn btn-secondary hidden px-4 py-3 xl:inline-flex">
            {t.header.email}
          </EmailLink>
          <EmailLink
            className="hidden h-11 w-11 place-items-center rounded-[10px] bg-white/10 md:grid xl:hidden"
            aria-label={`${t.header.email} ${company.email}`}
          >
            <Mail className="h-4 w-4" />
          </EmailLink>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-[10px] bg-white/10 lg:hidden"
            aria-label={menuOpen ? t.header.closeMenu : t.header.openMenu}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-white/10 bg-navy lg:hidden">
          <nav className="container-site flex flex-col gap-4 py-6" aria-label={t.nav.mobileNav}>
            {nav.map((item) => (
              <Link
                key={item.href}
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
            <WhatsAppLink className="btn btn-primary w-full" onClick={() => setMenuOpen(false)}>
              WhatsApp
            </WhatsAppLink>
            <EmailLink className="btn btn-secondary w-full" onClick={() => setMenuOpen(false)}>
              {t.header.email}
            </EmailLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
