import { db } from "@/core/lib/db-client";
import { agents } from "@/db/schema";

export const getAgents = async () => {
  try {
    const results = await db
      .select()
      .from(agents)
      .orderBy(agents.agent_no);

    return results;
  } catch (error) {
    console.error("Error fetching agents:", error);
    throw new Error("Failed to fetch agents");
  }
};
