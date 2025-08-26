import { useQuery } from "@tanstack/react-query";
import { fetchAccountTypes } from "@/core/actions/onboarding/signup";

export function useAccountTypes() {
  return useQuery({
    queryKey: ["accountTypes"],
    queryFn: async () => {
      const result = await fetchAccountTypes();
      if (!result.success) {
        throw new Error(result.error || "Failed to fetch account types");
      }
      return result.data;
    },
  });
}
