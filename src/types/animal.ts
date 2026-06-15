import { Biome } from "@/types/biome";
import { PriceType } from "@/types/PriceType";
import { Image } from "@/types/image";

export interface Animal {
  id: number;
  biome: Biome;
  shelterLevel: number | null;

  // Optionale Felder
  releaseDate?: Date | string | null;
  price?: number | null;
  priceType?: PriceType | null;
  sellingPrice?: number | null;
  popularity?: number | null;
  description?: string | null;
  image?: string | null;
  breedingCost?: number | null;
  breedingDuration?: number | null;
  breedingProbability?: number | null;

  // Relationen
  animalxp?: any[] | null;

  origins?: any[] | null;
  animaltext: AnimalText[];
}

export interface AnimalText {
  id: number;
  animalName: string | null;
  animalDescription: string | null;
}
