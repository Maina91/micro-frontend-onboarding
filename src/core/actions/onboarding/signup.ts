// import { z } from "zod";
// import { createServerFn } from "@tanstack/react-start";
// import { memberService } from "@/core/services/onboarding/memberSignupService";

import { createServerFn } from "@tanstack/react-start";
import { getAccountTypes } from "@/core/services/onboarding/accountTypesService";
import { getAgents } from "@/core/services/onboarding/agentService";
import { getSecurities } from "@/core/services/onboarding/securitiesService";

export const fetchAccountTypes = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      const data = await getAccountTypes();
      return { success: true, data };
    } catch (error) {
      console.error("fetchAccountTypes action error:", error);
    return { success: false, error: "Failed to fetch account types" };
  }
  });

  export const fetchAgents = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      const data = await getAgents();
      return { success: true, data };
    } catch (error) {
      console.error("fetchAgents action error:", error);
    return { success: false, error: "Failed to fetch agents" };
  }
  });

  export const fetchIdentificationTypes = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      const data = await getAgents();
      return { success: true, data };
    } catch (error) {
      console.error("fetchAgents action error:", error);
    return { success: false, error: "Failed to fetch agents" };
  }
  });

  export const fetchSecurities = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      const data = await getSecurities();
      return { success: true, data };
    } catch (error) {
      console.error("fetchSecurities action error:", error);
    return { success: false, error: "Failed to fetch securities" };
  }
  });

