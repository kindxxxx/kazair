import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");

/** Maps new_photos source files to public catalog image paths. */
const mappings = [
  ["new_photos/almig.png", "public/images/brand-almig.png"],
  ["new_photos/sr_rotorcomp.png", "public/images/brand-rotorcomp.png"],
  ["new_photos/turbo_centrobezh.png", "public/images/brand-oilfree.png"],
  ["new_photos/mobile_compressors_for_the_card.png", "public/images/catalog/mobile.png"],
  ["new_photos/porshnevoi_vysokogo_davlenia1.png", "public/images/catalog/hp.png"],
  ["new_photos/porshnevoi_vysokogo_davlenia2.png", "public/images/catalog/hp-2.png"],
  ["new_photos/module_stantion.png", "public/images/catalog/mks.png"],
  ["new_photos/osushitel.png", "public/images/catalog/dryer-1.png"],
  ["new_photos/osushitel2.png", "public/images/catalog/dryer-2.png"],
  ["new_photos/filter_elementy.png", "public/images/catalog/filters.png"],
  ["new_photos/ressiver.png", "public/images/catalog/receiver.png"],
  ["new_photos/omegaair_n-gen-skid.png", "public/images/catalog/n-gen-skid.png"],
  ["new_photos/omegaair_o-gen-skid.png", "public/images/catalog/o-gen-skid.png"],
  ["new_photos/agnks_azs1.png", "public/images/catalog/gas.png"],
  ["new_photos/agnks_azs2.png", "public/images/catalog/gas-2.png"],
  ["new_photos/dop_detali2.png", "public/images/catalog/parts.png"],
  ["new_photos/service1.png", "public/images/catalog/service-1.png"],
  ["new_photos/service2.png", "public/images/catalog/service-2.png"],
];

for (const [from, to] of mappings) {
  const source = join(root, from);
  const target = join(root, to);
  if (!existsSync(source)) {
    console.error(`Missing source: ${from}`);
    process.exitCode = 1;
    continue;
  }
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(source, target);
  console.log(`${from} -> ${to}`);
}
