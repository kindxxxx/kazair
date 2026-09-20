import catalogSource from "@/data/kazaircompressor_catalog_full.json";
import { SHANGHAI_ROTORCOMP, normalizeManufacturer } from "@/data/brands";
import { afterTableForProduct, cardLeadByLineId } from "@/data/catalog-copy";
import type { CategoryId, Product } from "@/data/products";
import { catalogImages, productImageOverrides } from "@/lib/catalog-images";
import type { Locale } from "@/lib/i18n/types";

type SpecTable = {
  id: string;
  caption: Record<Locale, string>;
  headers: Record<Locale, string[]>;
  rows: string[][];
  note?: Record<Locale, string>;
};

const CATEGORY_NAMES: Record<CategoryId, string> = {
  screw: "Винтовые компрессоры",
  mobile: "Передвижные / мобильные компрессоры",
  turbo: "Центробежные (турбо) компрессоры",
  hp: "Поршневые компрессоры высокого давления",
  mks: "Модульные компрессорные станции",
  dryers: "Осушители сжатого воздуха",
  filters: "Фильтры и фильтр элементы",
  receivers: "Ресиверы (воздухосборники)",
  generators: "Генераторы Азота и Кислорода",
  gas: "Компрессоры для газа (АГНКС и АЗС СПГ)",
  parts: "Запасные части и расходные материалы",
};

type CatalogNotes = {
  performance_range_m3_min?: string;
  max_working_pressure_bar?: string;
  service_life?: string;
  cta?: string;
  engines?: string[];
  components?: string[];
  capacity_m3_hour?: string;
  pressure_bar?: string;
  capacity_m3_min?: string;
  advantages?: string[];
  media?: string[];
  cooling?: string[];
  execution?: string[];
  diesel_drive?: string;
  possible_compressors?: string[];
  uses?: string[];
  climate?: string;
  brand_positioning?: Record<string, string>;
  volume_m3?: string;
  included?: string[];
  common_models_volume_m3?: string;
  common_models_pressure_bar?: string;
  customization?: string[];
  origin?: string;
  source_wording?: string;
  partner_country?: string;
  partner_scope?: string;
  rd_staff?: string;
  patents?: string;
  n_gen?: Record<string, string>;
  o_gen?: Record<string, string>;
};

type CatalogTableRow = {
  model?: string;
  type?: string;
  capacity_m3_min?: string | { "8_bar"?: string; "10_bar"?: string; "13_bar"?: string };
  power_kw?: string;
  connection?: string;
  dimensions_mm?: string | { length?: string; height?: string; width?: string };
  weight_kg?: string;
  pressure_mpa?: string;
  engine?: string;
  parameter?: string;
  "10_Ft"?: string;
  "20_Ft"?: string;
  "40_Ft"?: string;
  "40_Ft_X"?: string;
};

type CatalogItem = {
  name: string;
  manufacturer: string | string[];
  types: string[];
  table?: { columns?: string[] | null; rows?: CatalogTableRow[] } | null;
  description: string;
  notes?: CatalogNotes;
};

type LineConfig = {
  index: number;
  id: string;
  categoryId: CategoryId;
  image: string;
  manufacturer?: string;
  tableId?: string;
  typePrefix?: string;
  name?: string;
};

const catalog = (catalogSource as { catalog: CatalogItem[] }).catalog;

