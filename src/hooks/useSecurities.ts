import { useQuery } from "@tanstack/react-query";
import { fetchSecurities } from "@/core/actions/onboarding/signup";

export function useSecurities() {
  return useQuery({
    queryKey: ["securities"],
    queryFn: async () => {
      const result = await fetchSecurities();
      if (!result.success) {
        throw new Error(result.error || "Failed to fetch securities");
      }
      return result.data;
    },
  });
}
