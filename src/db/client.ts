import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { dbConfig } from "@/config/db";
import * as schema from "@/db/schema";

let pool: Pool;

if (dbConfig.DATABASE_URL) {
  // Supabase / remote Postgres
  pool = new Pool({
    connectionString: dbConfig.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });
} else {
  // Local Postgres
  pool = new Pool({
    host: dbConfig.DB_HOST,
    port: dbConfig.DB_PORT!,
    user: dbConfig.DB_USER,
    password: dbConfig.DB_PASSWORD,
    database: dbConfig.DB_NAME,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });
}

// Drizzle client instance
export const db = drizzle(pool, {
  schema,
});

export default db;
