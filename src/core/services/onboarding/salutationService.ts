import { db } from "@/core/lib/db-client";
import { salutations } from "@/db/schema/salutations";
import { eq } from "drizzle-orm"; // import eq for conditions

export const salutationService = {
  create: async (data: {
    name: string;
    description?: string;
    added_by: string;
  }) => {
    try {
      return await db.transaction(async (tx) => {
        const [record] = await tx
          .insert(salutations)
          .values({
            name: data.name,
            description: data.description || null,
            added_by: data.added_by,
            confirmed: false,
          })
          .returning();

        if (!record) throw new Error("Failed to insert salutation");

        return record;
      });
    } catch (error) {
      console.error("Error creating salutation:", error);
      throw new Error(
        `Salutation creation failed: ${(error as Error).message}`
      );
    }
  },

  confirm: async (id: number, username: string) => {
    try {
      return await db.transaction(async (tx) => {
        const [record] = await tx
          .update(salutations)
          .set({
            confirmed: true,
            confirmed_by: username,
            confirmed_at: new Date(),
          })
          .where(eq(salutations.id, id))
          .returning();

        if (!record) throw new Error("Failed to confirm salutation");

        return record;
      });
    } catch (error) {
      console.error("Error confirming salutation:", error);
      throw new Error(
        `Salutation confirmation failed: ${(error as Error).message}`
      );
    }
  },

  get: async (confirmed?: boolean) => {
    try {
      if (typeof confirmed === "boolean") {
        // Filter by confirmed
        return await db
          .select()
          .from(salutations)
          .where(eq(salutations.confirmed, confirmed));
      }

      // Return all if no filter
      return await db.select().from(salutations);
    } catch (error) {
      console.error("Error fetching salutations:", error);
      throw new Error(
        `Failed to fetch salutations: ${(error as Error).message}`
      );
    }
  },

  delete: async (id: number) => {
    try {
      return await db.transaction(async (tx) => {
        const deletedCount = await tx
          .delete(salutations)
          .where(eq(salutations.id, id));

        if (!deletedCount) throw new Error("Failed to delete salutation");

        return { id, deleted: true };
      });
    } catch (error) {
      console.error("Error deleting salutation:", error);
      throw new Error(
        `Salutation deletion failed: ${(error as Error).message}`
      );
    }
  },
};
