// import { z } from "zod";
// import { createServerFn } from "@tanstack/react-start";
// import { memberService } from "@/core/services/onboarding/memberSignupService";

import { createServerFn } from "@tanstack/react-start";
import { getAccountTypes } from "@/core/services/onboarding/accountTypesService";
import { getAgents } from "@/core/services/onboarding/agentService";

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



// export const signupSchema = z
//   .object({
//     firstName: z.string().min(2),
//     lastName: z.string().min(2),
//     email: z.string().email(),
//     phone: z.string(),
//     password: z.string().min(8),
//     confirmPassword: z.string(),
//     accountType: z.enum([
//       "kenyan_individual",
//       "foreign_individual",
//       "minor",
//       "joint_account",
//       "corporate",
//       "trust",
//     ]),
//     referralCode: z.string().optional(),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords don't match",
//     path: ["confirmPassword"],
//   });

// export const signupFn = createServerFn({ method: "POST" })
//   .validator(signupSchema)
//   .handler(async ({ data }) => {
//     try {
//       return await memberService.signup(data);
//     } catch (error) {
//       console.error("[SIGNUP_ERROR]", error);
//       throw new Error("Failed to create account. Please try again.");
//     }
//   });