const LINES: LineConfig[] = [
  { index: 0, id: "almig-premium", categoryId: "screw", image: catalogImages.almig, manufacturer: "ALMiG", tableId: "almig-premium" },
  { index: 1, id: "rotorcomp-screw", categoryId: "screw", image: catalogImages.rotorcomp, manufacturer: SHANGHAI_ROTORCOMP, tableId: "rotorcomp-screw" },
  { index: 2, id: "mobile-rotorcomp", categoryId: "mobile", image: catalogImages.mobile, manufacturer: SHANGHAI_ROTORCOMP, tableId: "mobile-rotorcomp" },
  { index: 3, id: "turbo-oilfree", categoryId: "turbo", image: catalogImages.oilfree, tableId: "turbo-range" },
  { index: 4, id: "hp-piston", categoryId: "hp", image: catalogImages.hp },
  { index: 5, id: "mks", categoryId: "mks", image: catalogImages.mks, tableId: "mks-containers" },
  { index: 6, id: "dryer-omegaair", categoryId: "dryers", image: catalogImages.dryer1, manufacturer: "OmegaAir" },
  { index: 6, id: "dryer-rotorcomp", categoryId: "dryers", image: catalogImages.dryer2, manufacturer: SHANGHAI_ROTORCOMP },
  { index: 7, id: "filters-donaldson", categoryId: "filters", image: catalogImages.filters, manufacturer: "Donaldson" },
  { index: 7, id: "filters-omegaair", categoryId: "filters", image: catalogImages.filters, manufacturer: "OmegaAir" },
  { index: 7, id: "filters-rotorcomp", categoryId: "filters", image: catalogImages.filters, manufacturer: SHANGHAI_ROTORCOMP },
  { index: 8, id: "receivers-std", categoryId: "receivers", image: catalogImages.receiver },
  {
    index: 9,
    id: "generators-nitrogen",
    categoryId: "generators",
    image: catalogImages.nGenSkid,
    manufacturer: "OmegaAir",
    tableId: "n-gen",
    typePrefix: "N-GEN",
    name: "Генераторы азота OmegaAir N-GEN",
  },
  {
    index: 9,
    id: "generators-oxygen",
    categoryId: "generators",
    image: catalogImages.oGenSkid,
    manufacturer: "OmegaAir",
    tableId: "o-gen",
    typePrefix: "O-GEN",
    name: "Генераторы кислорода OmegaAir O-GEN",
  },
  { index: 10, id: "gas-solutions", categoryId: "gas", image: catalogImages.gas },
  { index: 11, id: "spare-parts", categoryId: "parts", image: catalogImages.parts },
];

const TYPE_SLUGS: Record<string, string> = {
  "с ременным приводом": "belt",
  ременные: "belt",
  "прямой привод": "direct",
  "прямой привод с частотным преобразователем": "vfd",
  "прямой привод с давлением до 40 бар": "direct-40bar",
  "двухступенчатые компрессоры": "two-stage",
  "компрессоры с осушителем": "with-dryer",
  "компрессоры с осушителем и ресивером, плюс магистральные фильтры": "dryer-receiver",
  "безмаслянные компрессоры (Oil Free)": "oil-free",
  "безмаслянные компрессоры большой производительности (с мокрым винтом и сухим винтом — Oil Free)": "oil-free",
  "двухступенчатый винтовой блок": "two-stage-block",
  "воздушные API 672": "api672-air",
  "азотные (N2) API 672": "api672-n2",
  "кислородные (O2) компрессоры API 672": "api672-o2",
  "осевые, центробежные компрессоры и детандер-компрессоры для нефтяной, химической и газовой промышленности API 617": "api617",
  "с осушителем": "with-dryer",
  "блок-контейнерные": "container",
  "блочно-модульные": "modular",
  МКС: "mks",
  БМКС: "bmks",
  "рефрижераторного типа": "ref",
  "адсорбционного типа (холодная регенерация)": "ads-cold",
  "адсорбционного типа (горячая регенерация)": "ads-hot",
  "циклонные сепараторы": "cyclone",
  "фильтры в алюминиевом корпусе": "aluminum",
  "фильтры в стальном корпусе": "steel",
  "высокотемпературные фильтры": "high-temp",
  "фильтры для высокого давления": "high-pressure",
  "фильтры из нержавеющей стали": "stainless",
  "фильтры для любых газов": "gas",
  "стерильные фильтры": "sterile",
  "мешочные фильтры": "bag",
  "N-GEN серия": "n-gen",
  "N-GEN SKID серия": "n-gen-skid",
  "O-GEN серия": "o-gen",
  "O-GEN SKID серия": "o-gen-skid",
  "Решения для АГНКС": "agnks",
  "Решения для АЗС СПГ": "lng-station",
  "Безмаслянные поршневые компрессорные установки для АГНКС": "agnks-oilfree",
  "Водородные станции": "hydrogen",
  "Оборудование для очистки природного газа": "gas-treatment",
  "Оборудование для глубокой переработки природного газа": "gas-processing",
  "EPC сервис": "epc",
};

