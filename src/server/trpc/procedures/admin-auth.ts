import { z } from "zod";
import { TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken";
import { baseProcedure } from "~/server/trpc/main";
import { env } from "~/server/env";

export const adminLogin = baseProcedure
  .input(z.object({ password: z.string() }))
  .mutation(async ({ input }) => {
    // Verify password against plain-text ADMIN_PASSWORD
    if (input.password !== env.ADMIN_PASSWORD) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { admin: true, timestamp: Date.now() },
      env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return { token };
  });

export function verifyAdminToken(token: string): boolean {
  try {
    const verified = jwt.verify(token, env.JWT_SECRET);
    const parsed = z.object({ admin: z.boolean() }).parse(verified);
    return parsed.admin === true;
  } catch (error) {
    return false;
  }
}
