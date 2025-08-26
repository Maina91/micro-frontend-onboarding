import { text, timestamp, boolean } from "drizzle-orm/pg-core";
import { PgColumnBuilderBase } from "drizzle-orm/pg-core";

export const makerChecker: Record<string, PgColumnBuilderBase> = {
  addedBy: text("added_by").notNull(),
  confirmed: boolean("confirmed").default(false),
  confirmedBy: text("confirmed_by"),
  confirmedAt: timestamp("confirmed_at"),
};