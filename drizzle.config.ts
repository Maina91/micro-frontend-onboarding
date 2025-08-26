import { defineConfig } from "drizzle-kit";
import { dbConfig } from "@/core/config/db";


export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
      // url: dbConfig.dbUrl,
      url: process.env.DB_URL!,
  },
});
