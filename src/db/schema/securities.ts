import { pgSchema, serial, text } from "drizzle-orm/pg-core";
import { makerChecker } from "@/db/utils/makerChecker";
import { dbConfig } from "@/core/config/db";

const mySchema = pgSchema(dbConfig.dbSchema);

export const securities = mySchema.table("securities", {
  id: serial("id").primaryKey(),
    name: text("name").notNull(),
    security_code: text("security_code").notNull(),
    description: text("description"),
  ...makerChecker,
});