const TYPE_ID_OVERRIDES: Record<string, string> = {
  "generators-nitrogen::N-GEN серия": "n-gen",
  "generators-nitrogen::N-GEN SKID серия": "n-gen-skid",
  "generators-oxygen::O-GEN серия": "o-gen",
  "generators-oxygen::O-GEN SKID серия": "o-gen-skid",
  "turbo-oilfree::осевые, центробежные компрессоры и детандер-компрессоры для нефтяной, химической и газовой промышленности API 617":
    "turbo-api617",
  "turbo-oilfree::азотные (N2) API 672": "turbo-n2-o2",
  "gas-solutions::Решения для АГНКС": "agnks",
  "gas-solutions::Решения для АЗС СПГ": "lng-station",
  "gas-solutions::Водородные станции": "hydrogen",
  "dryer-omegaair::рефрижераторного типа": "dryer-ref",
  "dryer-omegaair::адсорбционного типа (холодная регенерация)": "dryer-ads-cold",
  "dryer-omegaair::адсорбционного типа (горячая регенерация)": "dryer-hot",
};

const ALIAS_IDS: Record<string, string> = {
  "integrated-laser": "almig-premium",
  "mobile-ly-12-10": "mobile-rotorcomp",
  "mobile-ly-25-10": "mobile-rotorcomp",
  "sauer-air-n2": "hp-piston",
  "sauer-helium": "hp-piston",
  "mks-20ft": "mks",
  "mks-40ft": "mks",
  "mks-sandwich": "mks",
  "dryer-hre": "dryer-hot",
  "filters-process": "filters-donaldson",
  "filters-line": "filters-donaldson",
  "receivers-custom": "receivers-std",
};

const screwHeaders: Record<Locale, string[]> = {
  ru: [
    "Модель",
    "Тип",
    "Производительность 8 бар, м³/мин",
    "Производительность 10 бар, м³/мин",
    "Производительность 13 бар, м³/мин",
    "Мощность, кВт",
    "Соединение",
    "Длина, мм",
    "Высота, мм",
    "Ширина, мм",
    "Вес, кг",
  ],
  kk: [
    "Моделі",
    "Түрі",
    "Өнімділігі 8 бар, м³/мин",
    "Өнімділігі 10 бар, м³/мин",
    "Өнімділігі 13 бар, м³/мин",
    "Қуаты, кВт",
    "Қосылымы",
    "Ұзындығы, мм",
    "Биіктігі, мм",
    "Ені, мм",
    "Салмағы, кг",
  ],
};

function manufacturersOf(item: CatalogItem): string[] {
  if (!item.manufacturer) return [];
  const list = Array.isArray(item.manufacturer) ? item.manufacturer : [item.manufacturer];
  return list.map(normalizeManufacturer);
}

function categoryName(id: CategoryId) {
  return CATEGORY_NAMES[id];
}

function titleType(type: string) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

function typeSlug(type: string) {
  return TYPE_SLUGS[type] ?? type.toLowerCase().replace(/[^a-z0-9а-яё]+/gi, "-").replace(/^-|-$/g, "");
}

function typeProductId(parentId: string, type: string) {
  return TYPE_ID_OVERRIDES[`${parentId}::${type}`] ?? `${parentId}-${typeSlug(type)}`;
}

function cell(value: unknown) {
  if (value == null) return "";
  return String(value);
}

function tableRowsFromItem(item: CatalogItem): string[][] {
  const rows = item.table?.rows ?? [];
  return rows.map((row) => {
    if (row.parameter) {
      return [cell(row.parameter), cell(row["10_Ft"]), cell(row["20_Ft"]), cell(row["40_Ft"]), cell(row["40_Ft_X"])];
    }
    if (typeof row.capacity_m3_min === "object" && row.capacity_m3_min) {
      const dim = typeof row.dimensions_mm === "object" ? row.dimensions_mm : {};
      return [
        cell(row.model),
        cell(row.type),
        cell(row.capacity_m3_min["8_bar"]),
        cell(row.capacity_m3_min["10_bar"]),
        cell(row.capacity_m3_min["13_bar"]),
        cell(row.power_kw),
        cell(row.connection),
        cell(dim?.length),
        cell(dim?.height),
        cell(dim?.width),
        cell(row.weight_kg),
      ];
    }
    return [
      cell(row.model),
      cell(row.capacity_m3_min),
      cell(row.pressure_mpa),
      cell(row.engine),
      cell(typeof row.dimensions_mm === "string" ? row.dimensions_mm : ""),
    ];
  });
}

function bilingual(ru: string[], kk: string[]): Record<Locale, string[]> {
  return { ru, kk };
}

