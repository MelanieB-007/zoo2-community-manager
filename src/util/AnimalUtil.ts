export function calculateTotalXP(animal: any): number {
  const xpArray = animal?.animalXp || animal?.xp;

  if (!xpArray || !Array.isArray(xpArray)) {
    return 0;
  }

  return xpArray.reduce((acc: number, eintrag: any) => {
    const punkte = Number(eintrag.wert || eintrag.amount) || 0;
    return acc + punkte;
  }, 0);
}
