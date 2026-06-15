import { PriceType } from "@/types/PriceType";

export interface Biome {
  id: number;
  description?: string;
  identifier: string;

  price?: number | null;
  priceType?: PriceType | null;

  expansionCost?: number | null;
  priceTypeExpansionsCost?: PriceType | null;

  size?: number | null;
  image?: string | null;
  biomestext?: BiomesText[];
}

export interface BiomesText {
  id: number;
  biomeName: string;
  biomeDescription: string | null;
}
