import { pgSchema, uuid,varchar, timestamp,serial, text, integer, boolean } from "drizzle-orm/pg-core";
import { makerChecker } from "@/db/utils/makerChecker";
import { dbConfig } from "@/core/config/db";
import { membersWeb } from "./member_web";

const mySchema = pgSchema(dbConfig.dbSchema);


export const memberPass = mySchema.table("um_memberpass", {
  id: serial("id").primaryKey(),
  member_no: uuid("member_no").references(() => membersWeb.member_no).notNull(),
  ref_no: varchar("ref_no", { length: 50 }).notNull(),
  customer_name: varchar("customer_name", { length: 255 }).notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  user_level: varchar("userlevel", { length: 50 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  password: text("password").notNull(),
  password_token: varchar("password_token", { length: 255 }),
  otp: varchar("otp", { length: 6 }),
  otp_expiry_time: timestamp("otp_expiry_time"),  
  failed_logins: integer("failed_logins").default(0),
  disabled: boolean("disabled").default(false),
  disabled_by: varchar("disabled_by", { length: 255 }),
  disabled_date: timestamp("disabled_date"),
  disabled_reason: varchar("disabled_reason", { length: 255 }),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
  ...makerChecker,
});

