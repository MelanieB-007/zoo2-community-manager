import "server-only";
import prisma from "@/lib/prisma";
import { getTechnicalBiomeName } from "@/constants/BiomePathMap";

export async function getCountAnimals() {
  return prisma.animal.count();
}

export async function getCountSpecialCoats() {
  return prisma.specialCoat.count();
}

export async function getAllAnimals(locale: string = "de") {
  const animals = await prisma.animal.findMany({
    include: {
      animaltext: {
        where: { languageCode: locale },
      },
      animalxp: true,
      biome: {
        include: {
          biomestext: {
            // WICHTIG: Wir laden die User-Sprache UND Englisch
            where: {
              languageCode: { in: [locale, "en"] },
            },
          },
        },
      },
      priceType: true,
    },
    orderBy: { id: "asc" },
  });

  return animals.map((animal) => {
    const translation = animal.animaltext?.[0] || {};
    const allBiomeTexts = animal.biome?.biomestext || [];

    // 1. Anzeigename in der Nutzersprache (z.B. "Grasland" oder später "Græsland")
    const biomeDisplayName =
      allBiomeTexts.find((t) => t.languageCode === locale)?.biomeName ||
      allBiomeTexts[0]?.biomeName ||
      "default";

    // 2. Technischer Name IMMER auf Basis von Englisch (z.B. "Grassland")
    const englishName =
      allBiomeTexts.find((t) => t.languageCode === "en")?.biomeName || biomeDisplayName; // Fallback auf DisplayName, falls EN fehlt

    // 3. Mapping basierend auf dem englischen Begriff
    const technicalName = getTechnicalBiomeName(englishName);
    // Das flache Objekt zurückgeben (jetzt für ALLE Tiere)
    return {
      id: animal.id,
      releaseDate: animal.releaseDate,
      price: animal.price,
      priceType: animal.priceType
        ? {
            ...animal.priceType,
            name: animal.priceType.name || "Standard",
            image: animal.priceType.image || null,
          }
        : null,
      sellingPrice: animal.sellingPrice,
      popularity: animal.popularity,
      image: animal.image || "/images/placeholder.png",
      biomeName: biomeDisplayName.trim(),
      category: technicalName,
      xpData: animal.animalxp || [],
      biome: animal.biome || { name: "Unbekannt" },
      shelterLevel: animal.shelterLevel || 0,
      name: translation.animalName || "Unbekannt",
      description: translation.animalDescription || null,
    };
  });
}
