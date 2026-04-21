import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import * as mariadb from "mariadb";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prismaClientSingleton = () => {
  const pool = mariadb.createPool({
    uri: process.env.DATABASE_URL!,
    ssl: {
      rejectUnauthorized: true,
    },
    connectionLimit: 10,
  } as any);

  const adapter = new PrismaMariaDb(pool as any);

  return new PrismaClient({
    adapter: adapter as any,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
};

// Hier definieren wir die Konstante...
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// ...und hier machen wir den Export GANZ DEUTLICH für Turbopack:
export { prisma }; // Benannter Export
export default prisma; // Default Export
