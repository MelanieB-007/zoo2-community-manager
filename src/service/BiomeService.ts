import "server-only";
import prisma from "@/lib/prisma";
export async function getHabitatCount() {
  return prisma.biome.count();
}
