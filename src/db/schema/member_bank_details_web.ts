import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { createdAt, updatedAt, deletedAt } from "@/db/utils/timestamps";

export const member_bank_details_web = pgTable("member_bank_details_web", {
  id: serial("id").primaryKey(),
  member_no: text("member_no").notNull(),
  bank_code: text("bank_code").notNull(),
  branch_code: text("branch_code").notNull(),
  account_name: text("account_name").notNull(),
  account_no: text("account_no").notNull(),
  account_type: text("account_type").notNull(),
  currency: text("currency").default("KES"),
  verified: integer("verified").default(0),
  created_at: createdAt,
  updated_at: updatedAt,
  deleted_at: deletedAt,
});
