import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prisma's client is generated to a custom path (src/generated/prisma
  // instead of node_modules/.prisma) - Next.js's serverless file tracer
  // doesn't discover that query-engine binary automatically, which throws
  // PrismaClientInitializationError (500s) once deployed to Vercel even
  // though it works fine in local dev where everything's just on disk.
  outputFileTracingIncludes: {
    "/**": ["./src/generated/prisma/**/*"],
  },
};

export default nextConfig;
