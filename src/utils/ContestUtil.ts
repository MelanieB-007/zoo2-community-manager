import { Statue } from "@/types/statue";

export function getStatueName(statue: Statue, fallback: string) {
  return statue.animal.animaltext[0]?.animalName || fallback;
}

export function calculateAnimalStats(animalId: number, results: any[]) {
  // 1. Filtern nach dem spezifischen Tier (Statuen-Tier)
  const animalResults = results.filter((result) => result.tierId === animalId);

  // 2. Gruppiere nach Mitglied
  const memberMap = animalResults.reduce((acc: any, curr) => {
    const mId = curr.id;

    if (!acc[mId]) {
      acc[mId] = {
        name: curr.member?.name || `Mitglied #${mId}`,
        rawSum: 0,
      };
    }

    // Punkteberechnung: Level * Anzahl
    acc[mId].rawSum += curr.level * curr.amount; // 'amount' statt 'anzahl' falls im Schema englisch
    return acc;
  }, {});

  // 3. Ranking & Multiplikator (10 * (4, 3, 2, 1))
  const sorted = Object.values(memberMap).sort((a: any, b: any) => b.rawSum - a.rawSum);

  let totalWeighted = 0;
  const rankedMembers = sorted.map((m: any, index) => {
    // Multiplikator sinkt von 40x (Platz 1) bis minimal 10x
    const multiplier = 10 * Math.max(1, 4 - index);
    const weighted = m.rawSum * multiplier;
    totalWeighted += weighted;

    return { ...m, multiplier, weighted };
  });

  return { rankedMembers, totalWeighted };
}
