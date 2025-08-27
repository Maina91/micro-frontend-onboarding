import { z } from "zod";

export const signupSchema = z
  .object({
    // Account Information
    accountType: z.enum(
      [
        "kenyan_individual",
        "foreign_individual",
        "minor",
        "joint_account",
        "corporate",
        "trust",
      ] as const,
      { message: "Please select an account type" }
    ),
    agent_no: z.string().optional(),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string(),
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    phone: z
      .string()
      .regex(/^\+?[\d\s\-()]+$/, "Please enter a valid phone number"),
    agreeToTermsPrivacy: z
      .boolean()
      .refine((val) => val === true, "You must agree to the terms and privacy policy"),
    consentToSms: z
      .boolean()
      .refine(
        (val) => val === true,
        "You must consent to SMS communications for account verification"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;
