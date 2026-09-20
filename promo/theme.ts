export const colors = {
  navy: "#003755",
  navyDeep: "#012433",
  brand: "#22b8f0",
  brandDark: "#065ba8",
  white: "#ffffff",
  mist: "rgba(255,255,255,0.78)",
};

export const FPS = 30;
export const DURATION = FPS * 30;

export const machines = [
  {
    file: "images/slide-almig.webp",
    title: "ALMiG Premium",
    text: "Винтовые компрессоры из Германии",
  },
  {
    file: "images/slide-turbo.webp",
    title: "Турбокомпрессоры",
    text: "Высокая производительность для промышленности",
  },
  {
    file: "images/slide-mobile.webp",
    title: "Мобильные станции",
    text: "Дизельные компрессоры там, где нет сети",
  },
  {
    file: "images/slide-mks.webp",
    title: "Станции «под ключ»",
    text: "Контейнерные решения УХЛ1",
  },
] as const;
