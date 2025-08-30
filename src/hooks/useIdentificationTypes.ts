import { useQuery } from "@tanstack/react-query";
import { fetchIdentificationTypes } from "@/core/actions/onboarding/signup";

export function useIdentificationTypes() {
  return useQuery({
    queryKey: ["identification-types"],
    queryFn: async () => {
      const result = await fetchIdentificationTypes();
      if (!result.success) {
        throw new Error(result.error || "Failed to fetch identification types");
      }
      return result.data;
    },
  });
}
