import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

export const dbConfigSchema = z.object({
  DATABASE_URL: z.string().optional(), 
  DB_HOST: z.string().optional(),
  DB_PORT: z.string().transform(Number).optional(),
  DB_USER: z.string().optional(),
  DB_PASSWORD: z.string().optional(),
  DB_NAME: z.string().optional(),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
});

export const dbConfig = dbConfigSchema.parse(process.env);
