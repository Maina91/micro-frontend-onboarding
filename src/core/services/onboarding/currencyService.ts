import { db } from "@/core/lib/db-client";
import { currencies } from "@/db/schema/currencies";
import { eq } from "drizzle-orm";

export const currencyService = {
  create: async (data: {
    name: string;
    code: string;
    added_by: string;
  }) => {
    try {
      return await db.transaction(async (tx) => {
        const [record] = await tx
          .insert(currencies)
          .values({
            name: data.name,
            code: data.code,
            added_by: data.added_by,
            confirmed: false,
          })
          .returning();

        if (!record) throw new Error("Failed to insert currency");

        return record;
      });
    } catch (error) {
      console.error("Error creating currency:", error);
      throw new Error(
        `Currency creation failed: ${(error as Error).message}`
      );
    }
  },

  confirm: async (id: number, username: string) => {
    try {
      return await db.transaction(async (tx) => {
        const [record] = await tx
          .update(currencies)
          .set({
            confirmed: true,
            confirmed_by: username,
            confirmed_at: new Date(),
          })
          .where(eq(currencies.id, id))
          .returning();

        if (!record) throw new Error("Failed to confirm currency");

        return record;
      });
    } catch (error) {
      console.error("Error confirming currency:", error);
      throw new Error(
        `Currency confirmation failed: ${(error as Error).message}`
      );
    }
  },

  get: async (confirmed?: boolean) => {
    try {
      if (typeof confirmed === "boolean") {
        return await db
          .select()
          .from(currencies)
          .where(eq(currencies.confirmed, confirmed));
      }

      return await db.select().from(currencies);
    } catch (error) {
      console.error("Error fetching currencies:", error);
      throw new Error(
        `Failed to fetch currencies: ${(error as Error).message}`
      );
    }
  },

  delete: async (id: number) => {
    try {
      return await db.transaction(async (tx) => {
        const deletedCount = await tx
          .delete(currencies)
          .where(eq(currencies.id, id));

        if (!deletedCount) throw new Error("Failed to delete currency");

        return { id, deleted: true };
      });
    } catch (error) {
      console.error("Error deleting currency:", error);
      throw new Error(
        `Currency deletion failed: ${(error as Error).message}`
      );
    }
  },
};
