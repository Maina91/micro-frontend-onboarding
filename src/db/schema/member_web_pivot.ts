import { pgSchema,uuid,varchar, serial } from "drizzle-orm/pg-core";
import { dbConfig } from "@/core/config/db";
import { membersWeb } from "./member_web";

const mySchema = pgSchema(dbConfig.dbSchema);

export const memberOnboardingPivot = mySchema.table("um_member_onboarding_pivot", {
  id: serial("id").primaryKey(),
  member_no: uuid("member_no").references(() => membersWeb.member_no).notNull(),
  ref_no: varchar("ref_no", { length: 50 }).notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  customer_name: varchar("customer_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  user_level: varchar("userlevel", { length: 50 }).notNull(),
  mobile_no: varchar("mobile_no", { length: 20 }).notNull(),
  member_type: varchar("member_type", { length: 50 }), 
});

