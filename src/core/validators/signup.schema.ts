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
    referralCode: z.string().optional(),

    // Personal Information
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
    dateOfBirth: z.string().refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 18;
    }, "You must be at least 18 years old"),

    // Consent and Agreements
    agreeToTerms: z
      .boolean()
      .refine(
        (val) => val === true,
        "You must agree to the terms and conditions"
      ),
    agreeToPrivacyPolicy: z
      .boolean()
      .refine((val) => val === true, "You must agree to the privacy policy"),
    consentToSms: z
      .boolean()
      .refine(
        (val) => val === true,
        "You must consent to SMS communications for account verification"
      ),
    consentToMarketing: z.boolean().default(false),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;
