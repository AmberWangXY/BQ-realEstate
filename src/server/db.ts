import { PrismaClient } from "@prisma/client";

// Use bracket notation so Vite/Nitro do NOT inline this at build time.
// In production (e.g. Render), DATABASE_URL must come from runtime env, not build-time.
const getDatasourceUrl = () => process.env["DATABASE_URL"];
const getNodeEnv = () => process.env["NODE_ENV"];

const createPrismaClient = () => {
  const datasourceUrl = getDatasourceUrl();
  if (!datasourceUrl) {
    throw new Error(
      "DATABASE_URL is not set. Set it at runtime (e.g. in Render Environment Variables)."
    );
  }
  return new PrismaClient({
    datasourceUrl,
    log:
      getNodeEnv() === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (getNodeEnv() !== "production") globalForPrisma.prisma = db;
