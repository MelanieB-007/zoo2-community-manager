// src/constants/BiomePathMap.ts

const BIOME_PATH_MAP: Record<string, string> = {
  gras: "grassland",
  steppe: "plains",
  plains: "plains",
  wald: "forest",
  forest: "forest",
  berg: "mountain",
  mountain: "mountain",
  savanna: "savanna",
  jungle: "jungle",
  ice: "ice",
  water: "water",
  "rocky desert": "rocky_desert",
  "leafy thicket": "leafy_thicket",
  freshwater: "freshwater",
  saltwater: "saltwater",
  nocturnal: "nocturnal",
  rescue: "rescue",
};

export const getTechnicalBiomeName = (biomeName: string): string => {
  if (!biomeName) return "default";

  // Wir normalisieren den englischen Namen aus der DB
  const cleanName = biomeName.trim().toLowerCase();

  return BIOME_PATH_MAP[cleanName] || cleanName.replace(/\s+/g, "_");
};
