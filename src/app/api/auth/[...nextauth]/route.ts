export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import prisma from "@/lib/prisma";

const discordId = process.env.DISCORD_CLIENT_ID;
const discordSecret = process.env.DISCORD_CLIENT_SECRET;

// Sicherheitsscheck: Wenn die Variablen fehlen, werfen wir einen Fehler
// Das beruhigt TypeScript zu 100%
if (!discordId || !discordSecret) {
  throw new Error("Fehlende Discord Umgebungsvariablen in der .env!");
}

export const authOptions = {
  providers: [
    DiscordProvider({
      clientId: discordId,
      clientSecret: discordSecret,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.global_name || profile.username,
          email: profile.email,
          image: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: any }) {
      try {
        // Sync mit MariaDB
        await prisma.user.upsert({
          where: { id: user.id },
          update: {
            name: user.name,
            image: user.image,
          },
          create: {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            roleId: 1, // Standardrolle bei Neuanlage
          },
        });
        return true;
      } catch (error) {
        console.error("Datenbank-Fehler beim Login:", error);
        return true;
      }
    },

    async session({ session }: { session: any }) {
      try {
        // 1. Sicherheitscheck: Wenn keine Email da ist, gar nicht erst die DB fragen
        if (!session?.user?.email) {
          console.warn("Session Callback: Keine Email vorhanden.");
          return session;
        }

        const dbUser = await prisma.user.findUnique({
          where: { email: session.user.email },
          include: {
            role: {
              include: { rolestext: true },
            },
          },
        });

        if (dbUser) {
          // Hier wird session jetzt aktiv benutzt -> nicht mehr grau!
          session.user.role = dbUser.role.name;
          session.user.roleId = dbUser.roleId;
          session.user.id = dbUser.id;
        }

        return session;
      } catch (error) {
        // Das verhindert den 500er Fehler im Browser!
        console.error("KRITISCHER FEHLER IM SESSION CALLBACK:", error);
        return session;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// WICHTIG FÜR APP ROUTER:
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
