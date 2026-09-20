import { isOilFreeProduct, type Product } from "@/data/products";
import { catalogImages } from "@/lib/catalog-images";

export const catalogTiers = [
  {
    id: "budget",
    image: catalogImages.rotorcomp,
    productIds: ["rotorcomp-screw", "mobile-rotorcomp"],
  },
  {
    id: "premium",
    image: catalogImages.almig,
    productIds: ["almig-premium"],
  },
  {
    id: "oilfree",
    image: catalogImages.oilfree,
    productIds: ["oil-free", "turbo-oilfree"],
  },
] as const;

export type CatalogTierId = (typeof catalogTiers)[number]["id"];

export function isCatalogTierId(value: string | null | undefined): value is CatalogTierId {
  return catalogTiers.some((tier) => tier.id === value);
}

export function productMatchesTier(product: Product, tierId: CatalogTierId) {
  if (product.aliasOf) return false;
  const oilFree = isOilFreeProduct(product);

  if (tierId === "oilfree") {
    return oilFree;
  }

  const lineId = product.parentId ?? product.id;
  const belongs = (catalogTiers.find((tier) => tier.id === tierId)?.productIds as readonly string[] | undefined)?.includes(
    lineId,
  );
  return Boolean(belongs) && !oilFree;
}
