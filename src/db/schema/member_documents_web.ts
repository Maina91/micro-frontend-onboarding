import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createdAt, updatedAt, deletedAt } from "@/db/utils/timestamps";

export const member_files_web = pgTable("member_files_web", {
  id: serial("id").primaryKey(),
  member_no: text("member_no").notNull(),
  id_back: text("id_back").notNull(),
  id_front: text("id_front").notNull(),
  kra_pin: text("kra_pin").notNull(),
  proof_of_bank: text("proof_of_bank").notNull(),
  passport_photo: text("passport_photo").notNull(),
  profile_photo: text("profile_photo"),
  createdAt,
  updatedAt,
  deletedAt,
});
