export const categories = [
  {
    id: "screw",
    name: "Винтовые компрессоры",
    image: "/images/cat-screw.jpg",
    cover: "/images/slide-almig.webp",
    intro:
      "Продажа компрессоров, компрессорного и иного оборудования, проведение шеф-монтажных и монтажных работ, проведение гарантийного и послегарантийного обслуживания.",
  },
  {
    id: "mobile",
    name: "Передвижные компрессоры",
    image: "/images/cat-mobile.jpg",
    cover: "/images/slide-mobile.webp",
    intro:
      "Мобильные/передвижные компрессоры с дизельным приводом ROTORCOMP для работы при отсутствии электроэнергии. Добыча, дорожное строительство, пескоструй и резерв стационарных установок.",
  },
  {
    id: "hp",
    name: "Компрессоры высокого давления",
    image: "/images/cat-hp.jpg",
    cover: "/images/slide-piston.webp",
    intro:
      "Поршневые компрессоры высокого давления для воздуха, газа, азота и гелия. Ременные, прямой привод, с частотным преобразователем, с осушителем и Oil Free.",
  },
  {
    id: "turbo",
    name: "Центробежные (турбо) компрессоры",
    image: "/images/cat-turbo.jpg",
    cover: "/images/slide-turbo.webp",
    intro:
      "Центробежные компрессоры высокой производительности: воздушные, азотные и кислородные API 672, а также решения API 617 для нефтяной, химической и газовой промышленности.",
  },
  {
    id: "mks",
    name: "Модульные компрессорные станции",
    image: "/images/cat-mks.jpg",
    cover: "/images/slide-mks.webp",
    intro:
      "Блочно-модульные компрессорные станции контейнерного типа. Не требуют капитального строительства, мобильны и работают в климате УХЛ1 от −60 °C до +45 °C.",
  },
  {
    id: "dryers",
    name: "Осушители сжатого воздуха",
    image: "/images/cat-dryers.jpg",
    cover: "/images/products/dryer-1.jpg",
    intro:
      "Осушители OmegaAir и ROTORCOMP: рефрижераторные и адсорбционные с холодной или горячей регенерацией. Производительность до 1000 м³/мин, давление до 400 бар.",
  },
  {
    id: "filters",
    name: "Фильтры и фильтр элементы",
    image: "/images/cat-filters.jpg",
    cover: "/images/cat-filters.jpg",
    intro:
      "Процессные, рукавные и магистральные фильтры Donaldson, Ultrafilter, Omega Air и других производителей для газов и жидкостей.",
  },
  {
    id: "generators",
    name: "Генераторы азота и кислорода",
    image: "/images/cat-generators.jpg",
    cover: "/images/products/gen-1.jpg",
    intro:
      "Генераторы N-GEN / O-GEN и готовые SKID-системы OmegaAir. Азот чистотой до 99,999 %, кислород до 95 %.",
  },
  {
    id: "receivers",
    name: "Ресиверы (воздухосборники)",
    image: "/images/cat-receivers.jpg",
    cover: "/images/products/receiver.jpg",
    intro:
      "Ресиверы для сжатого воздуха и газов объёмом до 100 м³ и более, с рабочим давлением до 400 бар. Ходовые модели 25–900 литров есть на складе.",
  },
  {
    id: "gas",
    name: "Компрессоры АГНКС и АЗС СПГ",
    image: "/images/cat-gas.jpg",
    cover: "/images/products/gas-1.jpg",
    intro:
      "Решения для нефтегазового сектора: АГНКС, АЗС СПГ, водородные станции, очистка и глубокая переработка природного газа, EPC-сервис.",
  },
  {
    id: "parts",
    name: "Запасные части",
    image: "/images/cat-parts.jpg",
    cover: "/images/products/parts.jpg",
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
};

export const products: Product[] = [
  {
    id: "almig-premium",
    name: "ALMiG — компрессоры Premium класса",
    category: "Винтовые компрессоры",
    categoryId: "screw",
    image: "/images/slide-almig.webp",
    description:
      "Винтовые компрессоры PREMIUM класса (Германия). Производительность 0,43–48,00 м³/мин, давление 5–13 бар.",
    body: "Компрессоры ALMiG обеспечивают производительность от 0,43 до 48,00 м³/мин при максимальном рабочем давлении от 5 до 13 бар. Системы управления: Air Control B — микропроцессорный контроль и автоматический выбор экономичного режима; Air Control P — графический дисплей, управление оборудованием других производителей и объединение в сеть.",
    specifications: [
      { label: "Класс", value: "Premium, Германия" },
      { label: "Производительность", value: "0,43–48,00 м³/мин" },
      { label: "Давление", value: "5–13 бар" },
    ],
  },
  {
    id: "rotorcomp-screw",
    name: "ROTORCOMP — винтовые компрессоры",
    category: "Винтовые компрессоры",
    categoryId: "screw",
    image: "/images/slide-rotorcomp.webp",
    description:
      "Бюджетные винтовые компрессоры высокого качества (Китай). Производительность 0,75–104,00 м³/мин, давление 3–40 бар.",
    body: "Компрессоры ROTORCOMP подойдут предприятиям, которые ориентированы на высокое качество и надёжность, но не закупают дорогостоящее европейское или американское оборудование. Соответствуют мировым стандартам, в том числе ISO 8573-1 Klasse 0 (Oil Free). Срок эксплуатации — не менее 15 лет при своевременном сервисе.",
    specifications: [
      { label: "Производитель", value: "ROTORCOMP" },
      { label: "Производительность", value: "0,75–104,00 м³/мин" },
      { label: "Давление", value: "3–40 бар" },
    ],
  },
  {
    id: "oil-free",
    name: "Безмасляные компрессоры (Oil Free)",
    category: "Винтовые компрессоры",
    categoryId: "screw",
    image: "/images/popular-oilfree.jpg",
    description:
      "Компрессоры для пищевой и медицинской промышленности. Давление 5–10 бар, производительность 6,40–86,20 м³/мин.",
    specifications: [
      { label: "Назначение", value: "Пищевая и медицинская промышленность" },
      { label: "Давление", value: "5–10 бар" },
      { label: "Производительность", value: "6,40–86,20 м³/мин" },
      { label: "Мощность", value: "45–560 кВт" },
    ],
  },
  {
    id: "integrated-laser",
    name: "Интегрированные компрессорные системы",
    category: "Винтовые компрессоры",
    categoryId: "screw",
    image: "/images/popular-integrated.jpg",
    description:
      "Компрессоры для плазменных и лазерных резок. Давление 5–16 бар, производительность 0,61–6,60 м³/мин.",
    specifications: [
      { label: "Назначение", value: "Плазменная и лазерная резка" },
      { label: "Давление", value: "5–16 бар" },
      { label: "Производительность", value: "0,61–6,60 м³/мин" },
      { label: "Мощность", value: "5,5–37 кВт" },
    ],
  },
  {
    id: "mobile-rotorcomp",
    name: "Передвижные компрессоры ROTORCOMP",
    category: "Передвижные компрессоры",
    categoryId: "mobile",
    image: "/images/products/mobile-1.jpg",
    description:
      "Дизельные винтовые компрессоры на шасси. Производительность 6,00–43,20 м³/мин, давление 4,5–35 бар.",
    body: "Комплектация: двухступенчатый винтовой блок, прямой привод или прямой привод с частотным преобразователем, двигатели Deutz, Cummins, Yuchai, Caterpillar, подшипники SKF, электроника Schneider. Расход топлива снижен на 10–15% относительно конкурентов. Подходят для добычи, дорожного строительства, пескоструя и как резерв стационарной установки.",
    specifications: [
      { label: "Привод", value: "Дизельный, на шасси" },
      { label: "Производительность", value: "2,50–39,00 м³/мин" },
      { label: "Давление", value: "6–40 бар" },
      { label: "Двигатели", value: "Deutz, Cummins, Yuchai, Caterpillar" },
    ],
  },
  {
    id: "mobile-ly-12-10",
    name: "Мобильный компрессор LY-12/10",
    category: "Передвижные компрессоры",
    categoryId: "mobile",
    image: "/images/products/mobile-2.jpg",
    description: "Производительность 12 м³/мин, давление 1,0 МПа, двигатель Cummins 150 HP.",
    specifications: [
      { label: "Модель", value: "LY-12/10" },
      { label: "Производительность", value: "12 м³/мин" },
      { label: "Давление", value: "1,0 МПа" },
      { label: "Двигатель", value: "Cummins 150 HP" },
      { label: "Габариты", value: "3900×1920×1900 мм" },
    ],
  },
  {
    id: "mobile-ly-25-10",
    name: "Мобильный компрессор LY-25/10",
    category: "Передвижные компрессоры",
    categoryId: "mobile",
    image: "/images/products/mobile-3.jpg",
    description: "Производительность 25 м³/мин, давление 1,0 МПа, двигатель Cummins 260 HP.",
    specifications: [
      { label: "Модель", value: "LY-25/10" },
      { label: "Производительность", value: "25 м³/мин" },
      { label: "Давление", value: "1,0 МПа" },
      { label: "Двигатель", value: "Cummins 260 HP" },
      { label: "Габариты", value: "3980×1800×2450 мм" },
    ],
  },
  {
    id: "hp-piston",
    name: "Поршневые компрессоры высокого давления",
    category: "Компрессоры высокого давления",
    categoryId: "hp",
    image: "/images/products/hp-1.jpg",
    description:
      "Многоступенчатые компрессоры для воздуха, азота, гелия, аргона и природного газа. Давление от 8 до 500 бар.",
    body: "В линейке есть ременные модели, прямой привод, частотный преобразователь, комплектация с осушителем и безмасляные Oil Free. Воздушное или водяное охлаждение, горизонтальное или вертикальное исполнение. Опционально — дизельный привод и шумозащитная обшивка.",
    specifications: [
      { label: "Среда", value: "Воздух, газ, азот, гелий" },
      { label: "Производительность", value: "12–2500 м³/час" },
      { label: "Давление", value: "8–500 бар и выше" },
    ],
  },
  {
    id: "sauer-air-n2",
    name: "Sauer & Sohn — воздух и азот",
    category: "Компрессоры высокого давления",
    categoryId: "hp",
    image: "/images/products/hp-2.jpg",
    description:
      "Поршневые маслонаполненные компрессоры J.P. Sauer & Sohn: 7–500 бар, производительность до 2000 нм³/ч.",
    body: "Серии MISTRAL (8–40 бар), PASSAT (10–80 бар), HURRICANE (90–400 бар), TORNADO (50–420 бар), TYPHOON (10–100 бар), 5000 (50–350 бар) и 6000 (50–500 бар). Прямой привод, класс защиты IP55, опционально дизель и согласованная работа нескольких машин через панель MECC.",
    specifications: [
      { label: "Производитель", value: "J.P. Sauer & Sohn" },
      { label: "Давление", value: "7–500 бар" },
      { label: "Производительность", value: "до 2000 нм³/ч" },
      { label: "Масло в газе", value: "< 5 мг/м³" },
    ],
  },
  {
    id: "sauer-helium",
    name: "Sauer серия G — гелий и аргон",
    category: "Компрессоры высокого давления",
    categoryId: "hp",
    image: "/images/products/hp-3.jpg",
    description:
      "Компрессоры Sauer серии G для производств, требующих гелий и аргон давлением до 250 бар.",
    specifications: [
      { label: "Серии", value: "PASSAT, HURRICANE, TORNADO" },
      { label: "Давление", value: "до 250 бар" },
      { label: "Охлаждение", value: "Воздушное" },
      { label: "Исполнение", value: "BasSeal / ComSeal" },
    ],
  },
  {
    id: "turbo-oilfree",
    name: "Центробежные турбокомпрессоры Oil Free",
    category: "Центробежные (турбо) компрессоры",
    categoryId: "turbo",
    image: "/images/products/turbo-1.jpg",
    description:
      "Безмасляный воздух, производительность до 600 000 м³/час, давление до 80 бар, срок службы до 30 лет.",
    body: "Воздушные, азотные и кислородные компрессоры API 672; осевые, центробежные и детандер-компрессоры API 617. Степень надёжности авиационного строения, простое обслуживание, минимальные затраты на электроэнергию. Большинство моделей смонтированы на раме и не требуют специального фундамента.",
    specifications: [
      { label: "Тип", value: "Oil Free, API 672 / 617" },
      { label: "Производительность", value: "до 600 000 м³/час" },
      { label: "Давление", value: "до 80 бар" },
      { label: "Срок службы", value: "до 30 лет" },
    ],
  },
  {
    id: "turbo-api617",
    name: "Компрессоры API 617 для нефтехимии",
    category: "Центробежные (турбо) компрессоры",
    categoryId: "turbo",
    image: "/images/products/turbo-2.jpg",
    description:
      "Осевые, центробежные компрессоры и детандер-компрессоры для нефтяной, химической и газовой промышленности.",
    specifications: [
      { label: "Стандарт", value: "API 617" },
      { label: "Среда", value: "Нефть, химия, газ" },
      { label: "Исполнение", value: "Блоками, без фундамента" },
    ],
  },
  {
    id: "turbo-n2-o2",
    name: "Азотные и кислородные турбокомпрессоры",
    category: "Центробежные (турбо) компрессоры",
    categoryId: "turbo",
    image: "/images/products/turbo-3.jpg",
    description: "Азотные (N2) и кислородные (O2) центробежные компрессоры по API 672.",
    specifications: [
      { label: "Стандарт", value: "API 672" },
      { label: "Среда", value: "N2 / O2" },
      { label: "Воздух", value: "Всегда Oil Free" },
    ],
  },
  {
    id: "mks-20ft",
    name: "МКС контейнерного типа 20 Ft",
    category: "Модульные компрессорные станции",
    categoryId: "mks",
    image: "/images/products/mks-1.jpg",
    description:
      "Модульная станция в 20-футовом контейнере: компрессор, осушитель, фильтрация и инженерные системы.",
    body: "Станции не требуют капитального строительства, полностью автоматизированы и могут перевозиться авто- и железнодорожным транспортом. Исполнение УХЛ1 от −60 °C до +45 °C. Возможна установка поршневых, винтовых, дизельных, турбокомпрессоров и дожимных машин.",
    specifications: [
      { label: "Тип", value: "20 Ft" },
      { label: "Наружный размер", value: "6,06 × 2,44 × 2,59 м" },
      { label: "Вес пустой", value: "2 250 кг" },
      { label: "Макс. вес", value: "30 480 кг" },
    ],
  },
  {
    id: "mks-40ft",
    name: "МКС контейнерного типа 40 Ft",
    category: "Модульные компрессорные станции",
    categoryId: "mks",
    image: "/images/products/mks-2.jpg",
    description: "40-футовая блочно-модульная станция для сжатия воздуха, азота, кислорода и газов.",
    specifications: [
      { label: "Тип", value: "40 Ft" },
      { label: "Наружный размер", value: "12,19 × 2,44 × 2,59 м" },
      { label: "Вес пустой", value: "3 740 кг" },
      { label: "Климат", value: "УХЛ1, −60…+45 °C" },
    ],
  },
  {
    id: "mks-sandwich",
    name: "МКС из сэндвич-панелей",
    category: "Модульные компрессорные станции",
    categoryId: "mks",
    image: "/images/products/mks-3.jpg",
    description:
      "Модуль из сэндвич-панелей с отоплением, освещением, пожарной сигнализацией и приточно-вытяжной системой.",
    specifications: [
      { label: "Корпус", value: "Сэндвич-панель / контейнер" },
      { label: "Наполнение", value: "По требованию заказчика" },
      { label: "Управление", value: "Автоматизация, вывод на ПК" },
    ],
  },
  {
    id: "dryer-ref",
    name: "Рефрижераторные осушители",
    category: "Осушители сжатого воздуха",
    categoryId: "dryers",
    image: "/images/products/dryer-1.jpg",
    description: "Осушители рефрижераторного типа OmegaAir и ROTORCOMP для сжатого воздуха и газов.",
    specifications: [
      { label: "Тип", value: "Рефрижераторный" },
      { label: "Производители", value: "OmegaAir, ROTORCOMP" },
      { label: "Давление", value: "до 400 бар" },
    ],
  },
  {
    id: "dryer-ads-cold",
    name: "Адсорбционные осушители (холодная регенерация)",
    category: "Осушители сжатого воздуха",
    categoryId: "dryers",
    image: "/images/products/dryer-2.jpg",
    description: "Адсорбционные осушители с холодной регенерацией для воздуха, азота, кислорода и водорода.",
    specifications: [
      { label: "Тип", value: "Адсорбционный, холодная регенерация" },
      { label: "Производительность", value: "до 1000 м³/мин" },
    ],
  },
  {
    id: "dryer-hre",
    name: "Осушители HRE / HRG / HRS",
    category: "Осушители сжатого воздуха",
    categoryId: "dryers",
    image: "/images/products/dryer-3.jpg",
    description:
      "Адсорбционные осушители с горячей регенерацией. Нагрев электрический, паровой, водяной или от турбокомпрессора.",
    specifications: [
      { label: "Серия", value: "HRE / HRG / HRS" },
      { label: "Регенерация", value: "Горячая, воздуходувка" },
      { label: "Сертификация", value: "DQS, TÜV" },
    ],
  },
  {
    id: "dryer-hot",
    name: "Адсорбционные осушители (горячая регенерация)",
    category: "Осушители сжатого воздуха",
    categoryId: "dryers",
    image: "/images/products/dryer-4.jpg",
    description:
      "Осушители с горячей регенерацией адсорбента для предприятий, где важна точка росы и стабильный состав среды.",
    specifications: [
      { label: "Тип", value: "Адсорбционный, горячая регенерация" },
      { label: "Среды", value: "Воздух, N2, O2, H2, природный газ" },
    ],
  },
  {
    id: "filters-process",
    name: "Процессные фильтры",
    category: "Фильтры и фильтр элементы",
    categoryId: "filters",
    image: "/images/cat-filters.jpg",
    description:
      "Корпуса из нержавеющей стали Donaldson, Ultrafilter и Omega Air. Пропускная способность от 60 до 23 040 м³/час.",
    body: "В одном типе корпуса используются предварительные, стерилизующие, глубинные и мембранные элементы. Пример — Donaldson P-EG для воздуха и промышленных газов в пищевой, химической, фармацевтической и автомобильной промышленности.",
    specifications: [
      { label: "Производители", value: "Donaldson, Ultrafilter, Omega Air" },
      { label: "Материал", value: "Нержавеющая сталь" },
      { label: "Пропускная способность", value: "60–23 040 м³/час при 7 бар" },
    ],
  },
  {
    id: "filters-line",
    name: "Магистральные фильтр-элементы",
    category: "Фильтры и фильтр элементы",
    categoryId: "filters",
    image: "/images/cat-filters.jpg",
    description:
      "Коалесцентные, предварительные, тонкой очистки и угольные дезодорирующие фильтр-элементы.",
    specifications: [
      { label: "Типы", value: "M, B, P, V, S, A" },
      { label: "Назначение", value: "Магистральная очистка воздуха" },
    ],
  },
  {
    id: "n-gen",
    name: "Генератор азота N-GEN",
    category: "Генераторы азота и кислорода",
    categoryId: "generators",
    image: "/images/products/gen-1.jpg",
    description: "PSA-генератор азота OmegaAir. Производительность 0,83–766,8 Нм³/ч, чистота до 99,999 %.",
    specifications: [
      { label: "Серия", value: "N-GEN" },
      { label: "Давление", value: "6–10 бар" },
      { label: "Производительность", value: "0,83–766,8 Нм³/ч" },
      { label: "Чистота", value: "до 99,999 %" },
      { label: "Точка росы", value: "< −45 °C" },
    ],
  },
  {
    id: "n-gen-skid",
    name: "Генераторы азота — SKID системы",
    category: "Генераторы азота и кислорода",
    categoryId: "generators",
    image: "/images/popular-n2.jpg",
    description:
      "Готовая компактная установка: сжатие и очистка воздуха плюс генератор N-GEN. Давление 6–10 бар.",
    specifications: [
      { label: "Серия", value: "N-GEN SKID" },
      { label: "Давление", value: "6–10 бар" },
      { label: "Производительность", value: "0,83–766,8 Нм³/ч" },
      { label: "Чистота", value: "до 99,999 %" },
    ],
  },
  {
    id: "o-gen",
    name: "Генератор кислорода O-GEN",
    category: "Генераторы азота и кислорода",
    categoryId: "generators",
    image: "/images/products/gen-2.jpg",
    description: "PSA-генератор кислорода OmegaAir. Производительность 1,02–94,9 Нм³/ч, чистота до 95 %.",
    specifications: [
      { label: "Серия", value: "O-GEN" },
      { label: "Давление", value: "5–6 бар" },
      { label: "Производительность", value: "1,02–94,9 Нм³/ч" },
      { label: "Чистота", value: "до 95 %" },
      { label: "Точка росы", value: "< −60 °C" },
    ],
  },
  {
    id: "o-gen-skid",
    name: "Кислородные SKID системы O-GEN",
    category: "Генераторы азота и кислорода",
    categoryId: "generators",
    image: "/images/products/gen-3.jpg",
    description: "Готовая к эксплуатации компактная установка производства кислорода O-GEN SKID.",
    specifications: [
      { label: "Серия", value: "O-GEN SKID" },
      { label: "Давление", value: "5–6 бар" },
      { label: "Чистота", value: "до 95 %" },
    ],
  },
  {
    id: "receivers-std",
    name: "Ресиверы 25–900 литров",
    category: "Ресиверы (воздухосборники)",
    categoryId: "receivers",
    image: "/images/products/receiver.jpg",
    description:
      "Ходовые ресиверы 0,25–0,9 м³, давление 10–40 бар. Соответствуют нормам РК, не требуют регистрации в надзоре, есть на складе.",
    body: "В комплект входят предохранительный клапан, манометр, кран слива конденсата и техническая документация. Возможны индивидуальные изменения: диаметр, длина, вертикальное или горизонтальное исполнение, фланцы, колёса, нержавеющая сталь, покрытие КО-813.",
    specifications: [
      { label: "Объём", value: "0,25–0,9 м³ (25–900 л)" },
      { label: "Давление", value: "10–40 бар" },
      { label: "Наличие", value: "Склад Алматы" },
    ],
  },
  {
    id: "receivers-custom",
    name: "Ресиверы до 100 м³ и 400 бар",
    category: "Ресиверы (воздухосборники)",
    categoryId: "receivers",
    image: "/images/products/receiver.jpg",
    description:
      "Индивидуальные воздухосборники большого объёма и высокого давления, изготовление в короткие сроки.",
    specifications: [
      { label: "Объём", value: "до 100 м³ и более" },
      { label: "Давление", value: "до 400 бар" },
      { label: "Исполнение", value: "По чертежу заказчика" },
    ],
  },
  {
    id: "agnks",
    name: "Решения для АГНКС",
    category: "Компрессоры АГНКС и АЗС СПГ",
    categoryId: "gas",
    image: "/images/products/gas-1.jpg",
    description: "Компрессорные установки и безмасляные поршневые решения для автомобильных газонаполнительных станций.",
    specifications: [
      { label: "Направление", value: "АГНКС" },
      { label: "Опции", value: "Oil Free поршневые установки" },
    ],
  },
  {
    id: "lng-station",
    name: "Решения для АЗС СПГ",
    category: "Компрессоры АГНКС и АЗС СПГ",
    categoryId: "gas",
    image: "/images/products/gas-2.jpg",
    description: "Оборудование для станций сжиженного природного газа, очистки и глубокой переработки газа.",
    specifications: [
      { label: "Направление", value: "АЗС СПГ" },
      { label: "Сервис", value: "EPC опционально" },
    ],
  },
  {
    id: "hydrogen",
    name: "Водородные станции",
    category: "Компрессоры АГНКС и АЗС СПГ",
    categoryId: "gas",
    image: "/images/products/gas-3.jpg",
    description:
      "Оборудование для экологически чистой энергии и водородных станций. Партнёр — крупный производитель в провинции Сычуань.",
    specifications: [
      { label: "Направление", value: "Водород, очистка газа" },
      { label: "Референс", value: "Страны СНГ, поездки на завод" },
    ],
  },
  {
    id: "spare-parts",
    name: "Запасные части и расходные материалы",
    category: "Запасные части",
    categoryId: "parts",
    image: "/images/products/parts.jpg",
    description:
      "Оригинальные и альтернативные запчасти из Европы к компрессорам, осушителям и фильтрам любых типов.",
    body: "ALMiG, ALUP, Omega Air, Sauer, Bauer, ROTORCOMP, Lupamat, Atlas Copco, Ceccato, Hanwha Techwin (Samsung), SeAH, Boge, Gardner Denver, Donaldson, Ingersoll Rand, Kaeser, Sullair, Renner, FS Elliot, Cameron, Comprag и другие.",
    specifications: [
      { label: "Поставка", value: "Европа" },
      { label: "Оборудование", value: "Компрессоры, осушители, фильтры" },
    ],
  },
];

export const clients = [
  { src: "/images/clients/client-kazcink.webp", alt: "KAZ Minerals / Kazcink" },
  { src: "/images/clients/client-1.webp", alt: "Партнёр 1" },
  { src: "/images/clients/client-2.webp", alt: "Партнёр 2" },
  { src: "/images/clients/client-3.svg", alt: "Партнёр 3" },
  { src: "/images/clients/client-4.webp", alt: "Партнёр 4" },
  { src: "/images/clients/client-5.webp", alt: "Партнёр 5" },
  { src: "/images/clients/client-6.webp", alt: "Партнёр 6" },
  { src: "/images/clients/client-7.svg", alt: "Партнёр 7" },
  { src: "/images/clients/client-8.webp", alt: "Партнёр 8" },
  { src: "/images/clients/client-10.webp", alt: "Партнёр 10" },
  { src: "/images/clients/client-11.webp", alt: "Партнёр 11" },
  { src: "/images/clients/client-12.svg", alt: "Партнёр 12" },
  { src: "/images/clients/client-13.webp", alt: "Партнёр 13" },
  { src: "/images/clients/client-14.jpg", alt: "Партнёр 14" },
];

export const heroSlides = [
  {
    image: "/images/slide-turbo.webp",
    title: "Центробежные компрессоры высокой производительности",
  },
  {
    image: "/images/slide-almig.webp",
    title: "Винтовые компрессоры PREMIUM класса (Германия)",
  },
  {
    image: "/images/slide-rotorcomp.webp",
    title: "Бюджетные винтовые компрессоры высокого качества (Китай)",
  },
  {
    image: "/images/slide-mobile.webp",
    title: "Передвижные/мобильные надёжные винтовые компрессоры (Китай)",
  },
  {
    image: "/images/slide-piston.webp",
    title: "Поршневые компрессоры высокого давления",
  },
  {
    image: "/images/slide-mks.webp",
    title: "Модульные компрессорные станции контейнерного типа",
  },
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
  return products.filter((item) => item.categoryId === id);
}