function buildGeneratedTables(): SpecTable[] {
  const tables: SpecTable[] = [];
  const almig = catalog[0];
  const rotorcomp = catalog[1];
  const mobile = catalog[2];
  const mks = catalog[5];

  if (almig?.table?.columns) {
    tables.push({
      id: "almig-premium",
      caption: {
        ru: "ALMiG PREMIUM: модели, производительность, мощность, подключения и габариты",
        kk: "ALMiG PREMIUM: модельдер, өнімділік, қуат, қосылымдар және габариттер",
      },
      headers: screwHeaders,
      rows: tableRowsFromItem(almig),
    });
  }
  if (rotorcomp?.table?.columns) {
    tables.push({
      id: "rotorcomp-screw",
      caption: {
        ru: "SHANGHAI ROTORCOMP LGCD: модели, производительность, мощность, подключения и габариты",
        kk: "SHANGHAI ROTORCOMP LGCD: модельдер, өнімділік, қуат, қосылымдар және габариттер",
      },
      headers: screwHeaders,
      rows: tableRowsFromItem(rotorcomp),
    });
  }
  if (mobile?.table?.columns) {
    tables.push({
      id: "mobile-rotorcomp",
      caption: {
        ru: "Передвижные компрессоры SHANGHAI ROTORCOMP LY: производительность, давление, двигатель и габариты",
        kk: "SHANGHAI ROTORCOMP LY жылжымалы компрессорлары: өнімділік, қысым, қозғалтқыш және габариттер",
      },
      headers: bilingual(
        ["Модель", "Производительность, м³/мин", "Давление, MPa", "Двигатель", "Д×Ш×В, мм"],
        ["Моделі", "Өнімділігі, м³/мин", "Қысымы, MPa", "Қозғалтқышы", "Ұ×Е×Б, мм"],
      ),
      rows: tableRowsFromItem(mobile),
    });
  }
  if (mks?.table?.columns) {
    tables.push({
      id: "mks-containers",
      caption: {
        ru: "Ориентировочные размеры компрессорной станции контейнерного типа",
        kk: "Контейнер түріндегі компрессорлық станцияның болжамды өлшемдері",
      },
      headers: bilingual(
        ["Параметр", "10 Ft", "20 Ft", "40 Ft", "40 Ft (X)"],
        ["Параметрі", "10 Ft", "20 Ft", "40 Ft", "40 Ft (X)"],
      ),
      rows: tableRowsFromItem(mks),
    });
  }
  return tables;
}

export const catalogSpecTables: SpecTable[] = buildGeneratedTables();

function joinList(values?: string[]) {
  return values?.filter((item) => item && item !== "и другие").join(", ");
}

function specsFromNotes(notes: CatalogNotes | undefined, manufacturer?: string): Product["specifications"] {
  const specs: Product["specifications"] = [];
  if (manufacturer) specs.push({ label: "Производитель", value: manufacturer });
  if (notes?.performance_range_m3_min) {
    specs.push({ label: "Производительность", value: `${notes.performance_range_m3_min} м³/мин` });
  }
  if (notes?.capacity_m3_min && typeof notes.capacity_m3_min === "string") {
    specs.push({ label: "Производительность", value: `${notes.capacity_m3_min} м³/мин` });
  }
  if (notes?.capacity_m3_hour) {
    specs.push({ label: "Производительность", value: `${notes.capacity_m3_hour} м³/час` });
  }
  if (notes?.max_working_pressure_bar) {
    specs.push({ label: "Давление", value: `${notes.max_working_pressure_bar} бар` });
  } else if (notes?.pressure_bar) {
    specs.push({ label: "Давление", value: `${notes.pressure_bar} бар` });
  }
  if (notes?.service_life) specs.push({ label: "Срок службы", value: notes.service_life });
  if (notes?.climate) specs.push({ label: "Климат", value: notes.climate });
  if (notes?.volume_m3) specs.push({ label: "Объём", value: `${notes.volume_m3} м³` });
  if (notes?.common_models_volume_m3) {
    specs.push({ label: "Ходовые модели", value: `${notes.common_models_volume_m3} м³` });
  }
  if (notes?.origin) specs.push({ label: "Поставка", value: notes.origin });
  const engines = joinList(notes?.engines);
  if (engines) specs.push({ label: "Двигатели", value: engines });
  const media = joinList(notes?.media);
  if (media) specs.push({ label: "Среда", value: media });
  return specs;
}

