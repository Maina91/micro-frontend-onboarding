import { pgSchema, serial, text } from "drizzle-orm/pg-core";
import { makerChecker } from "@/db/utils/makerChecker";
import { dbConfig } from "@/core/config/db";

const mySchema = pgSchema(dbConfig.dbSchema);

export const identification_types = mySchema.table("identification_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  ...makerChecker,
});
