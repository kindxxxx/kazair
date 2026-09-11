"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCTA } from "@/components/MobileCTA";
import { LeadProvider } from "@/components/LeadForm";
import { ProductModalProvider } from "@/components/ProductModal";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <LeadProvider>
      <ProductModalProvider>
        <Header />
        <main className="flex-1 pb-24 md:pb-0">{children}</main>
        <Footer />
        <MobileCTA />
      </ProductModalProvider>
    </LeadProvider>
  );
}
