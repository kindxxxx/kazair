"use client";

import { Reveal } from "@/components/Reveal";
import { useLocale } from "@/lib/i18n/locale";

export function HowToOrder() {
  const { t } = useLocale();
  const steps = t.howTo.steps.map((step, index) => ({
    number: String(index + 1).padStart(2, "0"),
    ...step,
  }));

  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="container-site">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
            {t.howTo.label}
          </p>
          <h2 className="mt-3 max-w-xl font-display text-3xl md:text-4xl">{t.howTo.title}</h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 90}>
              <article className="relative h-full py-2">
                <span className="font-display text-5xl text-brand/20">{step.number}</span>
                <h3 className="mt-4 font-display text-2xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{step.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
