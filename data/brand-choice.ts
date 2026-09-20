import type { CategoryId, Product } from "@/data/products";
import { catalogImages } from "@/lib/catalog-images";

export const choiceCategoryIds: CategoryId[] = ["screw", "generators"];

export function isChoiceCategory(id: string) {
  return choiceCategoryIds.includes(id as CategoryId);
}

/** @deprecated use isChoiceCategory */
export function isDualBrandCategory(id: string) {
  return isChoiceCategory(id);
}

export function isDualBrandProduct(product: Product) {
  const brands = new Set(product.manufacturers ?? []);
  return brands.has("ALMiG") && brands.has("ROTORCOMP");
}

export const brandChoice = {
  almig: {
    id: "almig",
    image: catalogImages.almig,
    href: "/catalog/screw/almig-premium",
    oilFreeHref: "/catalog/screw/almig-premium-oil-free",
  },
  rotorcomp: {
    id: "rotorcomp",
    image: catalogImages.rotorcomp,
    href: "/catalog/screw/rotorcomp-screw",
    oilFreeHref: "/catalog/screw/rotorcomp-screw-oil-free",
  },
} as const;

export type BrandChoiceId = keyof typeof brandChoice;

export const generatorChoice = {
  nitrogen: {
    id: "nitrogen",
    image: catalogImages.nGenSkid,
    href: "/catalog/generators/generators-nitrogen",
  },
  oxygen: {
    id: "oxygen",
    image: catalogImages.oGenSkid,
    href: "/catalog/generators/generators-oxygen",
  },
} as const;

export type GeneratorChoiceId = keyof typeof generatorChoice;
