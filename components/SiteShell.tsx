"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCTA } from "@/components/MobileCTA";
import { LocaleProvider } from "@/lib/i18n/locale";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <Header />
      <main className="flex-1 pb-24 md:pb-0">{children}</main>
      <Footer />
      <MobileCTA />
    </LocaleProvider>
  );
}
