import { catalogImages } from "@/lib/catalog-images";

export const heroSlides = [
  {
    id: "premium",
    image: catalogImages.almig,
    href: "/catalog/screw/almig-premium",
  },
  {
    id: "budget",
    image: catalogImages.rotorcomp,
    href: "/catalog/screw/rotorcomp-screw",
  },
  {
    id: "turbo",
    image: catalogImages.oilfree,
    href: "/catalog/turbo",
  },
  {
    id: "mobile",
    image: catalogImages.mobile,
    href: "/catalog/mobile",
  },
  {
    id: "mks",
    image: catalogImages.mks,
    href: "/catalog/mks",
  },
] as const;

export type HeroSlideId = (typeof heroSlides)[number]["id"];
