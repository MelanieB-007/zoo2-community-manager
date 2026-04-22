export interface Animal {
  id: number;
  name: string;
  image: string;
  biomeName: string;
  shelterLevel: number;

  // Optionale Felder
  releaseDate?: Date | string | null;
  price?: number | null;
  priceType?: string;
  sellingPrice?: number | null;
  popularity?: number | null;
  description?: string | null;

  // Relationen
  animalXp?: any[];
}
