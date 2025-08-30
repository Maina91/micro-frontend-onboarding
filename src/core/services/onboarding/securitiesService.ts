import { db } from "@/core/lib/db-client";
import { securities } from "@/db/schema";

export const getSecurities = async () => {
  try {
    const results = await db
      .select()
      .from(securities)
      .orderBy(securities.name);

    return results;
  } catch (error) {
    console.error("Error fetching securities:", error);
    throw new Error("Failed to fetch securities");
  }
};
