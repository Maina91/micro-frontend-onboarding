import { text, timestamp } from "drizzle-orm/pg-core";

export const makerChecker = {
  added_by: text("added_by").notNull(), 
  confirmed_by: text("confirmed_by"), 
  confirmed_at: timestamp("confirmed_at"), 
};