function generatorSpecs(kind: "n_gen" | "o_gen", notes?: CatalogNotes): Product["specifications"] {
  const data = notes?.[kind];
  if (!data) return [{ label: "Производитель", value: "OmegaAir" }];
  const specs: Product["specifications"] = [
    { label: "Производитель", value: "OmegaAir" },
    { label: "Серия", value: kind === "n_gen" ? "N-GEN" : "O-GEN" },
  ];
  if (data.working_pressure_bar) specs.push({ label: "Давление", value: `${data.working_pressure_bar} бар` });
  if (data.capacity_nm3_h) specs.push({ label: "Производительность", value: `${data.capacity_nm3_h} Нм³/ч` });
  if (data.purity_percent) specs.push({ label: "Чистота", value: data.purity_percent.includes("%") ? data.purity_percent : `${data.purity_percent} %` });
  if (data.dew_point_atm_c) specs.push({ label: "Точка росы", value: `${data.dew_point_atm_c} °C` });
  return specs;
}

function brandPositioningText(
  positioning: Record<string, string> | undefined,
  manufacturer: string,
) {
  if (!positioning) return undefined;
  return positioning[manufacturer] ?? positioning["SHANGHAI ROTORCOMP"] ?? positioning.ROTORCOMP;
}

function bodyFromNotes(item: CatalogItem, manufacturer?: string) {
  const notes = item.notes ?? {};
  const parts: string[] = [];
  const positioning = manufacturer
    ? brandPositioningText(notes.brand_positioning, manufacturer)
    : undefined;
  if (manufacturer && positioning) {
    parts.push(`${manufacturer} — ${positioning}.`);
  }
  if (notes.advantages?.length) parts.push(notes.advantages.join(". ") + ".");
  if (notes.components?.length) parts.push(`Комплектация: ${notes.components.join(", ")}.`);
  if (notes.possible_compressors?.length) {
    parts.push(`Возможное наполнение: ${notes.possible_compressors.join(", ")}.`);
  }
  if (notes.uses?.length) parts.push(`Применение: ${notes.uses.join(", ")}.`);
  if (notes.included?.length) parts.push(`В комплект входят: ${notes.included.join(", ")}.`);
  if (notes.customization?.length) parts.push(`Индивидуальные изменения: ${notes.customization.join(", ")}.`);
  if (notes.diesel_drive) parts.push(`Дизельный привод: ${notes.diesel_drive}.`);
  if (notes.partner_scope) {
    parts.push(`Партнёр (${notes.partner_country ?? "Китай"}): ${notes.partner_scope}.`);
  }
  if (notes.rd_staff) parts.push(`${notes.rd_staff}.`);
  if (notes.patents) parts.push(String(notes.patents));
  if (notes.source_wording && manufacturersOf(item).length) {
    parts.push(`${manufacturersOf(item).join(", ")} ${notes.source_wording}.`);
  }
  if (notes.cta) parts.push(notes.cta);
  return parts.join(" ");
}

function lineName(item: CatalogItem, manufacturer?: string) {
  if (manufacturer && manufacturersOf(item).length > 1) {
    if (item.name.startsWith("Осушители")) return `Осушители ${manufacturer}`;
    if (item.name.startsWith("Фильтры")) return `Фильтры ${manufacturer}`;
    return `${item.name} — ${manufacturer}`;
  }
  return item.name;
}

function lineDescription(item: CatalogItem, lineId: string, manufacturer?: string) {
  if (cardLeadByLineId[lineId]) return cardLeadByLineId[lineId];
  const positioning = manufacturer
    ? brandPositioningText(item.notes?.brand_positioning, manufacturer)
    : undefined;
  if (manufacturer && positioning) {
    return `${item.description} ${manufacturer} — ${positioning}.`;
  }
  return item.description;
}

function tableIdsForType(line: LineConfig, type: string): string[] | undefined {
  if (/oil free/i.test(type) && line.categoryId !== "turbo") return undefined;
  if (line.tableId === "almig-premium") {
    if (type.includes("ременн")) return ["almig-premium-belt"];
    if (type === "прямой привод") return ["almig-premium-direct"];
  }
  if (line.tableId === "rotorcomp-screw" && type.includes("ремен")) {
    return ["rotorcomp-screw"];
  }
  return line.tableId ? [line.tableId] : undefined;
}

function filteredScrewTable(id: string, model: string): SpecTable | undefined {
  const source = catalogSpecTables.find((table) => table.id === id);
  if (!source) return undefined;
  return {
    ...source,
    id: `${id}-${model.toLowerCase().includes("belt") ? "belt" : "direct"}`,
    rows: source.rows.filter((row) =>
      model === "BELT XP" ? row[0] === "BELT XP" : row[0] === "GEAR XP" || row[0] === "DIRECT XP",
    ),
  };
}

