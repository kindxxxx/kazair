"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Mail, Menu, Phone, Search, X } from "lucide-react";
import { company } from "@/data/company";
import { EmailLink, WhatsAppLink } from "@/components/ContactLinks";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Logo } from "@/components/Logo";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { useLocale } from "@/lib/i18n/locale";
export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const { t } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const [query, setQuery] = useState("");

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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = query.trim();
    router.push(next ? `/catalog?q=${encodeURIComponent(next)}` : "/catalog");
    setMenuOpen(false);
  }

  return (
    <header
      data-testid="header"
      className="glass-nav is-compact fixed inset-x-0 top-0 z-50 text-navy transition-all duration-300"
    >
      <div
        data-testid="topbar"
        className="hidden border-b border-navy/8 lg:block"
      >
        <div className="container-site flex items-center justify-between gap-4 py-1.5 text-xs text-navy/80">
          <p className="truncate text-navy/80">{t.contacts.address}</p>
          <div className="flex items-center gap-5">
            <a href={company.phoneHref} className="text-navy/80 hover:text-navy">
              {company.phone}
            </a>
            <a href={company.emailHref} className="text-navy/80 hover:text-navy">
              {company.email}
            </a>
          </div>
        </div>
      </div>

      <div className="container-site flex items-center justify-between gap-3 py-3">
        <Link href="/" className="flex min-w-0 items-center" data-testid="logo-link">
          <Logo />
        </Link>

        <nav
          className="hidden items-center gap-5 xl:gap-7 lg:flex"
          aria-label={t.nav.mainNav}
          data-testid="nav-main"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={isHome && item.hash ? item.hash : item.href}
              className="text-sm text-navy/75 transition hover:text-navy"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <form
          onSubmit={submitSearch}
          className="relative hidden min-w-56 flex-1 max-w-xs lg:block"
        >
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-navy/40" />
          <input
            name="q"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t.header.search}
            aria-label={t.header.search}
            data-testid="header-search"
            className="h-10 rounded-lg pl-12! text-sm"
          />
        </form>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <a
            href={company.phoneHref}
            className="grid h-11 w-11 place-items-center rounded-lg bg-navy/8 text-navy lg:hidden"
            aria-label={`${t.header.call} ${company.phone}`}
          >
            <Phone className="h-4 w-4" />
          </a>
          <WhatsAppLink
            className="grid h-11 w-11 place-items-center rounded-lg bg-[#25D366] text-white"
            aria-label="WhatsApp"
            data-testid="header-whatsapp"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </WhatsAppLink>
          <EmailLink
            className="hidden h-11 w-11 place-items-center rounded-lg bg-navy/8 text-navy xl:grid"
            aria-label={`${t.header.email} ${company.email}`}
          >
            <Mail className="h-4 w-4" />
          </EmailLink>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-lg bg-navy/8 text-navy lg:hidden"
            aria-label={menuOpen ? t.header.closeMenu : t.header.openMenu}
            data-testid="menu-toggle"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div
          className="border-t border-navy/8 bg-white/92 backdrop-blur-xl backdrop-saturate-150 lg:hidden"
          data-testid="nav-mobile"
        >
          <nav className="container-site flex flex-col gap-4 py-6" aria-label={t.nav.mobileNav}>
            <form onSubmit={submitSearch} className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-navy/40" />
              <input
                name="q"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t.header.search}
                aria-label={t.header.search}
                data-testid="header-search-mobile"
                className="h-11 rounded-lg pl-12! text-sm"
              />
            </form>
            {nav.map((item) => (
              <Link
                key={item.href}
                href={isHome && item.hash ? item.hash : item.href}
                className="text-lg text-navy"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a href={company.phoneHref} className="text-lg font-semibold text-navy">
              {company.phone}
            </a>
            <WhatsAppLink
              className="grid h-12 w-full place-items-center rounded-lg bg-[#25D366] text-white"
              aria-label="WhatsApp"
              onClick={() => setMenuOpen(false)}
            >
              <WhatsAppIcon className="h-6 w-6" />
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
