export interface Animal {
  id: number;
  name: string;
  image: string;
  biomeName: string;
  category: string;
  shelterLevel: number;

  // Optionale Felder
  releaseDate?: Date | string | null;
  price?: number | null;
  priceType?: {
    id: number;
    name: string | null;
    image: string | null;
  } | null;
  sellingPrice?: number | null;
  popularity?: number | null;
  description?: string | null;

  // Relationen
  animalXp?: any[];
}
