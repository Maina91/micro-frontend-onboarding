// src/services/accountTypesService.ts
import { db } from "@/core/lib/db-client";
import { accountTypes } from "@/db/schema";

export const getAccountTypes = async () => {
  try {
    const results = await db
      .select()
      .from(accountTypes)
      .orderBy(accountTypes.name);

    return results;
  } catch (error) {
    console.error("Error fetching account types:", error);
    throw new Error("Failed to fetch account types");
  }
};
