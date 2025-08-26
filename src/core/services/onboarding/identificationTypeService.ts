import { db } from "@/core/lib/db-client";
import { identification_types } from "@/db/schema/identification_types";
import { eq } from "drizzle-orm";

export const identificationTypeService = {
  create: async (data: {
    name: string;
    description?: string;
    added_by: string;
  }) => {
    try {
      return await db.transaction(async (tx) => {
        const [record] = await tx
          .insert(identification_types)
          .values({
            name: data.name,
            description: data.description || null,
            added_by: data.added_by,
            confirmed: false,
          })
          .returning();

        if (!record) throw new Error("Failed to insert identification type");

        return record;
      });
    } catch (error) {
      console.error("Error creating identification type:", error);
      throw new Error(
        `Identification type creation failed: ${(error as Error).message}`
      );
    }
  },

  confirm: async (id: number, username: string) => {
    try {
      return await db.transaction(async (tx) => {
        const [record] = await tx
          .update(identification_types)
          .set({
            confirmed: true,
            confirmed_by: username,
            confirmed_at: new Date(),
          })
          .where(eq(identification_types.id, id))
          .returning();

        if (!record) throw new Error("Failed to confirm identification type");

        return record;
      });
    } catch (error) {
      console.error("Error confirming identification type:", error);
      throw new Error(
        `Identification type confirmation failed: ${(error as Error).message}`
      );
    }
  },

  get: async (confirmed?: boolean) => {
    try {
      if (typeof confirmed === "boolean") {
        return await db
          .select()
          .from(identification_types)
          .where(eq(identification_types.confirmed, confirmed));
      }

      return await db.select().from(identification_types);
    } catch (error) {
      console.error("Error fetching identification types:", error);
      throw new Error(
        `Failed to fetch identification types: ${(error as Error).message}`
      );
    }
  },

  delete: async (id: number) => {
    try {
      return await db.transaction(async (tx) => {
        const deletedCount = await tx
          .delete(identification_types)
          .where(eq(identification_types.id, id));

        if (!deletedCount)
          throw new Error("Failed to delete identification type");

        return { id, deleted: true };
      });
    } catch (error) {
      console.error("Error deleting identification type:", error);
      throw new Error(
        `Identification type deletion failed: ${(error as Error).message}`
      );
    }
  },
};
