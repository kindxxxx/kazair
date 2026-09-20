/** Display name for Shanghai Rotorcomp screw compressor products. */
export const SHANGHAI_ROTORCOMP = "SHANGHAI ROTORCOMP";

export function normalizeManufacturer(name: string): string {
  return name === "ROTORCOMP" ? SHANGHAI_ROTORCOMP : name;
}
