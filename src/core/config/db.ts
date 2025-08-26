import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();

const rawSchema = z.object({
  DB_URL: z.string().url(),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  DB_SCHEMA: z.string().default("public"),
});

const raw = rawSchema.parse(process.env);

export const dbConfig = {
  dbUrl: raw.DB_URL,
  nodeEnv: raw.NODE_ENV,
  dbSchema: raw.DB_SCHEMA,
} as const;
