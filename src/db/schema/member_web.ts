import {
  pgSchema,
  varchar,
  date,
  boolean,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { makerChecker } from "@/db/utils/makerChecker";
import { dbConfig } from "@/core/config/db";

const mySchema = pgSchema(dbConfig.dbSchema);

export const membersWeb = mySchema.table("um_members_web", {
  member_no: varchar("member_no").primaryKey(),
  ref_no: varchar("ref_no", { length: 50 }).notNull().unique(),
  account_type: varchar("account_type", { length: 50 }),
  agent_no: uuid("agent_no"),
  email: varchar("email", { length: 255 }).notNull(),
  first_name: varchar("first_name", { length: 100 }).notNull(),
  last_name: varchar("last_name", { length: 100 }).notNull(),
  full_name: varchar("full_name", { length: 255 }),
  identification_type: varchar("identification_type", { length: 50 }),
  identification_no: varchar("identification_no", { length: 100 }),
  dob: date("dob"),
  gender: varchar("gender", { length: 20 }),
  mobile_no: varchar("mobile_no", { length: 20 }).notNull(),
  telephone_no: varchar("telephone_no", { length: 20 }),
  salutation: varchar("salutation", { length: 20 }),
  category: varchar("category", { length: 50 }),
  marital_status: varchar("marital_status", { length: 50 }),
  income_source: varchar("income_source", { length: 100 }),
  employed: boolean("employed").default(false),
  tax_no: varchar("tax_no", { length: 50 }),
  postal_address: varchar("postal_address", { length: 255 }),
  postal_code: varchar("postal_code", { length: 20 }),
  country: varchar("country", { length: 50 }),
  county: varchar("county", { length: 50 }),
  town: varchar("town", { length: 50 }),
  sms_notification: boolean("sms_notification").default(false),
  date_joined: timestamp("date_joined"),
  confirmed: boolean("confirmed").default(false),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
  ...makerChecker,
});
