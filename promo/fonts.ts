import { loadFont as loadManrope } from "@remotion/google-fonts/Manrope";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

export const manrope = loadManrope("normal", {
  weights: ["600", "700", "800"],
  subsets: ["cyrillic", "cyrillic-ext", "latin"],
}).fontFamily;

export const inter = loadInter("normal", {
  weights: ["400", "500", "600"],
  subsets: ["cyrillic", "cyrillic-ext", "latin"],
}).fontFamily;
