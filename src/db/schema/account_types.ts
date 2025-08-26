import { pgSchema, serial, text } from "drizzle-orm/pg-core";
import { makerChecker } from "@/db/utils/makerChecker";
import { dbConfig } from "@/core/config/db";

const mySchema = pgSchema(dbConfig.dbSchema);

export const accountTypes = mySchema.table("account_type", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  ...makerChecker,
});
