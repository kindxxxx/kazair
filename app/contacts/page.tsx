import type { Metadata } from "next";
import { Contacts } from "@/components/Contacts";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Офис KAZaircompressor в Алматы, ул. Рыскулова 130 А. Телефоны +7 (701) 713-14-97 и +7 (727) 338-49-89.",
  alternates: { canonical: "/contacts" },
};

export default function ContactsPage() {
  return (
    <div className="pt-16">
      <Contacts />
    </div>
  );
}
