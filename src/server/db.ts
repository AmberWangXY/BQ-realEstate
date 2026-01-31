import { PrismaClient } from "@prisma/client";

import { env } from "~/server/env";
const dbHost = process.env.DATABASE_URL?.split("@")[1]?.split("/")[0];
console.log("[ENV] NODE_ENV =", process.env.NODE_ENV);
console.log("[ENV] DATABASE_URL host =", dbHost);

const createPrismaClient = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
