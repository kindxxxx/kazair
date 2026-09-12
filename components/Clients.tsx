"use client";

import Image from "next/image";
import { clients } from "@/data/products";
import { Reveal } from "@/components/Reveal";
import { useLocale } from "@/lib/i18n/locale";

export function Clients() {
  const { t } = useLocale();

  return (
    <section className="bg-paper py-16 md:py-20">
      <div className="container-site">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
            {t.clients.label}
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">{t.clients.title}</h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {clients.map((client) => (
            <div key={client.src} className="grid h-24 place-items-center px-4">
              <Image
                src={client.src}
                alt={client.alt}
                width={140}
                height={56}
                className="max-h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
