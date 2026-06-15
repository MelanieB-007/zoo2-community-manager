import prisma from "@/lib/prisma";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { contestId, userId, data } = req.body;

  if (!contestId || !userId || !data) {
    return res.status(400).json({ message: "Fehlende Daten (Contest, Member oder Entries)" });
  }

  try {
    // Wir nutzen eine Transaktion, damit entweder alles oder nichts gespeichert wird
    await prisma.$transaction(async (tx) => {
      // 1. Alle alten Einträge dieses Mitglieds für DIESEN Wettbewerb löschen
      await tx.contestDonation.deleteMany({
        where: {
          contestId: parseInt(contestId),
          userId: parseInt(userId),
        },
      });

      // 2. Daten für die DB vorbereiten
      // Wir müssen das verschachtelte Objekt { tierId: [rows] } flachklopfen
      const insertData: any[] = [];

      Object.entries(data).forEach(([animalId, rows]: any[]) => {
        rows.forEach((row: any) => {
          // Nur speichern, wenn Level und Anzahl ausgefüllt sind
          if (row.level !== "" && row.count !== "") {
            insertData.push({
              contestId: parseInt(contestId),
              userId: parseInt(userId),
              animalId: parseInt(animalId),
              level: parseInt(row.level),
              count: parseInt(row.count),
              createdAt: new Date(),
            });
          }
        });
      });

      // 3. Wenn Daten vorhanden sind, alle auf einmal einfügen
      if (insertData.length > 0) {
        await tx.contestDonation.createMany({
          data: insertData,
        });
      }
    });

    return res.status(200).json({ success: true, message: "Ergebnisse gespeichert" });
  } catch (error: any) {
    console.error("Save Entry Error:", error);
    return res.status(500).json({
      message: "Fehler beim Speichern der Ergebnisse",
      error: error.message,
    });
  }
}
