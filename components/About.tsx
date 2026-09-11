import Image from "next/image";
import { company } from "@/data/company";
import { Reveal } from "@/components/Reveal";
import { LeadButton } from "@/components/LeadForm";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-navy py-16 text-white md:py-24">
      <div className="container-site grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
            О компании
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">{company.aboutTitle}</h2>
          <p className="mt-5 max-w-xl text-white/75">{company.aboutLead}</p>
          <p className="mt-4 max-w-xl text-white/65">{company.aboutText}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Основана в 2012 году",
              "Станции «под ключ»",
              "Сервис и ПНР",
              "Алматы",
            ].map((item) => (
              <li
                key={item}
                className="rounded-[10px] border border-white/12 bg-white/8 px-4 py-3 text-sm backdrop-blur-sm"
              >
                {item}
              </li>
            ))}
          </ul>
          <LeadButton className="btn btn-primary mt-8">Оставить заявку</LeadButton>
        </Reveal>
        <Reveal delay={120}>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/catalog-cover.jpg"
              alt="Компрессорное оборудование KAZaircompressor"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
