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
    // Serverless Optimierung:
    connectionLimit: 1, // In Serverless ist 1 oft besser, da jede Function ihre eigene Instanz ist
    connectTimeout: 20000, // Mehr Zeit für den TLS-Handshake (20s)
    acquireTimeout: 20000, // Mehr Zeit, um eine Verbindung aus dem Pool zu fischen
    noDelay: true, // Schaltet Nagle's Algorithmus aus (schnellere Pakete)
  } as any);

  const adapter = new PrismaMariaDb(pool as any);

  return new PrismaClient({
    adapter: adapter as any,
    log: ["error"],
  });
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export { prisma };
export default prisma;
