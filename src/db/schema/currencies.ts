import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { makerChecker } from "@/db/utils/makerChecker";

export const currencies = pgTable("currencies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  code: text("code").notNull(),
  ...makerChecker,
});
