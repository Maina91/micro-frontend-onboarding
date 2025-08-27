import {
  pgSchema,
  serial,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { dbConfig } from "@/core/config/db";
import { makerChecker } from "@/db/utils/makerChecker";

const mySchema = pgSchema(dbConfig.dbSchema);

export const agents = mySchema.table("agents", {
  id: serial("id").primaryKey(),
  agent_no: varchar("agent_no", { length: 50 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  id_no: varchar("id_no", { length: 50 }).notNull().unique(), 
  email_address: varchar("email_address", { length: 255 }).notNull().unique(),
  mobile_no: varchar("mobile_no", { length: 20 }).notNull().unique(),
  tel_no: varchar("tel_no", { length: 20 }),
  postal_address: varchar("postal_address", { length: 255 }),
  postal_code: varchar("postal_code", { length: 20 }),
  physical_address: text("physical_address"),
  country: varchar("country", { length: 100 }),
  city: varchar("city", { length: 100 }),
  town: varchar("town", { length: 100 }),
  status: varchar("status", { length: 20 }).notNull().default("0"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
  ...makerChecker,
});
