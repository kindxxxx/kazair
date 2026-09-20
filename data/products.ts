import { buildCatalogProducts } from "@/data/catalog-from-json";
import { categoryImages } from "@/lib/catalog-images";

export const categories = [
  {
    id: "screw",
    name: "Винтовые компрессоры",
    image: categoryImages.screw,
    cover: categoryImages.screw,
    intro:
      "ALMiG PREMIUM (Германия) и ROTORCOMP (Китай): ременный и прямой привод, частотный преобразователь, двухступенчатые, с осушителем и Oil Free. Производительность 0,43–104 м³/мин.",
  },
  {
    id: "mobile",
    name: "Передвижные / мобильные компрессоры",
    image: categoryImages.mobile,
    cover: categoryImages.mobile,
    intro:
      "Мобильные/передвижные компрессоры с дизельным приводом ROTORCOMP: двухступенчатый винтовой блок, Deutz, Cummins, Yuchai, Caterpillar. Производительность 2,50–39,00 м³/мин, давление 6–40 бар.",
  },
  {
    id: "turbo",
    name: "Центробежные (турбо) компрессоры",
    image: categoryImages.turbo,
    cover: categoryImages.turbo,
    intro:
      "Центробежные компрессоры высокой производительности: воздушные, азотные и кислородные API 672, а также решения API 617 для нефтяной, химической и газовой промышленности.",
  },
  {
    id: "hp",
    name: "Поршневые компрессоры высокого давления",
    image: categoryImages.hp,
    cover: categoryImages.hp,
    intro:
      "Поршневые компрессоры высокого давления для воздуха, газа, азота и гелия. Ременные, прямой привод, с частотным преобразователем, с осушителем и Oil Free.",
  },
  {
    id: "mks",
    name: "Модульные компрессорные станции",
    image: categoryImages.mks,
    cover: categoryImages.mks,
    intro:
      "Блочно-модульные компрессорные станции контейнерного типа. Не требуют капитального строительства, мобильны и работают в климате УХЛ1 от −60 °C до +45 °C.",
  },
  {
    id: "dryers",
    name: "Осушители сжатого воздуха",
    image: categoryImages.dryers,
    cover: categoryImages.dryers,
    intro:
      "Осушители OmegaAir и ROTORCOMP: рефрижераторные и адсорбционные с холодной или горячей регенерацией. Производительность до 1000 м³/мин, давление до 400 бар.",
  },
  {
    id: "filters",
    name: "Фильтры и фильтр элементы",
    image: categoryImages.filters,
    cover: categoryImages.filters,
    intro:
      "Процессные, рукавные и магистральные фильтры Donaldson, Ultrafilter, Omega Air и других производителей для газов и жидкостей.",
  },
  {
    id: "receivers",
    name: "Ресиверы (воздухосборники)",
    image: categoryImages.receivers,
    cover: categoryImages.receivers,
    intro:
      "Ресиверы для сжатого воздуха и газов объёмом до 100 м³ и более, с рабочим давлением до 400 бар. Ходовые модели 25–900 литров есть на складе.",
  },
  {
    id: "generators",
    name: "Генераторы Азота и Кислорода",
    image: categoryImages.generators,
    cover: categoryImages.generators,
    intro:
      "Генераторы N-GEN / O-GEN и готовые SKID-системы OmegaAir. Азот чистотой до 99,999 %, кислород до 95 %.",
  },
  {
    id: "gas",
    name: "Компрессоры для газа (АГНКС и АЗС СПГ)",
    image: categoryImages.gas,
    cover: categoryImages.gas,
    intro:
      "Решения для нефтегазового сектора: АГНКС, АЗС СПГ, водородные станции, очистка и глубокая переработка природного газа, EPC-сервис.",
  },
  {
    id: "parts",
    name: "Запасные части и расходные материалы",
    image: categoryImages.parts,
    cover: categoryImages.parts,
    intro:
      "Запасные части и расходные материалы к компрессорам, осушителям и фильтрам. Поставки из Европы к оборудованию ALMiG, Atlas Copco, Kaeser, Ingersoll Rand и другим.",
  },
] as const;

export type CategoryId = (typeof categories)[number]["id"];
export type CategoryName = (typeof categories)[number]["name"];

export type Product = {
  id: string;
  name: string;
  category: string;
  categoryId: CategoryId;
  image: string;
  description: string;
  body?: string;
  specifications: { label: string; value: string }[];
  tableIds?: string[];
  manufacturer?: string;
  manufacturers?: string[];
  types?: string[];
  typeName?: string;
  parentId?: string;
  kind?: "line" | "type";
  aliasOf?: string;
  afterTable?: string[];
};

export const products: Product[] = buildCatalogProducts();

export const clients = [
  { src: "/images/clients/client-kazcink.webp", alt: "KAZ Minerals / Kazcink" },
  { src: "/images/clients/client-1.webp", alt: "Партнёр 1" },
  { src: "/images/clients/client-2.webp", alt: "Партнёр 2" },
  { src: "/images/clients/client-4.webp", alt: "Партнёр 4" },
  { src: "/images/clients/client-5.webp", alt: "Партнёр 5" },
  { src: "/images/clients/client-6.webp", alt: "Партнёр 6" },
  { src: "/images/clients/client-8.webp", alt: "Партнёр 8" },
  { src: "/images/clients/client-10.webp", alt: "Партнёр 10" },
  { src: "/images/clients/client-11.webp", alt: "Партнёр 11" },
  { src: "/images/clients/client-13.webp", alt: "Партнёр 13" },
];

export const serviceItems = [
  "Подбор и доставка запчастей и расходных материалов — оригинальных и альтернативных",
  "Гарантийное и послегарантийное сопровождение винтовых, поршневых и центробежных компрессоров, а также воздухоподготовки",
  "Подбор оборудования для задач любой сложности, связанных со сжатым воздухом",
  "Пневмоаудит",
  "Проектирование и монтаж / демонтаж компрессорного оборудования",
  "Технические консультации и обучение персонала",
  "Диагностика и обследование оборудования",
  "Сервис и ремонт любой сложности",
  "Оценка эффективности использования оборудования",
  "Измерение расходов сжатого воздуха",
];

export function getCategory(id: string) {
  return categories.find((item) => item.id === id);
}

export function getProduct(id: string) {
  return products.find((item) => item.id === id);
}

export function getProductsByCategory(id: CategoryId) {
  return products.filter((item) => item.categoryId === id && !item.aliasOf);
}

export function getTypeProducts(parentId: string) {
  return products.filter((item) => item.parentId === parentId && item.kind === "type" && !item.aliasOf);
}

export function isOilFreeProduct(product: Product) {
  const haystack = `${product.id} ${product.typeName ?? ""} ${product.name}`;
  return /oil[- ]?free/i.test(haystack) || product.id === "turbo-oilfree" || product.parentId === "turbo-oilfree";
}
