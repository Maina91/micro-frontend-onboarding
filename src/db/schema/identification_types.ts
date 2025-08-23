import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { makerChecker } from "@/db/utils/makerChecker";

export const identification_types = pgTable("identification_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), 
  description: text("description"), 
  ...makerChecker,
});
