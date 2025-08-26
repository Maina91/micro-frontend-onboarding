import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { dbConfig } from "@/core/config/db";
import * as schema from "@/db/schema";

const pool = new Pool({
  connectionString: dbConfig.dbUrl,
  max: 20,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 2_000,
  ssl:
    dbConfig.nodeEnv === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

export const createDatabaseConnection = () => {
  return drizzle(pool, {
    schema,
  });
};

export const db = createDatabaseConnection();
export type Database = typeof db;
