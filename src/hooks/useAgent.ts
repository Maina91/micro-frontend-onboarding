import { useQuery } from "@tanstack/react-query";
import { fetchAgents } from "@/core/actions/onboarding/signup";

export function useAgents() {
  return useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      const result = await fetchAgents();
      if (!result.success) {
        throw new Error(result.error || "Failed to fetch agents");
      }
      return result.data;
    },
  });
}
