import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  // Das hier zwingt Next.js, Prisma NICHT zu bündeln,
  // sondern die Node.js-Version zu nehmen.
  serverExternalPackages: ["@prisma/client"],
};

export default withNextIntl(nextConfig);
