import { BadgeCheck, Factory, Wrench, Headset } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const benefits = [
  {
    icon: Factory,
    title: "С 2012 года в Казахстане",
    text: "Поставляем компрессоры и обслуживаем промышленные предприятия по всей республике.",
  },
  {
    icon: BadgeCheck,
    title: "Станции «под ключ»",
    text: "Монтаж, шеф-монтаж, ПНР и проекты компрессорных станций любой сложности.",
  },
  {
    icon: Wrench,
    title: "Сервис и запчасти",
    text: "Гарантийное и послегарантийное обслуживание, оригинальные и альтернативные запчасти из Европы.",
  },
  {
    icon: Headset,
    title: "Подбор под бюджет",
    text: "Premium из Германии и надёжные бюджетные линейки — оборудование для любого сектора промышленности.",
  },
];

export function Benefits() {
  return (
    <section className="bg-paper py-16 md:py-20">
      <div className="container-site grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {benefits.map((item, index) => (
          <Reveal key={item.title} delay={index * 80}>
            <article className="h-full py-2">
              <item.icon className="h-7 w-7 text-brand" />
              <h2 className="mt-5 font-display text-xl">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{item.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
