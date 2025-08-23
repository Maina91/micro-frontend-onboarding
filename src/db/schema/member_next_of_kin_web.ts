import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { createdAt, updatedAt, deletedAt } from "@/db/utils/timestamps";

export const member_next_of_kin_web = pgTable("member_next_of_kin_web", {
  id: serial("id").primaryKey(),
  member_no: text("member_no").notNull(), 
  full_name: text("full_name").notNull(),
  relationship: text("relationship").notNull(), 
  phone_number: text("phone_number").notNull(),
  email: text("email"), 
  id_type: text("id_type").notNull(), 
  id_number: text("id_number").notNull(),
  created_at: createdAt,
  updated_at: updatedAt,
  deleted_at: deletedAt,
});
