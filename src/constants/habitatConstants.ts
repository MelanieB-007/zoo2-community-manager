export type HabitatType =
  | "grassland"
  | "plains"
  | "forest"
  | "mountain"
  | "savanna"
  | "jungle"
  | "ice"
  | "water"
  | "leafy_thicket"
  | "rocky_desert"
  | "freshwater"
  | "saltwater"
  | "nocturnal"
  | "rescue"
  | "aviary"
  | "default";

interface HabitatColor {
  main: string;
}

export const habitatColors: Record<HabitatType | string, HabitatColor> = {
  grassland: { main: "#47610d" },
  plains: { main: "#924722" },
  forest: { main: "#224c0b" },
  mountain: { main: "#39525e" },
  savanna: { main: "#c66f12" },
  jungle: { main: "#4c7c07" },
  ice: { main: "#066eb8" },
  water: { main: "#4634c1" },
  leafy_thicket: { main: "#779d59" },
  rocky_desert: { main: "#dcbc5d" },
  freshwater: { main: "#71fef8" },
  saltwater: { main: "#603bde" },
  nocturnal: { main: "#a540a2" },
  rescue: { main: "#ff0000" },
  aviary: { main: "#ede596" },
  default: { main: "#666666" },
};
