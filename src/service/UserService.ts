import { prisma } from "../lib/prisma";

export async function getAllMembers() {
  try {
    const members = await prisma.user.findMany({
      where: {
        roleId: {
          in: [1, 2, 3, 4], // Filtert alle IDs von 1 bis 4
        },
      },
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return members.map((m) => ({
      id: m.id,
      name: m.name || `User #${m.id}`,
    }));
  } catch (error) {
    console.error("Fehler beim Laden der User:", error);
    return [];
  }
}

export async function getMemberById(id: string) {
  try {
    return await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
  } catch (error) {
    console.error(`Fehler beim Laden des Users ${id}:`, error);
    return null;
  }
}
