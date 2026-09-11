import type { Metadata } from "next";
import Image from "next/image";
import { serviceItems } from "@/data/products";
import { Reveal } from "@/components/Reveal";
import { LeadButton } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Сервис",
  description:
    "Гарантийное и послегарантийное обслуживание компрессоров, монтаж, ПНР, пневмоаудит и ремонт любой сложности.",
  alternates: { canonical: "/service" },
};

export default function ServicePage() {
  return (
    <div className="bg-paper pt-28 pb-16">
      <div className="container-site">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
            Сервис
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl">
            Гарантийное и послегарантийное обслуживание
          </h1>
          <p className="mt-5 max-w-3xl text-muted">
            ТОО KAZaircompressor предлагает услуги по сервису и ремонту любого компрессорного
            оборудования. Специалисты выполняют монтажные и демонтажные работы любой сложности и
            дают гарантию на выполненные работы.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src="/images/products/service-1.jpg"
              alt="Сервис компрессорного оборудования"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src="/images/products/service-2.jpg"
              alt="Обслуживание компрессоров"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {serviceItems.map((item) => (
            <article key={item} className="py-3 text-sm leading-6">
              {item}
            </article>
          ))}
        </div>

        <LeadButton className="btn btn-primary mt-10">Оставить заявку на сервис</LeadButton>
      </div>
    </div>
  );
}