function withFilteredTables(tables: SpecTable[]) {
  const belt = filteredScrewTable("almig-premium", "BELT XP");
  const direct = filteredScrewTable("almig-premium", "DIRECT XP");
  return [...tables, ...[belt, direct].filter((item): item is SpecTable => Boolean(item))];
}

export const catalogTables: SpecTable[] = withFilteredTables(catalogSpecTables);

function makeProduct(partial: Product): Product {
  const image = productImageOverrides[partial.id] ?? partial.image;
  return {
    kind: "line",
    types: [],
    ...partial,
    image,
  };
}

export function buildCatalogProducts(): Product[] {
  const products: Product[] = [];

  for (const line of LINES) {
    const item = catalog[line.index];
    if (!item) continue;
    const manufacturer = line.manufacturer;
    const types = line.typePrefix
      ? (item.types ?? []).filter((type) => type.startsWith(line.typePrefix!))
      : (item.types ?? []);
    const notes = item.notes;
    products.push(
      makeProduct({
        id: line.id,
        name: line.name ?? lineName(item, manufacturer),
        category: categoryName(line.categoryId),
        categoryId: line.categoryId,
        image: line.image,
        description: lineDescription(item, line.id, manufacturer),
        body: bodyFromNotes(item, manufacturer),
        afterTable: afterTableForProduct(line.id),
        specifications:
          line.id === "generators-nitrogen"
            ? generatorSpecs("n_gen", notes)
            : line.id === "generators-oxygen"
              ? generatorSpecs("o_gen", notes)
              : specsFromNotes(notes, manufacturer),
        tableIds: line.tableId ? [line.tableId] : undefined,
        manufacturer,
        manufacturers: manufacturer ? [manufacturer] : manufacturersOf(item),
        types,
        kind: "line",
      }),
    );

    for (const type of types) {
      const id = typeProductId(line.id, type);
      const typeTableIds = tableIdsForType(line, type);
      products.push(
        makeProduct({
          id,
          name: manufacturer ? `${manufacturer} — ${titleType(type)}` : titleType(type),
          category: categoryName(line.categoryId),
          categoryId: line.categoryId,
          image: line.image,
          description: cardLeadByLineId[line.id]
            ? `${cardLeadByLineId[line.id]} ${titleType(type)}.`
            : `${item.description} ${titleType(type)}.`,
          body: bodyFromNotes(item, manufacturer),
          afterTable: afterTableForProduct(id, line.id),
          specifications:
            line.categoryId === "generators"
              ? generatorSpecs(type.startsWith("O-GEN") ? "o_gen" : "n_gen", notes)
              : [
                  ...specsFromNotes(notes, manufacturer),
                  { label: "Тип", value: titleType(type) },
                ],
          tableIds: typeTableIds,
          manufacturer,
          manufacturers: manufacturer ? [manufacturer] : manufacturersOf(item),
          types,
          typeName: type,
          parentId: line.id,
          kind: "type",
        }),
      );
    }
  }

  products.push(
    makeProduct({
      id: "oil-free",
      name: "Безмаслянные компрессоры (Oil Free)",
      category: categoryName("screw"),
      categoryId: "screw",
      image: catalogImages.oilfree,
      description: cardLeadByLineId["oil-free"],
      body: catalog[3]?.notes?.cta,
      afterTable: afterTableForProduct("oil-free"),
      specifications: [
        { label: "Тип", value: "Oil Free" },
        { label: "Линейки", value: "ALMiG, SHANGHAI ROTORCOMP, турбокомпрессоры" },
      ],
      manufacturer: undefined,
      manufacturers: ["ALMiG", "SHANGHAI ROTORCOMP"],
      types: [
        "безмаслянные компрессоры (Oil Free)",
        "безмаслянные компрессоры большой производительности (с мокрым винтом и сухим винтом — Oil Free)",
        "воздушные API 672",
      ],
      kind: "line",
    }),
  );

  const byId = new Map(products.map((item) => [item.id, item]));
  for (const [aliasId, targetId] of Object.entries(ALIAS_IDS)) {
    const target = byId.get(targetId);
    if (!target || byId.has(aliasId)) continue;
    const alias = { ...target, id: aliasId, aliasOf: targetId };
    products.push(alias);
    byId.set(aliasId, alias);
  }

  return products;
}
