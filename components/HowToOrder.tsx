import { Reveal } from "@/components/Reveal";

const steps = [
  {
    number: "01",
    title: "Выберите оборудование",
    text: "Найдите нужную линейку в каталоге: винтовые, мобильные, турбо, осушители или генераторы.",
  },
  {
    number: "02",
    title: "Опишите задачу",
    text: "Укажите давление, производительность, отрасль или оставьте заявку без параметров.",
  },
  {
    number: "03",
    title: "Получите консультацию",
    text: "Специалист подберёт решение под бюджет и подготовит коммерческое предложение.",
  },
];

export function HowToOrder() {
  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="container-site">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
            Как заказать
          </p>
          <h2 className="mt-3 max-w-xl font-display text-3xl md:text-4xl">
            Три шага до расчёта
          </h2>
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
