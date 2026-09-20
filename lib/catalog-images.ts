export const catalogImages = {
  almig: "/images/brand-almig.png",
  rotorcomp: "/images/brand-rotorcomp.png",
  oilfree: "/images/brand-oilfree.png",
  mobile: "/images/catalog/mobile.png",
  hp: "/images/catalog/hp.png",
  hp2: "/images/catalog/hp-2.png",
  mks: "/images/catalog/mks.png",
  dryer1: "/images/catalog/dryer-1.png",
  dryer2: "/images/catalog/dryer-2.png",
  filters: "/images/catalog/filters.png",
  receiver: "/images/catalog/receiver.png",
  nGenSkid: "/images/catalog/n-gen-skid.png",
  oGenSkid: "/images/catalog/o-gen-skid.png",
  gas: "/images/catalog/gas.png",
  gas2: "/images/catalog/gas-2.png",
  parts: "/images/catalog/parts.png",
  service1: "/images/catalog/service-1.png",
  service2: "/images/catalog/service-2.png",
} as const;

export const categoryImages = {
  screw: catalogImages.almig,
  mobile: catalogImages.mobile,
  turbo: catalogImages.oilfree,
  hp: catalogImages.hp,
  mks: catalogImages.mks,
  dryers: catalogImages.dryer1,
  filters: catalogImages.filters,
  receivers: catalogImages.receiver,
  generators: catalogImages.nGenSkid,
  gas: catalogImages.gas,
  parts: catalogImages.parts,
} as const;

export type CatalogCategoryId = keyof typeof categoryImages;

/** Categories with multiple catalog images — shown as carousel in grid cards. */
export const categoryImageSets: Partial<Record<CatalogCategoryId, readonly string[]>> = {
  screw: [catalogImages.almig, catalogImages.rotorcomp],
  generators: [catalogImages.nGenSkid, catalogImages.oGenSkid],
  dryers: [catalogImages.dryer1, catalogImages.dryer2],
  gas: [catalogImages.gas, catalogImages.gas2],
  hp: [catalogImages.hp, catalogImages.hp2],
};

export const productImageOverrides: Record<string, string> = {
  "rotorcomp-screw": catalogImages.rotorcomp,
  "mobile-rotorcomp": catalogImages.mobile,
  "turbo-oilfree": catalogImages.oilfree,
  "hp-piston": catalogImages.hp,
  mks: catalogImages.mks,
  "dryer-omegaair": catalogImages.dryer1,
  "dryer-rotorcomp": catalogImages.dryer2,
  "filters-donaldson": catalogImages.filters,
  "filters-omegaair": catalogImages.filters,
  "filters-rotorcomp": catalogImages.filters,
  "receivers-std": catalogImages.receiver,
  "generators-nitrogen": catalogImages.nGenSkid,
  "generators-oxygen": catalogImages.oGenSkid,
  "n-gen-skid": catalogImages.nGenSkid,
  "o-gen-skid": catalogImages.oGenSkid,
  "gas-solutions": catalogImages.gas,
  agnks: catalogImages.gas,
  "lng-station": catalogImages.gas2,
  "spare-parts": catalogImages.parts,
};
