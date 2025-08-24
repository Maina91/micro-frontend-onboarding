// import { z } from "zod";
// import { createServerFn } from "@tanstack/react-start";
// import { memberService } from "@/core/services/onboarding/memberSignupService";

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
