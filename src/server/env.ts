import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("production"),
  BASE_URL: z.string().optional(),
  BASE_URL_OTHER_PORT: z.string().optional(),
  ADMIN_PASSWORD: z.string(),
  JWT_SECRET: z.string(),
  OPENROUTER_API_KEY: z.string(),
  CONTACT_TO_EMAIL: z.string().email().optional(),
  EMAIL_FROM: z.string().email().optional(),
  RESEND_API_KEY: z.string().min(1).optional(),
  DATABASE_URL: z.string().min(1),
});

export const env = envSchema.parse(process.env);
