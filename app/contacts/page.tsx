import type { Metadata } from "next";
import { Contacts } from "@/components/Contacts";
import { JsonLd } from "@/components/JsonLd";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Офис KAZaircompressor в Алматы, ул. Рыскулова 130 А. Телефоны +7 (701) 713-14-97 и +7 (727) 338-49-89.",
  alternates: { canonical: "/contacts" },
  openGraph: { url: "/contacts" },
};

export default function ContactsPage() {
  const siteUrl = getSiteUrl();

  return (
    <div className="pt-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
            { "@type": "ListItem", position: 2, name: "Контакты", item: `${siteUrl}/contacts` },
          ],
        }}
      />
      <Contacts headingAs="h1" />
    </div>
  );
}
